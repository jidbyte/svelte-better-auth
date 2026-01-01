<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import toast from 'svelte-french-toast';
	import { emailLogin } from '../../../modules/auth/auth.remote';
	import { resolve } from '$app/paths';
	import { authClient } from '../../../modules/auth/auth-client';

	const { email, password } = emailLogin.fields;
</script>

<div class="grid min-h-screen place-content-center">
	{#if emailLogin.result?.error}
		<p class="rounded-md bg-red-100 p-2.5 text-sm font-medium text-red-800">
			{emailLogin.result.error.message}
		</p>
	{/if}

	<form
		{...emailLogin.enhance(async ({ submit, form }) => {
			await submit();
			if (emailLogin.result?.success) {
				toast.success('Sign in successful. Redirecting...');
				form.reset();
				goto(resolve('/dashboard'));
			}
		})}
		class="space-y-2"
	>
		<div>
			<label for="email">Email</label>
			<input {...email.as('text')} />
			{#each email.issues() as issue}
				<p class="mt-1 text-sm text-red-600">{issue.message}</p>
			{/each}
		</div>

		<div>
			<label for="password">Password</label>
			<input {...password.as('text')} />
			{#each password.issues() as issue}
				<p class="mt-1 text-sm text-red-600">{issue.message}</p>
			{/each}
		</div>

		<Button type="submit">Submit</Button>
	</form>

	<div>
		<Button
			variant="outline"
			class="my-4 w-full"
			onclick={async () => {
				try {
					await authClient.signIn.social({
						provider: 'google',
						callbackURL: '/dashboard'
					});
				} catch (error) {
					console.error('Failed to initiate Google sign-in:', error);
					toast.error('Failed to start Google sign-in');
				}
			}}
		>
			Sign in with Google
		</Button>
	</div>

	<a href="/auth/password/forgot" class="text-sky-600 hover:underline">Forgot password</a>
</div>
