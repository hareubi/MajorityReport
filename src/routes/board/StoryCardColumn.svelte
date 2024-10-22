<script>
    export let carddata
</script>

{#if carddata.length > 0}
    <ul>
        {#each carddata as card}
            <li class="cards">
               {card.title}
            </li>
        {/each}
    </ul>
    {:else}
        <p>No Cards...</p>
{/if}
<style>
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flexbox;
        gap: 1rem;
    }
    .cards {
        flex-direction: row;
        }
        li {
        padding: 1rem;
        background-color: var(--sk-back-1);
        border: 1px solid black;
        border-radius: 0.5rem;
        border-color: var(--sk-back-5);
    }
</style>