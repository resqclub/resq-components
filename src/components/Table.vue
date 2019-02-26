<template>
	<table v-if="hasData">
		<thead>
			<tr>
				<th v-for="columnName in columnNames">{{ columnName }}</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="row in rows">
				<td v-for="column in columns">
					<template v-if="isColumnSpecial(column)">
						<component v-bind:is="getColumnComponentName(column)" :data="row[column]">
						</component>
					</template>
					<template v-else>
					{{ row[column] }}
					</template>
				</td>
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
	methods: {
		isColumnSpecial: function(columnId) {
			return !!this.cellComponents[columnId]
		},

		getColumnComponentName: function(columnId) {
			return this.cellComponents[columnId]
		}
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
		data: {
			type: Array,
			required: false,
			default: function() { return [] }
		},

		/**
		 * A mapping of column ids to component names.
		 *
		 * For example, the mapping `{ columnId: 'ComponentName' }` results in `columnId` columns to
		 * be rendered as `<ComponentName :data="columnData" />`.
		 */
		cellComponents: {
			type: Object,
			required: false,
			default: function() { return {} }
		}
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

