export const CardData =  async() => { 
	return 	{
		rows:[
			{
			id: 1,
			label: 'meow?'
		},
		{
			id: 2,
			label: 'woof!'
		},
	],
		columns: [
			{
				id: 1,
				row:1,
				label: '📫 Todo'
			},
			{
				id: 2,
				row:1,
				label: '✅ Done'
			},
			{
				id: 1,
				row:2,
				label: '📫 Todo1'
			},
			{
				id: 2,
				row:2,
				label: '✅ Done1'
			}
		],
		cards: [
			{
				row: 1,
				column: 1,
				id: 'a',
				title: 'Wash Dishes'
			},
			{
				row: 1,
				column: 2,
				id: 'b',
				title: 'Code DND Example'
			},
			{
				row: 1,
				column: 1,
				id: 'a',
				title: 'do something'
			},
			{
				row: 1,
				column: 2,
				id: 'b',
				title: 'Code DND Example'
			}
		]
	}
};
