<template>
	<table v-if="hasData">
		<thead>
			<tr>
				<th v-for="columnId in columnIds">
					<template v-if="useLangForColumn(columnId)">
						<Lang :id="langKeyForColumn(columnId)"></Lang>
					</template>
					<template v-else>
						{{ columnId }}
					</template>
				</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="row in rows">
				<td v-for="column in columnIds">
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
		<!-- @slot The `emptyState` slot is rendered in the table's place whenever no other content
		exists. -->
		<slot name="emptyState"></slot>
	</div>
</template>

<script>
import Lang from './Lang.vue'
import { findLangKey } from './Lang.vue'

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

		columnIds: function() {
			if (this.rows.length === 0) {
				return []
			}
			return Object.keys(this.rows[0])
		}
	},
	methods: {
		isColumnSpecial: function(columnId) {
			return !!this.cellComponents[columnId]
		},

		getColumnComponentName: function(columnId) {
			return this.cellComponents[columnId]
		},

		// Should I render the column name using the `<Lang>` component?
		useLangForColumn: function(columnId) {
			if (!this.langKeyPrefix) {
				return false
			}
			return !!findLangKey(this.langKeyForColumn(columnId))
		},

		langKeyForColumn: function(columnId) {
			return this.langKeyPrefix + '.' + columnId
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
		},

		/**
		 * Language key prefix.
		 *
		 * If specified, use the `<Lang>` component to fetch column names from the global
		 * `window.lang` object. The name for column `columnId` is fetched from
		 * `window.lang.<langKeyPrefix>.<columnId>`.
		 */
		langKeyPrefix: {
			type: String,
			required: false,
			default: ''
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

