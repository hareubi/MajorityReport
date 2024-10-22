<script>
    import Card from './StoryCardColumn.svelte'
    export let data
</script>

<ul class ="cards">
    {#each data.rows as row}
    {@const columns = data.columns.filter((c) => c.row === row.id)}
        <li>
            <ul>
            <h2>{row.label}</h2>
        {#each columns as column}
            {@const cards = data.cards.filter((c) => c.column === column.id && c.row === row.id)}
            <li class="column">
                <h2>{column.label}</h2>
                    <Card carddata = {cards} />
            </li>
        {/each}
            </ul>
        </li>
    {/each}
</ul>

<style>
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        gap: 1rem;
    }
    .column {
        min-width: 25ch;
        flex-direction: column;
    }
    h2 {
        margin-block-start: 0;
        margin-block-end: 0.5rem;
    }
    .cards {
        flex-direction: column;
        }
        li {
        padding: 1rem;
        background-color: var(--sk-back-1);
        border: 1px solid black;
        border-radius: 0.5rem;
        border-color: var(--sk-back-5);
    }
</style>