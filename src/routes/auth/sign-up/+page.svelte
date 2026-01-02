<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { EmailSignup } from '$lib/modules/auth/auth.remote';
	import { GoogleAuthClient, SignUpClient } from '$lib/modules/auth/client';

	const { firstname, lastname, email, _password } = EmailSignup.fields;
	let message = $state<string | null>(null);
</script>

<div class="central mt-4 min-h-[80vh]">
	<h2 class="text-center text-xl font-medium text-sky-600">Create your account</h2>

	<div class="m-4 w-sm rounded-md border border-gray-500 p-6">
		<div class="mb-4">
			{#if message == 'success'}
				<p class="rounded-sm bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
					Account created successfully! Please check your email to verify your account.
				</p>
			{:else if message !== null}
				<p class="rounded-sm bg-red-100 px-4 py-2 text-sm font-medium text-red-800">
					{message}
				</p>
			{/if}
		</div>

		<Button class="mb-4 w-full hover:bg-gray-600" onclick={GoogleAuthClient}
			>Continue with Google
		</Button>

		<form
			{...EmailSignup.enhance(async ({ submit, form, data }) => {
				await submit();
				if (EmailSignup.result?.ok) {
					const res = await SignUpClient(data);
					if (res?.error) {
						message = res.error?.message!;
					} else {
						message = 'success';
						form.reset();
					}
				}
			})}
			class="space-y-4"
		>
			<div>
				<label for="firstname">First name</label>
				<Input {...firstname.as('text')} />
				{#each firstname.issues() as issue}
					<small class="mt-1 text-xs font-medium text-red-600">{issue.message}</small>
				{/each}
			</div>

			<div>
				<label for="lastname">Last name</label>
				<Input {...lastname.as('text')} />
				{#each lastname.issues() as issue}
					<small class="mt-1 text-xs font-medium text-red-600">{issue.message}</small>
				{/each}
			</div>

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

			<Button type="submit" class="w-full bg-sky-600" disabled={!!EmailSignup.pending}>
				{EmailSignup.pending ? 'Creating account...' : 'Sign Up'}
			</Button>
		</form>
	</div>

	<div class="flex flex-col items-center justify-center gap-1 px-6">
		<a href="/auth/sign-in" class="font-medium text-gray-600 underline hover:text-sky-600"
			>Sign in</a
		>
		<a href="/auth/password/forgot" class="font-medium text-gray-600 underline hover:text-sky-600"
			>Forgot password</a
		>
	</div>
</div>
