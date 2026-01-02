<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from 'svelte-french-toast';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Toaster />

<main>
	<nav class="mt-4 flex items-center justify-center gap-4">
		<a href="/">Home</a>
		<a href="/dashboard">Dashboard</a>
	</nav>

	{@render children()}
</main>
