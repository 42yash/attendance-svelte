<script>
	import { writable } from 'svelte/store';
	import AttendanceTable from '../../AttendanceTable.svelte';

	let reason = '';
	let description = '';
	let file;

	function handleSubmit() {
		// Handle form submission...
	}
</script>

<form
	class="p-8 bg-white rounded-lg shadow-lg shadow-primary grid grid-cols-1 sm:grid-cols-2 gap-4 mx-32 m-8"
	on:submit|preventDefault={handleSubmit}
>
	<h2 class="text-2xl font-semibold col-span-2 self-center px-4">New Claim</h2>

	<div class="col-span-1">
		<div class="form-control col-span-1 p-4 space-y-1">
			<label class="label">
				<span class="label-text">Reason</span>
			</label>
			<input type="text" class="input input-bordered w-full max-w-s" bind:value={reason} />
		</div>
		<div class="form-control col-span-1 p-4 space-y-1">
			<label class="label">
				<span class="label-text">Description</span>
			</label>
			<input
				type="text"
				class="textarea textarea-bordered w-full max-w-s h-40"
				bind:value={description}
			/>
		</div>
	</div>

	<div class="form-control p-4 space-y-1">
		<label class="label">
			<span class="label-text">Upload files</span>
		</label>
		<input type="file" class="file-input file-input-bordered w-full max-w-s" bind:files={file} />
	</div>

	<div class="col-span-2">
		<AttendanceTable />
	</div>

	<div class="col-span-2 text-end p-4 self-center">
		<button type="submit" class="btn btn-outline btn-success">Submit</button>
	</div>
</form>
