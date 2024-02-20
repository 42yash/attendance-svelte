<script>
	import { userSession } from './stores';
	import { onMount } from 'svelte';
	import { navigate } from 'svelte-routing';

	let user;

	$: if (userSession.isAuthenticated && userSession.role !== 'teacher') {
		navigate('/'); // Redirect to the home page or login page
	}

	onMount(() => {
		userSession.subscribe((value) => {
			user = value;
		});
	});
</script>

<div class="min-h-screen bg-gray-100">
	<div class="py-12">
		<div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
			<div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
				<div class="p-6 bg-white border-b border-gray-200">
					<!-- Dashboard content goes here -->
					<h1 class="text-xl font-semibold">teacher Dashboard</h1>
					<!-- Add more components specific to the teacher dashboard -->
				</div>
			</div>
		</div>
	</div>
</div>
