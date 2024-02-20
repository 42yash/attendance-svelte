<script>
	import { handleLogin, userSession, errormessage } from '../server.js';

	let localUsername = '';
	let localPassword = '';

	async function login() {
		await handleLogin(localUsername, localPassword);
	}
</script>

<div class="flex items-center justify-center bg-gray-100 w-full">
	<div class="card w-96 bg-white shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Login</h2>
			{#if errormessage}
				<div class="alert alert-error">{errormessage}</div>
			{/if}
			<div class="form-control">
				<label class="label">
					<span class="label-text">Username</span>
				</label>
				<input
					type="text"
					placeholder="Username"
					class="input input-bordered"
					bind:value={localUsername}
				/>
			</div>
			<div class="form-control">
				<label class="label">
					<span class="label-text">Password</span>
				</label>
				<input
					type="password"
					placeholder="Password"
					class="input input-bordered"
					bind:value={localPassword}
				/>
			</div>
			<div class="form-control mt-6">
				<button class="btn btn-primary" on:click={login}>Login</button>
			</div>
		</div>
	</div>
</div>
