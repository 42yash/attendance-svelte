<script>
  import "../app.css";
  import Nav from "../components/Nav.svelte";
</script>

<div class="flex min-h-vh">
  <Nav />
  <slot />
</div>