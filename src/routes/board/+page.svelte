<script>
	import Cardlist from './cardlist.svelte';
	export let data
</script>

<ul>
    <Cardlist data = {data} />
</ul>

<style>
        ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        gap: 1rem;
    }
</style>