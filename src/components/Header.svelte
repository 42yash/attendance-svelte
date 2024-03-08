<script>
	import LogoutButton from './LogoutButton.svelte';
	import Drawer from './Drawer.svelte';

	export let full;
	export let sidebarItems;
</script>

<div class="grid grid-flow-col border-b-2 border-black grid-cols-auto navbar">
	{#if full}
		<Drawer items={sidebarItems} />
	{/if}
	<div class="self-center justify-center w-full col-span-1">
		<img class="h-16" alt="Christ University Logo" src="/christlogo.jpg" />
	</div>
	{#if full}
		<LogoutButton />
	{/if}
</div>
