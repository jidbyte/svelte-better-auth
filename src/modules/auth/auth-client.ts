import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import { createAuthClient } from 'better-auth/svelte';
import toast from 'svelte-french-toast';
import type { UpdatePasswordProp, UpdateUserProp } from './auth-schema';

export const authClient = createAuthClient();

export const SignOut = async () => {
	try {
		await authClient.signOut();
		goto(resolve('/'));
	} catch (error) {
		console.error('Error signing out:', error);
	}
};

export const GoogleAuth = async () => {
	try {
		await authClient.signIn.social({
			provider: 'google',
			callbackURL: '/dashboard'
		});
	} catch (error) {
		console.error('Error initiating Google sign-in:', error);
		toast.error('Failed to start Google sign-in');
	}
};

export const UpdateUser = async ({ image, firstname, lastname }: UpdateUserProp) => {
	try {
		const result = await authClient.updateUser({
			image,
			name: `${firstname} ${lastname}`
		});

		if (result.error) {
			toast.error(result.error.message || 'Failed to update profile');
			return;
		}

		toast.success('User profile updated successfully');
	} catch (error) {
		console.error('Update error:', error);
		toast.error('Failed to update profile');
	}
};

export const ChangeEmail = async (newEmail: string) => {
	try {
		const result = await authClient.changeEmail({ newEmail, callbackURL: '/dashboard' });
		console.log(newEmail);

		if (result.error) {
			toast.error(result.error.message || 'Failed to update email');
			return;
		}

		toast.success('Email updated successfully');
	} catch (error) {
		console.error('Update error:', error);
		toast.error('Failed to update email');
	}
};

export const ChangePassword = async ({ newPassword, currentPassword }: UpdatePasswordProp) => {
	try {
		const { data, error } = await authClient.changePassword({
			newPassword,
			currentPassword,
			revokeOtherSessions: true
		});

		if (error) {
			if (error.code === 'INVALID_PASSWORD') {
				return toast.error('Invalid password. Enter the correct current password');
			}

			return toast.error(error.message || 'Failed to update password');
		}

		toast.success('Password updated successfully');
	} catch (error) {
		console.error('Update error:', error);
		toast.error('Failed to update password');
	}
};

export const DeleteAccount = async (password: string) => {
	try {
		const result = await authClient.deleteUser({ password, callbackURL: '/' });

		if (result.error) {
			return toast.error(result.error.message || 'Failed to delete account');
		}

		return toast.success('Account deleted successfully');
	} catch (error) {
		console.error('Delete error:', error);
		toast.error('Failed to delete account');
	}
};
