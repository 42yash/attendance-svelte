<script>
	import { userSession } from './../../../../server.js';
	import AttendanceTable, { Periods } from '../../AttendanceTable.svelte';
	import { env } from '$lib/env';
	import { goto } from '$app/navigation';
	import Dropzone from './Dropzone.svelte';

	let reason = '';
	let description = '';
	let formData;
	let dropzone;
	let uploadedFilesInfo = []; // To store the data received from the event
	let isMenstrual = false;
	let dropzoneError = '';
	let periodError = '';

	$: if (isMenstrual) {
		if (reason == '') {
			reason = 'Menstrual Leave';
		}
	}

	function handleUploadComplete(event) {
		uploadedFilesInfo = event.detail.uploadedFiles;
		console.log('from hupc', uploadedFilesInfo); // You can now use this data as needed
	}

	async function handleSubmit() {
		if (dropzone) {
			await dropzone.uploadFiles();
			if ((uploadedFilesInfo.length == 0) & (isMenstrual == false)) {
				dropzoneError = 'Please upload at least one file';
				return;
			}
		}

		if (Periods.size == 0) {
			periodError = 'Please select at least one period';
			return;
		}

		const fileUrls = uploadedFilesInfo.map((file) => file.path);
		const filenames = uploadedFilesInfo.map((file) => file.name);
		let data = Array.from(Periods.keys());
		formData = JSON.stringify({
			reason,
			description,
			files: fileUrls,
			data,
			filenames: filenames
		});

		const response = await fetch(`${env.GO_API_KEY}/claims/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${$userSession.token}`
			},
			body: formData
		});

		if (response.ok) {
			data = await response.json();
			console.log(data);
			goto(`${data.ID}`);
		} else {
			console.log(response);
		}
	}
</script>

<form
	class="grid grid-cols-1 gap-4 p-8 m-8 mx-32 bg-white rounded-lg shadow-lg shadow-primary sm:grid-cols-2"
	on:submit|preventDefault={handleSubmit}
>
	<div class="flex items-center self-center justify-between col-span-2 p-4">
		<h2 class="px-4 text-4xl font-semibold">New Claim</h2>
		<button
			type="button"
			class="px-8 text-l btn-warning btn btn-outline"
			on:click={() => goto('/student/claims')}>Discard</button
		>
	</div>

	<div class="col-span-1">
		<div class="col-span-1 p-4 space-y-1 form-control">
			<label class="label">
				<span class="label-text">Reason</span>
			</label>
			<input required type="text" class="w-full input input-bordered max-w-s" bind:value={reason} />
		</div>
		<div class="col-span-1 p-4 space-y-1 form-control">
			<label class="label">
				<span class="label-text">Description</span>
			</label>
			<textarea
				required
				type="text"
				class="w-full h-40 resize-none textarea textarea-bordered max-w-s"
				bind:value={description}
			/>
		</div>
	</div>

	<div class="p-4 space-y-1 form-control">
		<label class="label">
			<span class="label-text">Upload files</span>
		</label>
		<p class="p-1 text-error">
			<small>{dropzoneError}</small>
		</p>
		<Dropzone bind:this={dropzone} on:uploadcomplete={handleUploadComplete} />
		<p class="p-1 prose">
			<small
				>Note: Please only upload scans or softcopy of originals. Do not apply any filters or crop
				the document. All the images should be clear and the dates should be clearly visible.</small
			>
		</p>
		<div class="form-control space-y-1">
			<label class="cursor-pointer label justify-start gap-4">
				<span class="label-text">Menstrual Leave</span>
				<input type="checkbox" class="checkbox checkbox-error" bind:checked={isMenstrual} />
			</label>
		</div>
	</div>

	<div class="col-span-2">
		<p class="p-1 text-error">
			<small>{periodError}</small>
		</p>
		<AttendanceTable />
	</div>

	<div class="self-center col-span-2 p-4 text-end">
		<button type="submit" class="btn btn-outline btn-success">Submit</button>
	</div>
</form>
