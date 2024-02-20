<script>
	export let data;
</script>

<div class="mx-auto space-y-4 w-full flex-grow">
	<div class="bg-white rounded-2xl p-6 space-y-4 h-full shadow-2xl">
		<h5 class="text-2xl">{data.title}</h5>
		<ul class="space-y-2 text-l">
			{#each data.notifications as notification}
				<li>{notification}</li>
			{/each}
		</ul>
	</div>
</div>
