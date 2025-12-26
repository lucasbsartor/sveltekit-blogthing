<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import favicon from '$lib/assets/favicon.svg';
	import { authClient } from '$lib/auth-client';
	import { Button } from '$lib/components/ui/button';
	import { getUser } from '$lib/remote/user.remote';
	import './layout.css';

	let { children } = $props();
	const user = $derived(await getUser());

	const handleLogout = async () => {
		authClient.signOut({
			fetchOptions: {
				onSuccess: async () => {
					await getUser().refresh();
					goto(resolve('/auth/sign-in'));
				}
			}
		});
	};
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<nav
	class="sticky top-0 z-50 w-full border-b bg-background/80 px-4 py-4 backdrop-blur-md supports-backdrop-filter:bg-background/60"
>
	<div class="mx-auto flex max-w-7xl items-center justify-between">
		<a href={resolve('/')} class="text-xl font-semibold transition-opacity hover:opacity-80"
			>SvelteKit Blog</a
		>
		<div class="flex items-center gap-4">
			{#if user}
				<Button variant="default" href={resolve('/admin')}>Admin</Button>
				<Button variant="outline" onclick={handleLogout}>Logout</Button>
			{/if}
		</div>
	</div>
</nav>

<main class="mx-auto max-w-4xl px-4 py-8">
	{@render children()}
</main>
