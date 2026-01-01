<script>
	import { Button } from '$lib/components/ui/button';
	import { authClient, SignOut } from '../../modules/auth/auth-client';

	const session = authClient.useSession();
	$inspect($session.data);
</script>

<div class="grid min-h-screen place-content-center space-y-6 p-6 text-4xl">
	<div class="flex w-fit items-center justify-center gap-4">
		<Button onclick={SignOut}>Sign out</Button>

		<Button href="/auth/update">Profile</Button>
	</div>

	<h1 class="text-4xl font-medium">DASHBOARD PAGE</h1>
	<p>
		Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
	</p>

	{#if $session.data}
		<div class="space-y-2 bg-amber-200 p-4 text-base font-medium">
			<p>
				{$session.data.user.name}
			</p>
			<p>
				{$session.data.user.email}
			</p>
			<p>
				{$session.data.user.id}
			</p>
		</div>
	{/if}
</div>
