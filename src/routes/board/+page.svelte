<script>
	import Cardlist from './StoryCardRow.svelte';
	import {CardData} from '../../Shared/Board';
</script>

<ul>
    {#await CardData()}
		Loading Agile Board...
	{:then data}
    <Cardlist data = {data} />
    {/await}
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