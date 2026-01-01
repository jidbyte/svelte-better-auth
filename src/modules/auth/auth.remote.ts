import { form } from '$app/server';
import { auth } from './auth-config';
import type { AuthError } from '$lib/utils/types';
import {
	SignupSchema,
	LoginSchema,
	ForgotPasswordSchema,
	ResetPasswordSchema,
	UpdateUserSchema,
	EmailSchema,
	PasswordSchema
} from './auth-schema';
import { z } from 'zod';

export const emailSignup = form(SignupSchema, async ({ firstname, lastname, email, password }) => {
	try {
		const result = await auth.api.signUpEmail({
			body: {
				name: `${firstname} ${lastname}`,
				email,
				password
			}
		});

		return { success: true, data: result };
	} catch (error) {
		const authError = formatAuthError(error, 'An error occurred during sign up');
		console.log('Auth error:', authError);

		return {
			success: false,
			error: authError
		};
	}
});

export const emailLogin = form(LoginSchema, async ({ email, password }) => {
	try {
		const result = await auth.api.signInEmail({
			body: {
				email,
				password,
				callbackURL: '/auth/sign-in'
			}
		});

		return { success: true, data: result };
	} catch (error) {
		const authError = formatAuthError(error, 'An error occurred during sign in');
		console.log('Auth error:', authError);

		return {
			success: false,
			error: authError
		};
	}
});

export const forgotPassword = form(ForgotPasswordSchema, async ({ email }) => {
	try {
		await auth.api.requestPasswordReset({
			body: {
				email,
				redirectTo: '/auth/password/reset'
			}
		});

		return {
			success: true,
			message: 'Password reset instructions have been sent to your email'
		};
	} catch (error) {
		const authError = formatAuthError(error, 'An error occurred while sending reset instructions');
		console.log('Auth error:', authError);

		return {
			success: false,
			error: authError
		};
	}
});

export const resetPassword = form(ResetPasswordSchema, async ({ password, token }) => {
	try {
		await auth.api.resetPassword({
			body: { newPassword: password, token }
		});

		return {
			success: true,
			message: 'Password has been reset successfully'
		};
	} catch (error) {
		const authError = formatAuthError(error, 'An error occurred while resetting password');
		console.log('Auth error:', authError);

		return {
			success: false,
			error: authError
		};
	}
});

export const updateUserProfile = form(UpdateUserSchema, async (data) => {
	if (data) return { ok: true };
});

export const updateEmail = form(EmailSchema, async (data) => {
	if (data) return { ok: true };
});

export const updatePassword = form(PasswordSchema, async (data) => {
	if (data) return { ok: true };
});

export const deleteUser = form(z.object({ password: z.string() }), async (data) => {
	if (data) return { ok: true };
});

function formatAuthError(error: unknown, defaultMessage: string): AuthError {
	if (typeof error === 'object' && error !== null && 'message' in error) {
		const err = error as AuthError;
		return {
			code: err.code || 'UNKNOWN_ERROR',
			message: err.message || defaultMessage,
			status: err.status || 500
		};
	}

	return {
		code: 'UNKNOWN_ERROR',
		message: defaultMessage,
		status: 500
	};
}
