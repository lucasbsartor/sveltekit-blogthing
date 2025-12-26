<script lang="ts">
	import * as Item from '$lib/components/ui/item/index.js';
	import { resolve } from '$app/paths';
	import { Button } from '$lib/components/ui/button';
	import { getAllPosts } from '$lib/remote/posts.remote';

	const posts = $derived(await getAllPosts());
</script>

<h1 class="text-3xl font-bold">Blog</h1>
<div class="space-y-6">
	{#if !posts}
		<p class="text-muted-foreground">No posts yet. Check back later!</p>
	{:else}
		<div class="flex flex-col gap-6">
			{#each posts as post (post.slug)}
				<Item.Root variant="outline">
					<Item.Content>
						<Item.Title>{post.title}</Item.Title>
						<Item.Description>
							{post.createdAt.toLocaleDateString()}
						</Item.Description>
					</Item.Content>
					<Item.Actions>
						<Button variant="outline" size="sm" href={resolve(`/blog/${post.slug}`)}
							>Read More</Button
						>
					</Item.Actions>
				</Item.Root>
			{/each}
		</div>
	{/if}
</div>
