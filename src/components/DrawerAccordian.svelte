<script>
	export let title;
	export let items;
</script>

<div class="collapse collapse-plus bg-base-200">
	<input type="radio" name="my-accordion-1" checked="checked" />
	<div class="text-xl font-medium collapse-title">
		{title}
	</div>
	<div class="collapse-content">
		{#each items as item}
			<li><a href={item.href}>{item.label}</a></li>
		{/each}
	</div>
</div>
