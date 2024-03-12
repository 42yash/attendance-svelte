<script>
	import { userSession } from './../../../../server.js';
	import AttendanceTable, { Periods } from '../../AttendanceTable.svelte';
	import { env } from '$lib/env';
	import { goto } from '$app/navigation';
	import supabase from "$lib/supabase"
	import { v4 as uuidv4 } from 'uuid';

	let reason = '';
	let description = '';
	let formData;
	let files = [];
	let fileUrls = [];
	
	async function uploadFiles() {
  // Assuming you have a bucket named 'uploads'
  const bucketName = 'medical-docs';

  // Iterate over the files array and upload each file
  for (const file of files) {
    const fileExtension = file.name.split('.').pop(); // Extract file extension
    const fileName = `${uuidv4()}.${fileExtension}`; // Generate a new file name with the UUID
    const filePath = `public/${fileName}`; // Define the upload path

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file);

    if (error) {
      console.error('Error uploading file:', error);
      return;
    } else {
			fileUrls.push(data.path);
		}
  }
}

	async function handleSubmit() {
		await uploadFiles();
		let data = Array.from(Periods.keys());
		formData = JSON.stringify({
			reason,
			description,
			files: fileUrls,
			data
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
			<input type="text" class="w-full input input-bordered max-w-s" bind:value={reason} />
		</div>
		<div class="col-span-1 p-4 space-y-1 form-control">
			<label class="label">
				<span class="label-text">Description</span>
			</label>
			<textarea
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
		<input type="file" multiple class="w-full file-input file-input-bordered max-w-s" bind:files={files} />
		<p class="p-1 prose">
			<small
				>Note: Please only upload scans or softcopy of originals. Do not apply any filters or crop
				the document. All the images should be clear and the dates should be clearly visible.</small
			>
		</p>
	</div>

	<div class="col-span-2">
		<AttendanceTable />
	</div>

	<div class="self-center col-span-2 p-4 text-end">
		<button type="submit" class="btn btn-outline btn-success">Submit</button>
	</div>
</form>
