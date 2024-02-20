<script>
	import '../app.css';
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	import Drawer from '../components/Drawer.svelte';
</script>

<div class="grid grid-rows-[auto,1fr,auto] min-h-screen m-0 p-0">
	<Header />
	<div class="overflow-auto m-0 p-0 flex flex-grow justify-center">
		<slot />
	</div>
	<Footer />
</div>
