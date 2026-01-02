<script lang="ts">
	import toast from 'svelte-french-toast';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { PasswordRequest } from '$lib/modules/auth/auth.remote';
	import { PasswordRequestClient } from '$lib/modules/auth/client';

	const { email } = PasswordRequest.fields;

	let emailSent = $state(false);
	let message = $state<string | null>(null);
</script>

<div class="grid min-h-screen place-content-center">
	{#if emailSent}
		<div class="mx-auto max-w-md">
			<!-- Success Card -->
			<div
				class="rounded-lg border border-green-200 bg-linear-to-br from-green-50 to-emerald-50 p-6 shadow-sm"
			>
				<!-- Icon -->
				<div
					class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
				>
					<svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
						/>
					</svg>
				</div>

				<!-- Content -->
				<div class="text-center">
					<h3 class="text-xl font-semibold text-slate-900">Check your email</h3>
					<p class="mt-3 text-sm leading-relaxed text-slate-700">
						We've sent password reset instructions to your email address.
					</p>
				</div>

				<!-- Info Box -->
				<div class="mt-5 rounded-md bg-white/60 p-4">
					<div class="flex items-start">
						<svg
							class="mt-0.5 h-5 w-5 shrink-0 text-slate-500"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fill-rule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
								clip-rule="evenodd"
							/>
						</svg>
						<p class="ml-3 text-sm text-slate-600">
							Can't find the email? Check your spam or junk folder.
						</p>
					</div>
				</div>

				<!-- Action Button -->
				<div class="mt-6">
					<a
						href="/login"
						class="block w-full rounded-md bg-green-600 px-4 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
					>
						Return to sign in
					</a>
				</div>

				<!-- Resend Link -->
				<div class="mt-4 text-center">
					<button
						type="button"
						class="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
					>
						Didn't receive the email? Resend
					</button>
				</div>
			</div>
		</div>
	{:else}
		<div class="mx-auto max-w-md">
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
							d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
						/>
					</svg>
				</div>
				<h2 class="text-2xl font-semibold text-slate-900">Reset your password</h2>
				<p class="mt-2 text-sm text-slate-600">
					Enter your email address and we'll send you instructions to reset your password.
				</p>
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

			<!-- Form -->
			<form
				{...PasswordRequest.enhance(async ({ submit, form, data }) => {
					await submit();
					if (PasswordRequest.result?.ok) {
						const res = await PasswordRequestClient(data.email);
						if (res?.error) {
							message = res.error.message!;
						} else {
							emailSent = true;
							toast.success('Reset instructions sent to your email');
							form.reset();
						}
					}
				})}
				class="space-y-6"
			>
				<div>
					<label for="email" class="mb-2 block text-sm font-medium text-slate-700">
						Email address
					</label>
					<Input
						{...email.as('email')}
						class={`transition-all ${email.issues() ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:border-sky-500 focus:ring-sky-500'}`}
					/>
					{#each email.issues() || [] as issue}
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

				<Button
					type="submit"
					class="w-full bg-sky-600 font-medium shadow-sm transition-all duration-200 hover:bg-sky-700 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
					disabled={PasswordRequest.pending > 0}
				>
					{#if PasswordRequest.pending > 0}
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
						Sending...
					{:else}
						Send reset instructions
					{/if}
				</Button>
			</form>

			<!-- Footer Links -->
			<div class="mt-6 text-center">
				<a
					href="/login"
					class="text-sm font-medium text-sky-600 transition-colors hover:text-sky-700"
				>
					← Back to sign in
				</a>
			</div>
		</div>
	{/if}
</div>
