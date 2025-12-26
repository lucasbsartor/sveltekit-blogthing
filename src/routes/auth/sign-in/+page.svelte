<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { authClient } from '$lib/auth-client';
	import * as Alert from '$lib/components/ui/alert';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Field from '$lib/components/ui/field';
	import { Input } from '$lib/components/ui/input';
	import { getUser } from '$lib/remote/user.remote';
	import AlertCircleIcon from '@lucide/svelte/icons/alert-circle';

	let error = $state<string | null>(null);

	const handleSignIn = async (event: Event) => {
		error = null;
		event.preventDefault();

		const formData = new FormData(event.target as HTMLFormElement);

		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		await authClient.signIn.email(
			{
				email,
				password
			},
			{
				onSuccess: async () => {
					await getUser().refresh();
					goto(resolve('/'));
				},
				onError: (err) => {
					error = err.error.message ?? 'An error occurred';
				}
			}
		);
	};
</script>

<div class="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center gap-4">
	<Card.Root class="mx-auto w-full max-w-sm">
		<Card.Header>
			<Card.Title class="text-2xl">Sign In</Card.Title>
			<Card.Description>Enter your credentials to access your account</Card.Description>
		</Card.Header>
		{#if error}
			<Card.Content class="pt-0">
				<Alert.Root variant="destructive" class="border-red-500">
					<AlertCircleIcon class="size-4" />
					<Alert.Title>Error</Alert.Title>
					<Alert.Description>{error}</Alert.Description>
				</Alert.Root>
			</Card.Content>
		{/if}
		<Card.Content>
			<form onsubmit={handleSignIn}>
				<Field.Group>
					<Field.Field>
						<Field.Label for="email">Email</Field.Label>
						<Input id="email" name="email" type="email" placeholder="Email" required />
					</Field.Field>
					<Field.Field>
						<Field.Label for="password">Password</Field.Label>
						<Input id="password" name="password" type="password" placeholder="Password" required />
					</Field.Field>
					<Field.Field>
						<Button type="submit" class="w-full">Sign In</Button>
						<Field.Description class="text-center">
							Don't have an account? <a href={resolve('/auth/sign-up')}>Sign up</a>
						</Field.Description>
					</Field.Field>
				</Field.Group>
			</form>
		</Card.Content>
	</Card.Root>
</div>
