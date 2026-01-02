import { form } from '$app/server';
import {
	emailSchema,
	loginSchema,
	resetPasswordSchema,
	signupSchema,
	updatePasswordSchema,
	updateProfileSchema
} from './schema';
import z from 'zod';

export const EmailSignup = form(signupSchema, async (data) => {
	if (data) return { ok: true };
});

export const EmailLogin = form(loginSchema, async (data) => {
	if (data) return { ok: true };
});

export const PasswordRequest = form(emailSchema, async (data) => {
	if (data) return { ok: true };
});

export const PasswordReset = form(resetPasswordSchema, async (data) => {
	if (data) return { ok: true };
});

export const UpdateProfile = form(updateProfileSchema, async (data) => {
	if (data) return { ok: true };
});

export const UpdateEmail = form(emailSchema, async (data) => {
	if (data) return { ok: true };
});

export const UpdatePassword = form(updatePasswordSchema, async (data) => {
	if (data) return { ok: true };
});

export const deleteUser = form(z.object({ password: z.string() }), async (data) => {
	if (data) return { ok: true };
});

// function formatAuthError(error: unknown, defaultMessage: string): AuthError {
// 	if (typeof error === 'object' && error !== null && 'message' in error) {
// 		const err = error as AuthError;
// 		return {
// 			code: err.code || 'UNKNOWN_ERROR',
// 			message: err.message || defaultMessage,
// 			status: err.status || 500
// 		};
// 	}

// 	return {
// 		code: 'UNKNOWN_ERROR',
// 		message: defaultMessage,
// 		status: 500
// 	};
// }
