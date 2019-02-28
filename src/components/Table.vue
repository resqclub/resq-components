<template>
	<table v-if="hasData">
		<thead>
			<tr>
				<th v-for="columnId in columnIds" :key="columnId">
					<div @click="sortByColumn(columnId)">
						<template v-if="useLangForColumn(columnId)">
							<Lang :id="langKeyForColumn(columnId)"></Lang>
							<SortedAsc v-if="isSortedAsc(columnId)" />
							<SortedDesc v-if="isSortedDesc(columnId)" />
						</template>
						<template v-else>
							{{ columnId }}
							<SortedAsc v-if="isSortedAsc(columnId)" />
							<SortedDesc v-if="isSortedDesc(columnId)" />
						</template>
					</div>
				</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="row in sortedRows" :key="row.id">
				<td v-for="column in columnIds" :key="column">
					<template v-if="isColumnSpecial(column)">
						<component :is="getColumnComponentName(column)" :data="row[column]">
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
import Vue from 'vue'
import Lang from './Lang.vue'
import { findLangKey } from './Lang.vue'

// TODO
function getColumnName(columnId) {
	return `Column "${columnId}"`
}

function clone(object) {
	return JSON.parse(JSON.stringify(object))
}

Vue.component('SortedAsc', {
	render: h => h('span', '↑'),
})

Vue.component('SortedDesc', {
	render: h => h('span', '↓'),
})

export default {
	name: 'Table',

	props: {
		/**
		 * Give the master data (array of objects) to the Table with the `data` prop.
		 */
		data: {
			type: Array,
			required: false,
			default: function() {
				return []
			},
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
			default: function() {
				return {}
			},
		},

		/**
		 * Determines which columns are visible and in which order.
		 * If not specified, all columns are visible and the order is taken from the first
		 * `Object.keys(data[0])`.
		 */
		columns: {
			type: Array,
			required: false,
			default: null,
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
			default: '',
		},
	},

	data: function() {
		const sortColumn = null
		const sortOrder = 1

		return {
			sortColumn,
			sortOrder,
		}
	},

	computed: {
		hasData: function() {
			return this.rows.length
		},

		// Guess column ids from the first element.
		guessedColumnIds: function() {
			if (this.rows.length === 0) {
				return []
			}
			return Object.keys(this.rows[0])
		},

		columnIds: function() {
			if (this.columns) {
				return this.columns.map(column => column.id)
			} else {
				return this.guessedColumnIds
			}
		},

		// Rows in original order but optionally adorned with a 'id' property if original data did
		// not have it (this is a must unfortunately due to Vue works, if I understood correctly -
		// after sorting was introduced, stuff started to break without ids)
		rows: function() {
			const rows = this.data ? clone(this.data) : []
			if (rows.length) {
				if (rows[0].id === undefined) {
					rows.forEach((row, idx) => (row.id = idx))
				}
			}

			return rows
		},

		sortedRows: function() {
			if (!this.sortColumn) {
				return clone(this.rows)
			} else {
				let result = clone(this.rows)
				result.sort((row1, row2) => {
					const lhs = row1[this.sortColumn]
					const rhs = row2[this.sortColumn]
					if (lhs < rhs) {
						return -this.sortOrder
					} else if (lhs > rhs) {
						return this.sortOrder
					} else {
						return 0
					}
				})
				return result
			}
		},
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
		},

		sortByColumn: function(columnId) {
			if (this.sortColumn === columnId) {
				this.sortOrder *= -1
			} else {
				this.sortColumn = columnId
				this.sortOrder = 1
			}
		},

		isSortedAsc: function(columnId) {
			return this.sortColumn === columnId && this.sortOrder === 1
		},

		isSortedDesc: function(columnId) {
			return this.sortColumn === columnId && this.sortOrder === -1
		},
	},
}
</script>

<style lang='stylus' scoped>
@import '../fonts/brother-1816-mixins.styl'

table {
	border-collapse: collapse
	width: 100%

	th, td {
		// Makes padding part of height
		box-sizing: border-box
		padding: 10px 10px
	}

	th {
		background: transparent
		brother-regular()
		text-transform: uppercase
		// guess
		color: #888
		height: 50px
		font-size: 12px
	}

	td {
		brother-medium()
		background: white
		// guess
		color: #373737
		height: 60px
		font-size: 12px
	}

	$table-border-radius = 3px

	tr:not(:first-child) {
		border-top: 1px solid #ececec
	}

	tbody {
		box-shadow: 0px 1px 3px rgba(160, 160, 160, 0.4)
	}

	tbody {
		tr:first-child {
			td:first-child {
				border-top-left-radius: $table-border-radius
			}

			td:last-child {
				border-top-right-radius: $table-border-radius
			}
		}

		tr:last-child {
			td:first-child {
				border-bottom-left-radius: $table-border-radius
			}

			td:last-child {
				border-bottom-right-radius: $table-border-radius
			}
		}
	}

	th:first-child, td:first-child {
		padding-left: 25px
	}

	th:last-child, td:last-child {
		padding-right: 25px
	}
}
</style>

