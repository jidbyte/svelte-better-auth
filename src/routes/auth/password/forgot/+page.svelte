<script lang="ts">
	import toast from 'svelte-french-toast';
	import { forgotPassword } from '../../../../modules/auth/auth.remote';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';

	const { email } = forgotPassword.fields;

	let emailSent = $state(false);
</script>

<div class="grid min-h-screen place-content-center">
	{#if emailSent}
		<div class="rounded-md bg-green-100 p-4 text-center">
			<p class="font-medium text-green-800">Check your email</p>
			<p class="mt-2 text-sm text-green-700">
				We've sent password reset instructions to your email address.
			</p>
		</div>
	{:else}
		{#if forgotPassword.result?.error}
			<p class="rounded-md bg-red-100 p-2.5 text-sm font-medium text-red-800">
				{forgotPassword.result.error.message}
			</p>
		{/if}

		<p class="mb-4 text-sm text-slate-600">
			Enter your email address and we'll send you instructions to reset your password.
		</p>

		<form
			{...forgotPassword.enhance(async ({ submit, form }) => {
				await submit();
				if (forgotPassword.result?.success) {
					emailSent = true;
					toast.success('Reset instructions sent to your email');
					form.reset();
				}
			})}
			class="space-y-4"
		>
			<div>
				<label for="email">Email</label>
				<Input {...email.as('email')} class={email.issues() ? 'border-red-500' : ''} />
				{#each email.issues() || [] as issue}
					<p class="mt-1 text-sm text-red-600">{issue.message}</p>
				{/each}
			</div>

			<Button type="submit" class="mt-4 w-full bg-sky-600" disabled={forgotPassword.pending > 0}>
				{forgotPassword.pending > 0 ? 'Sending...' : 'Send Reset Instructions'}
			</Button>
		</form>
	{/if}
</div>
