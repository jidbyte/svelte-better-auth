<script>
	import { Button } from '$lib/components/ui/button';
</script>

<div class="grid min-h-screen place-content-center space-y-6 p-6 text-2xl">
	<h1 class="text-4xl font-medium">The Inventory App</h1>
	<p>
		Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
	</p>

	<div class="flex gap-4">
		<Button href="/auth/sign-in">Login</Button>
		<Button href="/auth/sign-up">Register</Button>
	</div>
</div>
