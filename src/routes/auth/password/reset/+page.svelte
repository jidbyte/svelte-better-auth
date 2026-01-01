<script lang="ts">
	import { goto } from '$app/navigation';
	import toast from 'svelte-french-toast';
	import { onMount } from 'svelte';
	import { resetPassword } from '../../../../modules/auth/auth.remote';
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';

	const { password, confirmPassword, token } = resetPassword.fields;

	let resetToken = $state('');
	let tokenValid = $state(false);

	onMount(() => {
		// Get token from URL query params
		resetToken = page.url.searchParams.get('token') || '';

		if (!resetToken) {
			toast.error('Invalid or missing reset token');
			goto('/auth/password/forgot');
		} else {
			tokenValid = true;
		}
	});
</script>

<div class="central w-full">
	<h2 class="mb-4 text-center text-xl font-bold">RESET PASSWORD</h2>

	{#if tokenValid}
		<div class="w-md space-y-2 rounded-lg border p-6">
			{#if resetPassword.result?.error}
				<p class="rounded-md bg-red-100 p-2.5 text-sm font-medium text-red-800">
					{resetPassword.result.error.message}
				</p>
			{/if}

			<p class="mb-4 text-sm text-slate-600">Enter your new password below.</p>

			<form
				{...resetPassword.enhance(async ({ submit, form }) => {
					await submit();
					if (resetPassword.result?.success) {
						toast.success('Password reset successful. Redirecting to sign in...');
						form.reset();
						setTimeout(() => {
							goto('/auth/sign-in');
						}, 2000);
					}
				})}
				class="space-y-4"
			>
				<div>
					<label for="password">New Password</label>
					<Input
						{...password.as('password')}
						class={password.issues() ? 'border-red-500' : ''}
						placeholder="At least 8 characters"
					/>
					{#each password.issues() || [] as issue}
						<p class="mt-1 text-sm text-red-600">{issue.message}</p>
					{/each}
				</div>

				<div>
					<label for="confirmPassword">Confirm New Password</label>
					<Input
						{...confirmPassword.as('password')}
						class={confirmPassword.issues() ? 'border-red-500' : ''}
						placeholder="Re-enter your password"
					/>
					{#each confirmPassword.issues() || [] as issue}
						<p class="mt-1 text-sm text-red-600">{issue.message}</p>
					{/each}
				</div>

				<input {...token.as('hidden', 'text')} bind:value={resetToken} readonly class="hidden" />

				<Button type="submit" class="mt-4 w-full bg-sky-600" disabled={resetPassword.pending > 0}>
					{resetPassword.pending > 0 ? 'Resetting...' : 'Reset Password'}
				</Button>
			</form>
		</div>
	{:else}
		<div class="w-md rounded-lg border p-6">
			<p class="text-center text-sm text-slate-600">Loading...</p>
		</div>
	{/if}

	<div class="mt-4 text-center">
		<p class="text-sm font-medium">
			<a href="/auth/sign-in" class="text-blue-600 hover:underline">Back to Sign In</a>
		</p>
	</div>
</div>
