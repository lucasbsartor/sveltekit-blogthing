<script lang="ts">
	import { resolve } from '$app/paths';
	import favicon from '$lib/assets/favicon.svg';
	import './layout.css';
	import { getUser } from '$lib/remote/user.remote';
	import { authClient } from '$lib/auth-client';
	import { goto, onNavigate } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';

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

	onNavigate((navigate) => {
		if (!document.startViewTransition) {
			return;
		}

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigate.complete;
			});
		});
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<nav class="w-full border-b bg-background px-4 py-3">
	<div class="mx-auto flex max-w-7xl items-center justify-between">
		<a href={resolve('/')} class="text-xl font-semibold">My Blog</a>
		<div class="flex items-center gap-4">
			<Button variant="ghost" href={resolve('/')}>Home</Button>
			<Button variant="ghost" href={resolve('/blog')}>Blog</Button>
			<Button variant="ghost" href={resolve('/about')}>About</Button>
			{#if user}
				<Separator orientation="vertical" class="h-6!" />
				<Button variant="ghost" href={resolve('/admin')}>Admin</Button>
				<Button variant="ghost" onclick={handleLogout}>Logout</Button>
			{/if}
		</div>
	</div>
</nav>

<main class="mx-auto max-w-7xl px-4 py-6">
	{@render children()}
</main>
