<template>
	<table>
		<thead>
			<tr>
				<th v-for="columnName in columnNames">{{ columnName }}</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="row in rows">
				<td v-for="column in columns">{{ row[column] }}</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
// TODO
function getColumnName(columnId) {
	return `Column "${columnId}"`
}

export default {
	name: 'Table',
	computed: {
		columns: function() {
			if (this.rows.length === 0) {
				return []
			}
			return Object.keys(this.rows[0])
		},

		columnNames: function() {
			return this.columns.map(getColumnName)
		},
	},
	data: function() {
		return {
			rows: [
				{
					id: 15,
					orderId: 45,
					rating: 'problem',
					text:
						'Also, waiter made funny faces behind the closed door. I think this behavior is highly inappropriate and this is also an example of a slightly longer comment that a user might have.',
					reason: 'didNotGetProduct',
					createdAt: '2019-02-19T17:29:38.000Z',
					updatedAt: '2019-02-26T13:04:12.000Z',
					summary: '3 x Edible beef salad',
				},
				{
					id: 11,
					orderId: 46,
					rating: 'okay',
					text:
						'Liha hieman sitkeää ja annos melko tylsä, mutta maku ok ja valtava annos!',
					reason: 'taste,service',
					createdAt: '2019-02-19T17:27:50.000Z',
					updatedAt: '2019-02-26T13:05:09.000Z',
					summary: '2 x Fermented eucalyptus oil',
				},
				{
					id: 5,
					orderId: 47,
					rating: 'bad',
					text: 'The babies were tasty and order items did not exist at all',
					reason: null,
					createdAt: '2019-02-19T17:23:21.000Z',
					updatedAt: '2019-02-26T13:04:27.000Z',
					summary: '2 x Grass-fed vodka appetizer',
				},
				{
					id: 4,
					orderId: 48,
					rating: 'bad',
					text: 'moi',
					reason: null,
					createdAt: '2019-02-19T17:20:52.000Z',
					updatedAt: '2019-02-19T17:20:52.000Z',
					summary: '1 x Fermented eucalyptus oil',
				},
				{
					id: 1,
					orderId: 49,
					rating: 'good',
					text: '',
					reason: null,
					createdAt: '2019-02-19T17:13:40.000Z',
					updatedAt: '2019-02-26T13:04:29.000Z',
					summary: '2 x Kotimaista mässyä',
				},
			],
		}
	},
	props: {
		// data: Array,
	},
}
</script>

<style lang='stylus' scoped>
table {
	border-collapse: collapse
	width: 100%

	th, td {
		border: 1px solid #ccc
	}

	th {
		background: #eee
		font-weight: 600
	}
}
</style>

