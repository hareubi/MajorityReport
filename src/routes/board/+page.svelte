<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script>
	const items = [{text: 'Home', link: "/"},
				{text: 'Sverdle', link: "/sverdle"},
				{text: 'about', link: "/about"},
				{text: 'board', link: "/board"},
				{text: 'plan', link: "/plan"}
				];
</script>

<div class="text-column">
<ol>
	<ul>
		{#each items as item }
				<a href={item.link}>{item.text}</a>
				<ol>
					{#each items as item }
							<a href={item.link}>{item.text}</a>
						{:else}
							<p>No items available!</p>
							
					{/each}
				</ol>
			{:else}
				<p>No items available!</p>

		{/each}
	</ul>
</ol>

</div>
