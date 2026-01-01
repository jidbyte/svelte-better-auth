// $lib/emails/templates/verify-email.ts
export function VerifyEmailTemplate(userName: string, verificationUrl: string): string {
	return `
		<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
			<h2>Verify Your Email Address</h2>
			<p>Hello ${userName || 'there'},</p>
			<p>Thank you for signing up! Please verify your email address by clicking the button below:</p>
			<a href="${verificationUrl}"
			   style="display: inline-block; background-color: #0070f3; color: white; padding: 12px 24px;
			          text-decoration: none; border-radius: 5px; margin: 20px 0;">
				Verify Email
			</a>
			<p>Or copy and paste this link into your browser:</p>
			<p style="color: #666; word-break: break-all;">${verificationUrl}</p>
			<p>After verification, please return to the sign-in page to access your account.</p>
			<p>This link will expire in 24 hours.</p>
			<p>If you didn't create an account, you can safely ignore this email.</p>
		</div>
	`;
}

// $lib/emails/templates/password-reset.ts
export function PasswordResetTemplate(userName: string, resetUrl: string): string {
	return `
		<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
			<h2>Reset Your Password</h2>
			<p>Hello ${userName || 'there'},</p>
			<p>We received a request to reset your password. Click the button below to create a new password:</p>
			<a href="${resetUrl}"
			   style="display: inline-block; background-color: #0070f3; color: white; padding: 12px 24px;
			          text-decoration: none; border-radius: 5px; margin: 20px 0;">
				Reset Password
			</a>
			<p>Or copy and paste this link into your browser:</p>
			<p style="color: #666; word-break: break-all;">${resetUrl}</p>
			<p>This link will expire in 1 hour.</p>
			<p>If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
		</div>
	`;
}
