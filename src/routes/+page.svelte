<script>
	import { handleLogin, errormessage } from '../server.js';

	let localUsername = '';
	let localPassword = '';

	async function login() {
		await handleLogin(localUsername, localPassword);
	}

	import '../app.css';
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
</script>

<div class="grid grid-rows-[auto,1fr,auto] min-h-screen m-0 p-0">
	<Header full={false} sidebarItems={[]} />
	<div class="flex justify-center flex-grow p-0 m-0 overflow-auto">
		<div class="flex items-center justify-center w-full bg-gray-100">
			<div class="bg-white shadow-xl card w-96">
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
					<div class="mt-6 form-control">
						<button class="btn btn-primary" on:click={login}>Login</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<Footer />
</div>
