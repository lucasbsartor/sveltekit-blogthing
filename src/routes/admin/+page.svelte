<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { Button } from '$lib/components/ui/button';
	import * as Item from '$lib/components/ui/item/index.js';
	import { deletePost, getAllPosts } from '$lib/remote/posts.remote';
	import EyeIcon from '@lucide/svelte/icons/eye';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import SquarePenIcon from '@lucide/svelte/icons/square-pen';
	import Trash2Icon from '@lucide/svelte/icons/trash-2';
	const posts = $derived(await getAllPosts());

	const handleDeletePost = async (id: string) => {
		if (confirm('Are you sure you want to delete this post?')) {
			await deletePost({ id }).updates(getAllPosts());
		}
	};
</script>

<div class="space-y-4">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold">Posts</h1>
			<p class="text-muted-foreground">Manage your blog posts</p>
		</div>
		<Button
			onclick={() => goto(resolve('/admin/post/new'))}
			class="transition-transform hover:scale-105"
		>
			<PlusIcon class="mr-2 size-4" />
			New Post
		</Button>
	</div>
	{#if posts.length > 0}
		<Item.Group class="space-y-4">
			{#each posts as post (post.id)}
				<Item.Root variant="outline">
					<Item.Content>
						<Item.Title>{post.title}</Item.Title>
						<Item.Description
							>{post.createdAt.toLocaleDateString()} - By {post.authorId}</Item.Description
						>
					</Item.Content>
					<Item.Actions>
						<Button variant="outline" size="icon-sm" href={resolve(`/blog/${post.slug}`)}>
							<EyeIcon class="size-4" />
						</Button>
						<Button variant="outline" size="icon-sm" href={resolve(`/admin/post/${post.id}`)}>
							<SquarePenIcon class="size-4" />
						</Button>
						<Button variant="destructive" size="icon-sm" onclick={() => handleDeletePost(post.id)}
							><Trash2Icon class="size-4" />
						</Button>
					</Item.Actions>
				</Item.Root>
			{/each}
		</Item.Group>
	{:else}{/if}
</div>
