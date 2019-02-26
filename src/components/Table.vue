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
			rows: [{ id: 2, name: 'Marko' }, { id: 17, name: 'Antti' }],
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

