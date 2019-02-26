<template>
	<table v-if="hasData">
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
	<div v-else>
		<slot name="emptyState"></slot>
	</div>
</template>

<script>
// TODO
function getColumnName(columnId) {
	return `Column "${columnId}"`
}

function clone(object) {
	return JSON.parse(JSON.stringify(object))
}

export default {
	name: 'Table',
	computed: {
		hasData: function() {
			return this.rows.length
		},

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
		let rows

		if (this.data) {
			rows = clone(this.data)
		} else {
			rows = []
		}

		return {
			rows,
		}
	},
	props: {
		/**
		 * Give the master data (array of objects) to the Table with the `data` prop.
		 */
		data: Array,
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

