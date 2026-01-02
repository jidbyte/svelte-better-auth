<script>
	import { invalidateAll } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { client, SignOutClient } from '$lib/modules/auth/client';
	import { onMount } from 'svelte';

	const session = client.useSession();
	// $inspect($session.data);

	onMount(() => invalidateAll());
</script>

<div class="central mt-20 space-y-6 text-2xl">
	<div class="flex w-fit items-center justify-center gap-4">
		<Button onclick={SignOutClient}>Sign out</Button>

		<Button href="/profile">Profile</Button>
	</div>

	<h1 class="text-4xl font-medium">DASHBOARD PAGE</h1>
	<p>
		Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
	</p>

	{#if $session.data}
		<div class="space-y-2 bg-sky-200 p-4 text-base font-medium">
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
