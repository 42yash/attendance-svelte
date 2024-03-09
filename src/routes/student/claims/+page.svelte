<script>
	import { goto } from '$app/navigation';
	import MedicalTable from './MedicalTable.svelte';
	import MensturalTable from './MensturalTable.svelte';
	import CoCurricularTable from './CoCurricularTable.svelte';
	let selectedOption = 'medical';
</script>

<div class="container flex flex-col p-8 m-8 mx-auto bg-white rounded shadow-2xl">
	<h1 class="px-4 mb-4 text-4xl font-bold">Leaves</h1>
	<div class="flex items-center justify-between p-4 mb-4">
		<div class="btn-group join">
			<button
				class={`join-item p-4 btn ${selectedOption === 'medical' ? 'btn-active' : ''} `}
				on:click={() => (selectedOption = 'medical')}
			>
				Medical Leave
			</button>
			<button
				class={`join-item p-4 btn ${selectedOption === 'menstural' ? 'btn-active' : ''} `}
				on:click={() => (selectedOption = 'menstural')}
			>
				Menstural Leave
			</button>
			<button
				class={`join-item p-4 btn ${selectedOption === 'coCurricular' ? 'btn-active' : ''} `}
				on:click={() => (selectedOption = 'coCurricular')}
			>
				Co-Curricular Leave
			</button>
		</div>
		<button class="px-8 text-l btn" on:click={() => goto('/student/claims/new')}>New</button>
	</div>
	{#if selectedOption === 'medical'}
		<MedicalTable />
	{:else if selectedOption === 'menstural'}
		<MensturalTable />
	{:else}
		<CoCurricularTable />
	{/if}
</div>
