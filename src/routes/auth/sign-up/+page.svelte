<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { emailSignup } from '../../../modules/auth/auth.remote';

	const { firstname, lastname, email, password } = emailSignup.fields;
</script>

<div class="grid min-h-screen place-content-center">
	{#if emailSignup.result?.success}
		<p class="rounded-lg bg-green-100 p-2 text-sm font-medium text-green-800">
			Account created successfully! Please check your email to verify your account.
		</p>
	{:else if emailSignup.result?.error}
		<p class="rounded-lg bg-red-100 p-2 text-sm font-medium text-red-800">
			{emailSignup.result.error.message}
		</p>
	{/if}

	<form {...emailSignup} class="space-y-2">
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
</div>
