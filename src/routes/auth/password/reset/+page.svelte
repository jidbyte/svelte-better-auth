<script lang="ts">
	import { goto } from '$app/navigation';
	import toast from 'svelte-french-toast';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { PasswordReset } from '$lib/modules/auth/auth.remote';
	import { PasswordResetClient } from '$lib/modules/auth/client';

	const { password, confirmPassword, token } = PasswordReset.fields;

	let message = $state<string | null>(null);
	let resetToken = $state('');
	let tokenValid = $state(false);

	onMount(() => {
		resetToken = page.url.searchParams.get('token') || '';

		if (!resetToken) {
			toast.error('Invalid or missing reset token');
			goto('/auth/password/forgot');
		} else {
			tokenValid = true;
		}
	});
</script>

<div class="flex min-h-[80vh] w-full items-center justify-center px-4 py-12">
	<div class="w-full max-w-md">
		{#if tokenValid}
			<!-- Header Section -->
			<div class="mb-8 text-center">
				<div
					class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sky-100"
				>
					<svg class="h-6 w-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
						/>
					</svg>
				</div>
				<h2 class="text-2xl font-semibold text-slate-900">Create new password</h2>
				<p class="mt-2 text-sm text-slate-600">Please enter a strong password for your account.</p>
			</div>

			<!-- Error Message -->
			{#if message !== null}
				<div class="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
					<div class="flex items-start">
						<svg
							class="mt-0.5 h-5 w-5 shrink-0 text-red-600"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fill-rule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
								clip-rule="evenodd"
							/>
						</svg>
						<p class="ml-3 text-sm font-medium text-red-800">{message}</p>
					</div>
				</div>
			{/if}

			<!-- Form Card -->
			<div class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
				<form
					{...PasswordReset.enhance(async ({ submit, form, data }) => {
						await submit();
						if (PasswordReset.result?.ok) {
							const res = await PasswordResetClient(data);
							if (res?.error) {
								message = res.error.message!;
							} else {
								toast.success('Password reset successful. Redirecting to sign in...');
								form.reset();
								setTimeout(() => {
									goto('/auth/sign-in');
								}, 2000);
							}
						}
					})}
					class="space-y-5"
				>
					<!-- New Password -->
					<div>
						<label for="password" class="mb-2 block text-sm font-medium text-slate-700">
							New password
						</label>
						<div class="relative">
							<Input
								{...password.as('password')}
								class={`transition-all ${password.issues() ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:border-sky-500 focus:ring-sky-500'}`}
								placeholder="At least 8 characters"
							/>
							<svg
								class="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-slate-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
								/>
							</svg>
						</div>
						{#each password.issues() || [] as issue}
							<p class="mt-2 flex items-center text-sm text-red-600">
								<svg class="mr-1.5 h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
										clip-rule="evenodd"
									/>
								</svg>
								{issue.message}
							</p>
						{/each}
					</div>

					<!-- Confirm Password -->
					<div>
						<label for="confirmPassword" class="mb-2 block text-sm font-medium text-slate-700">
							Confirm new password
						</label>
						<div class="relative">
							<Input
								{...confirmPassword.as('password')}
								class={`transition-all ${confirmPassword.issues() ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:border-sky-500 focus:ring-sky-500'}`}
								placeholder="Re-enter your password"
							/>
							<svg
								class="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-slate-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						{#each confirmPassword.issues() || [] as issue}
							<p class="mt-2 flex items-center text-sm text-red-600">
								<svg class="mr-1.5 h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
										clip-rule="evenodd"
									/>
								</svg>
								{issue.message}
							</p>
						{/each}
					</div>

					<input {...token.as('hidden', 'text')} bind:value={resetToken} readonly class="hidden" />

					<!-- Submit Button -->
					<Button
						type="submit"
						class="w-full bg-sky-600 font-medium shadow-sm transition-all duration-200 hover:bg-sky-700 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
						disabled={!!PasswordReset.pending}
					>
						{#if PasswordReset.pending}
							<svg class="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
								></circle>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
							Resetting password...
						{:else}
							Reset password
						{/if}
					</Button>
				</form>
			</div>

			<!-- Footer Link -->
			<div class="mt-6 text-center">
				<a
					href="/auth/sign-in"
					class="text-sm font-medium text-sky-600 transition-colors hover:text-sky-700"
				>
					← Back to sign in
				</a>
			</div>
		{:else}
			<!-- Loading State -->
			<div class="rounded-lg border border-slate-200 bg-white p-12 shadow-sm">
				<div class="flex flex-col items-center justify-center">
					<svg class="h-8 w-8 animate-spin text-sky-600" fill="none" viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
						></circle>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					<p class="mt-4 text-sm text-slate-600">Verifying reset token...</p>
				</div>
			</div>
		{/if}
	</div>
</div>
