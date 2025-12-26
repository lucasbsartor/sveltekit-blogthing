<script lang="ts">
	import { resolve } from '$app/paths';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
</script>

<Card>
	<CardHeader>
		<CardTitle class="text-3xl font-bold">Welcome to My Blog</CardTitle>
	</CardHeader>
	<CardContent class="prose prose-neutral dark:prose-invert">
		<p class="text-lg text-muted-foreground">
			This is a SvelteKit blog built with shadcn-svelte components. Visit
			<a href={resolve('/blog')}>the blog</a> to read posts, or check out the
			<a href={resolve('/about')}>about page</a> to learn more.
		</p>
	</CardContent>
</Card>
