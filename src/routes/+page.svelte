<script lang="ts">
	import { resolve } from '$app/paths';
	import * as Empty from '$lib/components/ui/empty/index.js';
	import * as Item from '$lib/components/ui/item/index.js';
	import { getAllPosts } from '$lib/remote/posts.remote';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import FileTextIcon from '@lucide/svelte/icons/file-text';

	const posts = $derived(await getAllPosts());
</script>

<div>
	{#if posts.length > 0}
		<Item.Group>
			{#each posts as post, index (post.id)}
				<Item.Root>
					{#snippet child({ props })}
						<a href={resolve(`/blog/${post.slug}`)} {...props}>
							<Item.Content>
								<Item.Title>{post.title}</Item.Title>
								<Item.Description>{post.content.slice(0, 100)}...</Item.Description>
							</Item.Content>
							<Item.Actions>
								<ChevronRightIcon class="size-4" />
							</Item.Actions>
						</a>
					{/snippet}
				</Item.Root>
				{#if index !== posts.length - 1}
					<Item.Separator />
				{/if}
			{/each}
		</Item.Group>
	{:else}
		<Empty.Root>
			<Empty.Header>
				<Empty.Media variant="icon">
					<FileTextIcon />
				</Empty.Media>
				<Empty.Title>No Posts Yet</Empty.Title>
				<Empty.Description>Come back later to see the latest posts.</Empty.Description>
			</Empty.Header>
		</Empty.Root>
	{/if}
</div>
