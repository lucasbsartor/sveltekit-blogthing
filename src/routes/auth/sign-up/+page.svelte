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

	const handleSignUp = async (event: Event) => {
		error = null;
		event.preventDefault();

		const formData = new FormData(event.target as HTMLFormElement);

		const username = formData.get('username') as string;
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const confirmPassword = formData.get('confirm_password') as string;

		if (password !== confirmPassword) {
			error = 'Passwords do not match';
			return;
		}

		await authClient.signUp.email(
			{
				name: username,
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
					return;
				}
			}
		);
	};
</script>

<div class="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center gap-4">
	<Card.Root class="mx-auto w-full max-w-sm">
		<Card.Header>
			<Card.Title class="text-2xl">Sign Up</Card.Title>
			<Card.Description>Enter your email below to sign up for an account</Card.Description>
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
			<form onsubmit={handleSignUp}>
				<Field.Group>
					<Field.Field>
						<Field.Label for="username">Username</Field.Label>
						<Input id="username" name="username" type="text" placeholder="johndoe" required />
					</Field.Field>
					<Field.Field>
						<Field.Label for="email">Email</Field.Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="johndoe@example.com"
							required
						/>
					</Field.Field>
					<Field.Field>
						<Field.Label for="password">Password</Field.Label>
						<Input id="password" name="password" type="password" required />
					</Field.Field>
					<Field.Field>
						<Field.Label for="confirm_password">Confirm Password</Field.Label>
						<Input id="confirm_password" name="confirm_password" type="password" required />
					</Field.Field>
					<Field.Field>
						<Button type="submit" class="w-full">Sign Up</Button>
						<Field.Description class="text-center">
							Already have an account? <a href={resolve('/auth/sign-in')}>Sign in</a>
						</Field.Description>
					</Field.Field>
				</Field.Group>
			</form>
		</Card.Content>
	</Card.Root>
</div>
