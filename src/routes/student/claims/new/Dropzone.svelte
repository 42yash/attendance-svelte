<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import Dropzone from 'dropzone';
	import 'dropzone/dist/dropzone.css';
	import { v4 as uuidv4 } from 'uuid';
	import supabase from '$lib/supabase';

	const dispatch = createEventDispatcher();
	let dropzone;
	let filesToUpload = [];

	onMount(() => {
		Dropzone.autoDiscover = false;
		dropzone = new Dropzone('#custom-dropzone', {
			url: '/file/post',
			autoProcessQueue: false,
			clickable: true,
			addRemoveLinks: true,
			dictRemoveFile: 'Remove',
			acceptedFiles: 'image/*,application/pdf'
		});

		dropzone.on('addedfile', (file) => {
			filesToUpload.push(file);
		});

		dropzone.on('removedfile', (file) => {
			filesToUpload = filesToUpload.filter((f) => f !== file);
		});
	});

	export async function uploadFiles() {
		let uploadedFiles = []; // Array to store the results of uploaded files

		for (const file of filesToUpload) {
			const bucketName = 'medical-docs';
			const fileExtension = file.name.split('.').pop();
			const fileName = `${uuidv4()}.${fileExtension}`;
			const filePath = `public/${fileName}`;

			const { data, error } = await supabase.storage.from(bucketName).upload(filePath, file);

			if (error) {
				console.error('Error uploading file:', error);
			} else {
				uploadedFiles.push({ name: file.name, path: data.path });
				console.log(uploadedFiles);
			}
		}

		// Dispatch a custom event with the uploaded files data
		dispatch('uploadcomplete', { uploadedFiles });

		filesToUpload = [];
		dropzone.removeAllFiles();
	}
</script>

<div id="custom-dropzone" class="dropzone"></div>

<style>
	.dropzone {
		border: 2px dashed #dddddd;
		border-radius: 5px;
		background: white;
		cursor: pointer;
	}
</style>
