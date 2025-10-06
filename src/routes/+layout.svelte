<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<svelte:boundary>
	{#snippet pending()}
		<p>Loading...</p>
	{/snippet}
	{@render children?.()}
</svelte:boundary>
