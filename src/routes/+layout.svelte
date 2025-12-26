<script lang="ts">
	import { resolve } from '$app/paths';
	import favicon from '$lib/assets/favicon.svg';
	import '@picocss/pico';
	import './layout.css';
	import { getUser } from '$lib/remote/user.remote';
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';

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

<nav class="container">
	<ul>
		<li><strong>My Blog</strong></li>
	</ul>
	<ul>
		<li><a href={resolve('/')}>Home</a></li>
		<li><a href={resolve('/blog')}>Blog</a></li>
		<li><a href={resolve('/about')}>About</a></li>
		{#if user}
			<li><a href={resolve('/admin')}>Admin</a></li>
			<li><button onclick={handleLogout}>Logout</button></li>
		{/if}
	</ul>
</nav>

{@render children()}
