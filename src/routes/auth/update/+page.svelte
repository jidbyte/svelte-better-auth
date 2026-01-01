<script>
	import { Button } from '$lib/components/ui/button';
	import toast from 'svelte-french-toast';
	import {
		authClient,
		ChangeEmail,
		ChangePassword,
		UpdateUser
	} from '../../../modules/auth/auth-client';
	import {
		updateEmail,
		updatePassword,
		updateUserProfile
	} from '../../../modules/auth/auth.remote';
	import { goto } from '$app/navigation';

	const { image, firstname, lastname } = updateUserProfile.fields;
	const { email } = updateEmail.fields;
	const { currentPassword, newPassword, confirmNewPassword } = updatePassword.fields;
</script>

<div class="grid min-h-screen place-content-center space-y-6">
	<div class="border p-4">
		<h2 class="mb-2 text-lg font-medium">UPDATE USER PROFILE</h2>

		<form
			{...updateUserProfile.enhance(async ({ submit, data }) => {
				await submit();
				if (updateUserProfile.result?.ok) {
					await UpdateUser(data);
				}
			})}
			class="space-y-2"
		>
			<div>
				<label for="image">Image</label>
				<input {...image.as('text')} />
				{#each image.issues() as issue}
					<p class="mt-1 text-sm text-red-600">{issue.message}</p>
				{/each}
			</div>

			<div>
				<label for="firstname">Firstname</label>
				<input {...firstname.as('text')} />
				{#each firstname.issues() as issue}
					<p class="mt-1 text-sm text-red-600">{issue.message}</p>
				{/each}
			</div>

			<div>
				<label for="lastname">Lastname</label>
				<input {...lastname.as('text')} />
				{#each lastname.issues() as issue}
					<p class="mt-1 text-sm text-red-600">{issue.message}</p>
				{/each}
			</div>

			<Button type="submit">Submit</Button>
		</form>
	</div>

	<div class="border p-4">
		<h2 class="mb-2 text-lg font-medium">UPDATE USER EMAIL</h2>

		<form
			{...updateEmail.enhance(async ({ submit, data }) => {
				await submit();
				if (updateEmail.result?.ok) {
					await ChangeEmail(data.email);
				}
			})}
			class="space-y-2"
		>
			<div>
				<label for="email">New email</label>
				<input {...email.as('email')} />
				{#each email.issues() as issue}
					<p class="mt-1 text-sm text-red-600">{issue.message}</p>
				{/each}
			</div>

			<Button type="submit">Submit</Button>
		</form>
	</div>

	<div class="border p-4">
		<h2 class="mb-2 text-lg font-medium">UPDATE USER PASSWORD</h2>

		<form
			{...updatePassword.enhance(async ({ submit, data }) => {
				await submit();
				if (updatePassword.result?.ok) {
					await ChangePassword(data);
				}
			})}
			class="space-y-2"
		>
			<div>
				<label for="currentPassword">Current Password</label>
				<input {...currentPassword.as('text')} />
				{#each currentPassword.issues() as issue}
					<p class="mt-1 text-sm text-red-600">{issue.message}</p>
				{/each}
			</div>

			<div>
				<label for="newPassword">New Password</label>
				<input {...newPassword.as('text')} />
				{#each newPassword.issues() as issue}
					<p class="mt-1 text-sm text-red-600">{issue.message}</p>
				{/each}
			</div>

			<div>
				<label for="confirmPassword">Confirm New Password</label>
				<input {...confirmNewPassword.as('text')} />
				{#each confirmNewPassword.issues() as issue}
					<p class="mt-1 text-sm text-red-600">{issue.message}</p>
				{/each}
			</div>

			<Button type="submit">Submit</Button>
		</form>
	</div>

	<div class="border p-4">
		<h2 class="mb-2 text-lg font-medium">DELETE ACCOUNT</h2>

		<Button
			class="bg-red-500 text-white"
			onclick={async () => {
				const result = await authClient.deleteUser({ password: 'pass1234', callbackURL: '/' });
				if (result.error) {
					return toast.error(result.error.message || 'Failed to delete account');
				}

				goto('/');
				return toast.success('Account deleted successfully');
			}}>Delete User</Button
		>
	</div>
</div>
