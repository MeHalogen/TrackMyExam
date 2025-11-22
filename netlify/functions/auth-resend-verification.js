const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { getUserByEmail, setVerificationToken } = require('./db');

const JWT_SECRET = process.env.JWT_SECRET;
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const SENDER_NAME = process.env.SENDER_NAME || 'TrackMyExam';

// Rate limiting store
const resendAttempts = new Map();

function checkRateLimit(identifier) {
  const now = Date.now();
  const attempts = resendAttempts.get(identifier) || [];
  
  // Remove attempts older than 1 hour
  const recentAttempts = attempts.filter(time => now - time < 3600000);
  
  if (recentAttempts.length >= 3) {
    return false; // Max 3 attempts per hour
  }
  
  recentAttempts.push(now);
  resendAttempts.set(identifier, recentAttempts);
  return true;
}

exports.handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  }

  try {
    const { email } = JSON.parse(event.body);

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Email is required' })
      };
    }

    // Rate limiting
    const clientIp = event.headers['x-forwarded-for'] || event.headers['client-ip'] || 'unknown';
    if (!checkRateLimit(clientIp) || !checkRateLimit(email)) {
      return {
        statusCode: 429,
        body: JSON.stringify({ 
          message: 'Too many resend attempts. Please wait 1 hour before trying again.' 
        })
      };
    }

    // Get user by email
    const user = await getUserByEmail(email);

    if (!user) {
      // Don't reveal if email exists or not for security
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          message: 'If this email is registered and unverified, a new verification link has been sent.' 
        })
      };
    }

    // Check if already verified
    if (user.email_verified) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Email is already verified. You can sign in now.' })
      };
    }

    // Generate verification token (expires in 24 hours)
    const verificationToken = jwt.sign(
      { userId: user.id, email: user.email, type: 'email-verification' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Store token and expiry in database
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await setVerificationToken(user.id, verificationToken, expiresAt);

    // Send verification email
    if (GMAIL_USER && GMAIL_APP_PASSWORD) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: GMAIL_USER,
          pass: GMAIL_APP_PASSWORD
        }
      });

      const baseUrl = event.headers.origin || event.headers.referer?.replace(/\/$/, '') || 'http://localhost:8888';
      const verificationUrl = `${baseUrl}/verify-email.html?token=${verificationToken}`;

      const mailOptions = {
        from: `"${SENDER_NAME}" <${GMAIL_USER}>`,
        to: email,
        subject: 'Verify your email - TrackMyExam (Resent)',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%); padding: 30px 20px; text-align: center; border-radius: 12px 12px 0 0; }
                .header h1 { color: white; margin: 0; font-size: 28px; }
                .content { background: #ffffff; padding: 40px 30px; border: 1px solid #e5e7eb; border-top: none; }
                .button { display: inline-block; background: #1E40AF; color: white !important; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; margin: 20px 0; }
                .button:hover { background: #1E3A8A; }
                .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
                .warning { background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 12px 16px; margin: 20px 0; border-radius: 4px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>📧 Verify Your Email</h1>
                </div>
                <div class="content">
                  <p style="font-size: 16px;">Hi <strong>${user.name}</strong>,</p>
                  <p>You requested a new verification link for your TrackMyExam account. Click the button below to verify your email address.</p>
                  
                  <div style="text-align: center;">
                    <a href="${verificationUrl}" class="button">Verify Email Address</a>
                  </div>
                  
                  <p style="font-size: 14px; color: #6b7280;">Or copy and paste this link into your browser:</p>
                  <p style="background: #f3f4f6; padding: 12px; border-radius: 6px; word-break: break-all; font-size: 13px;">
                    ${verificationUrl}
                  </p>
                  
                  <div class="warning">
                    <strong>⏱️ This link expires in 24 hours</strong><br>
                    Previous verification links are now invalid.
                  </div>
                  
                  <p style="margin-top: 30px;">Once verified, you'll be able to sign in with your username: <strong>${user.username}</strong></p>
                </div>
                <div class="footer">
                  <p>TrackMyExam - Never miss an exam deadline</p>
                  <p style="font-size: 12px; color: #9ca3af;">Built by Mehal Srivastava • For Students, With Purpose</p>
                </div>
              </div>
            </body>
          </html>
        `
      };

      await transporter.sendMail(mailOptions);
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        message: 'New verification email sent. Please check your inbox.'
      })
    };

  } catch (error) {
    console.error('Resend verification error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to resend verification email. Please try again.'
      })
    };
  }
};