import nodemailer from 'nodemailer'

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const sendVerificationOTP = async (email, name, otp) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"Contexta" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'Verify Your Contexta Account',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .otp-box { background: white; border: 2px solid #667eea; padding: 20px; text-align: center; border-radius: 10px; margin: 20px 0; }
          .otp-code { font-size: 36px; font-weight: bold; color: #667eea; letter-spacing: 8px; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔖 Contexta</h1>
            <h2>Verify Your Account</h2>
          </div>
          <div class="content">
            <p>Hello ${name},</p>
            <p>Welcome to Contexta! To complete your registration, please verify your email address using the OTP code below:</p>
            
            <div class="otp-box">
              <div class="otp-code">${otp}</div>
              <p><strong>This code expires in 10 minutes</strong></p>
            </div>
            
            <p>If you didn't create this account, please ignore this email.</p>
            
            <div class="footer">
              <p>Thank you for choosing Contexta - Your Smart Bookmark Manager</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  };

  await transporter.sendMail(mailOptions);
};

const sendPasswordResetEmail = async (email, name, resetToken) => {
  const transporter = createTransporter();
  const resetURL = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: `"Contexta" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'Reset Your Contexta Password',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔖 Contexta</h1>
            <h2>Password Reset Request</h2>
          </div>
          <div class="content">
            <p>Hello ${name},</p>
            <p>You requested to reset your password. Click the button below to set a new password:</p>
            
            <div style="text-align: center;">
              <a href="${resetURL}" class="button">Reset Password</a>
            </div>
            
            <p><strong>This link expires in 30 minutes</strong></p>
            <p>If you didn't request this password reset, please ignore this email.</p>
            <p>For security reasons, the link above will only work once.</p>
            
            <div class="footer">
              <p>Thank you for using Contexta - Your Smart Bookmark Manager</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  };

  await transporter.sendMail(mailOptions);
};

export {
  sendVerificationOTP,
  sendPasswordResetEmail
};