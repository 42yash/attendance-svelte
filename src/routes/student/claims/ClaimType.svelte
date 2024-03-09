<!-- src/routes/student/claims/ClaimType.svelte -->
<script>
	let selectedOption = 'medical';
</script>

<div class="btn-group join">
	<button
		class={`join-item btn ${selectedOption === 'medical' ? 'bg-success' : ''}`}
		on:click={() => (selectedOption = 'medical')}
	>
		Medical Leave
	</button>
	<button
		class={`join-item btn ${selectedOption === 'menstural' ? 'bg-success' : ''}`}
		on:click={() => (selectedOption = 'menstural')}
	>
		Menstural Leave
	</button>
	<button
		class={`join-item btn ${selectedOption === 'coCurricular' ? 'bg-success' : ''}`}
		on:click={() => (selectedOption = 'coCurricular')}
	>
		Co-Curricular Leave
	</button>
</div>
