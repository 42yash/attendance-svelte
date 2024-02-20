<script>
	import LogoutButton from './LogoutButton.svelte';
	import Drawer from './Drawer.svelte';
</script>

<div class="navbar grid grid-flow-col grid-cols-3 border-b-2 border-black">
	<Drawer />
	<div class="justify-center col-span-1">
		<img class="h-16" alt="Christ University Logo" src="/christlogo.jpg" />
	</div>
	<LogoutButton />
</div>
