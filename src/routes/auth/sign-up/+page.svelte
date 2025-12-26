<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';
	import { resolve } from '$app/paths';
	import { getUser } from '$lib/remote/user.remote';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Field from '$lib/components/ui/field';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';

	let confirmPasswordError = $state<boolean | undefined>();

	const handleSignUp = async (event: Event) => {
		confirmPasswordError = undefined;
		event.preventDefault();

		const formData = new FormData(event.target as HTMLFormElement);

		const username = formData.get('username') as string;
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const confirmPassword = formData.get('confirm_password') as string;

		if (password !== confirmPassword) {
			confirmPasswordError = true;
			return;
		}

		const response = await authClient.signUp.email(
			{
				name: username,
				email,
				password
			},
			{
				onSuccess: async () => {
					await getUser().refresh();
					goto(resolve('/'));
				}
			}
		);

		if (response.error) {
			alert(response.error.message);
			return;
		}
	};
</script>

<div class="flex min-h-[calc(100vh-200px)] items-center justify-center">
	<Card class="w-full max-w-md">
		<CardHeader>
			<CardTitle>Sign Up</CardTitle>
			<CardDescription>Create a new account to get started</CardDescription>
		</CardHeader>
		<form onsubmit={handleSignUp}>
			<CardContent>
				<Field.Set>
					<Field.Group>
						<Field.Field>
							<Field.Label for="username">Username</Field.Label>
							<Input type="text" id="username" name="username" placeholder="Username" required />
						</Field.Field>
						<Field.Field>
							<Field.Label for="email">Email</Field.Label>
							<Input type="email" id="email" name="email" placeholder="Email" required />
						</Field.Field>
						<Field.Field>
							<Field.Label for="password">Password</Field.Label>
							<Input
								type="password"
								id="password"
								name="password"
								placeholder="Password"
								required
							/>
						</Field.Field>
						<Field.Field data-invalid={confirmPasswordError}>
							<Field.Label for="confirm_password">Confirm Password</Field.Label>
							<Input
								type="password"
								id="confirm_password"
								name="confirm_password"
								placeholder="Confirm Password"
								required
								aria-invalid={confirmPasswordError}
							/>
							{#if confirmPasswordError}
								<Field.Error>Passwords do not match</Field.Error>
							{/if}
						</Field.Field>
					</Field.Group>
				</Field.Set>
			</CardContent>
			<CardFooter class="flex flex-col gap-4">
				<Button type="submit" class="w-full">Sign Up</Button>
				<p class="text-center text-sm text-muted-foreground">
					Already have an account? <a
						href={resolve('/auth/sign-in')}
						class="text-primary hover:underline">Sign in</a
					>
				</p>
			</CardFooter>
		</form>
	</Card>
</div>
