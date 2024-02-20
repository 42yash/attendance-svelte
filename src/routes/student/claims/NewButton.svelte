<script>
	import { goto } from '$app/navigation';
	function newClaim() {
		goto('/student/claims/new');
	}
</script>

<div class="w-full flex justify-end">
	<div
		class="bg-white border rounded-lg shadow-md px-8 py-4 text-xl w-4/12 m-4 text-center"
		on:click={newClaim}
	>
		New
	</div>
</div>
