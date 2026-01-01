import { z } from 'zod';

export const SignupSchema = z.object({
	firstname: z.string().min(1, 'First name is required'),
	lastname: z.string().min(1, 'Last name is required'),
	email: z.email('Please enter a valid email'),
	password: z.string().min(8, 'Password must be at least 8 characters')
});

export const LoginSchema = z.object({
	email: z.email('Please enter a valid email'),
	password: z.string().min(1, 'Password is required')
});

export const ForgotPasswordSchema = z.object({
	email: z.email('Please enter a valid email')
});

export const ResetPasswordSchema = z
	.object({
		password: z.string().min(8, 'Password must be at least 8 characters'),
		confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
		token: z.string()
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword']
	});

export const UpdateUserSchema = z.object({
	image: z.string().optional(),
	firstname: z.string().min(1, 'First name is required'),
	lastname: z.string().min(1, 'Last name is required')
});

export const EmailSchema = z.object({
	email: z.email('Please enter a valid email')
});

export const PasswordSchema = z
	.object({
		currentPassword: z.string().min(1, 'Password is required'),
		newPassword: z.string().min(8, 'Password must be at least 8 characters'),
		confirmNewPassword: z.string()
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		message: "Passwords don't match",
		path: ['confirmNewPassword']
	});

export type UpdateUserProp = z.infer<typeof UpdateUserSchema>;
export type UpdatePasswordProp = z.infer<typeof PasswordSchema>;
