<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { EmailLogin } from '$lib/modules/auth/auth.remote';
	import { GoogleAuthClient, LoginClient } from '$lib/modules/auth/client';

	const { email, _password } = EmailLogin.fields;
	let message = $state<string | null>(null);
</script>

<div class="central mt-4 min-h-[80vh]">
	<h2 class="text-center text-xl font-medium text-sky-600">Sign into your account</h2>

	<div class="m-4 w-md rounded-md border border-gray-500 p-6">
		<div class="mb-4">
			{#if message !== null}
				<p class="rounded-sm bg-red-100 px-4 py-2 text-sm font-medium text-red-800">
					{message}
				</p>
			{/if}
		</div>

		<Button class="mb-4 w-full hover:bg-gray-600" onclick={GoogleAuthClient}
			>Continue with Google
		</Button>

		<form
			{...EmailLogin.enhance(async ({ submit, form, data }) => {
				await submit();
				if (EmailLogin.result?.ok) {
					const res = await LoginClient(data);
					if (res?.error) {
						message = res.error?.message!;
					} else {
						goto(resolve('/dashboard'));
						form.reset();
					}
				}
			})}
			class="space-y-4"
		>
			<div>
				<label for="email">Email</label>
				<Input {...email.as('text')} />
				{#each email.issues() as issue}
					<small class="mt-1 text-xs font-medium text-red-600">{issue.message}</small>
				{/each}
			</div>

			<div>
				<label for="password">Password</label>
				<Input {..._password.as('password')} />
				{#each _password.issues() as issue}
					<small class="mt-1 text-xs font-medium text-red-600">{issue.message}</small>
				{/each}
			</div>

			<Button type="submit" class="w-full bg-sky-600" disabled={!!EmailLogin.pending}>
				{EmailLogin.pending ? 'Signing in...' : 'Sign In'}
			</Button>
		</form>
	</div>

	<div class="flex flex-col items-center justify-center gap-1 px-6">
		<a href="/auth/sign-up" class="font-medium text-gray-600 underline hover:text-sky-600"
			>Sign up</a
		>
		<a href="/auth/password/forgot" class="font-medium text-gray-600 underline hover:text-sky-600"
			>Forgot password</a
		>
	</div>
</div>
