This is a table.

Give table an array of objects in its `data` property and it will create a table.

```js
<Table :data="[{ id: 1, name: 'xyz' }, { id: 2, name: 'abc' }]">
</Table>
```

To give translated names to column headings, use `langKeyPrefix` property:

```js

window.lang.admin = {
	table: {
		users: {
			id: 'User id',
			name: 'Full name'
		},
		partners: {
			id: 'Partner id',
			name: 'Name of venue'
		}
	}
}

<div>

<Table style="width: 49%; float: left" langKeyPrefix="admin.table.users" :data="[
	{ id: 1, name: 'Joe Whatshisname' },
	{ id: 2, name: 'Alice Youknowwho' }
]" />

<Table style="width: 49%; float: right" langKeyPrefix="admin.table.partners" :data="[
	{ id: 1, name: 'Bob\'s Burgers' },
	{ id: 2, name: 'Kustaan Kaljaasi' }
]" />

</div>

```

A Table with no data renders the `emptyState` slot instead (if present; otherwise it renders an
empty element):

```js
<Table>
	<template #emptyState>
		<div style="text-align: center; font-style: italic">You have no data. Go add some!</div>
	</template>
</Table>

```

To control which columns are visible, use the `columns` property. `columns` is an array of columns
that have `id`, optional `className` (given to the `<td>` element), and an optional `component`,
which is rendered inside the cell and is given the cell data as its `data` property.

The `component` can be a Vue options object, a Vue component, or a string (if it's a globally
registered component).

In this example, 'summary' is rendered by `ItalicSummaryComponent`, 'nicely formatted date' is
rendered by `DateCell` and 'reversed summary' is rendered by `ReversedCell`.

This example also demonstrates another feature of `<Table>` - if the source rows have no `id`
property, it will be added, since Vue really likes have keys to keep track of elements when it is
rendering lists. (Otherwise bugs would appear; for example, custom components were not properly
rendered after sorting.)

You can register to @rowClicked custom event. This example shows how to register, but in this
example the event listener doesn't do anything.

```js

const Vue = require('vue').default

const DateCell = {
    props: {
        // String as a ISO date
        data: String
    },
    data: function() {
        return {
            date: new Date(this.data || new Date())
        }
    },
    computed: {
        formattedDate: function() {
            return this.date.toLocaleDateString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long',
                day: 'numeric', hour: 'numeric', minute: 'numeric'
            })
        }
    },
	template: `<span style="text-decoration: underline"
		:title="'Data was: ' + this.data">{{ this.formattedDate }}</span>`,
}

Vue.component('DateCell', DateCell)

const ReversedCell = {
    props: { data: String },
    computed: {
        content: function() {
            return this.data.split('').reverse().join('')
        }
    },
    template: `<span style="font-weight: bold">{{ content }}</span>`
}

const ItalicSummaryComponent = Vue.component('ItalicSummary', {
    props: ['data'],
    template: "<i>{{$props.data}}</i>"
})

<Table :data="[{
    'nicely formatted date': '2019-02-19T17:20:52.000Z',
    summary: '1 x Fermented eucalyptus oil',
    'reversed summary': '1 x Fermented eucalyptus oil',
    extra: 123
}, {
    'nicely formatted date': '2019-02-19T17:13:40.000Z',
    summary: '2 x Kotimaista mässyä',
    'reversed summary': '2 x Kotimaista mässyä',
    extra: 234
}, {
    'nicely formatted date': '2019-02-19T17:29:38.000Z',
    summary: '3 x Edible beef salad',
    'reversed summary': '3 x Edible beef salad',
    extra: 'grumpy tortoise'
}
]" :columns="[
    { id: 'summary', component: ItalicSummaryComponent },
    { id: 'reversed summary', component: ReversedCell },
    { id: 'nicely formatted date', component: 'DateCell' }
]" @rowClicked="'this is how you register to row click event'">
</Table>
```

Table always takes 100% width (unless explicitly told otherwise). A slightly larger example:

```js

window.lang.tableExample = {
	review: {
		tableColumnNames: {
			id: 'Id',
			orderId: 'Order id',
			rating: 'Rating',
			text: 'Details',
			reason: 'Reason',
			createdAt: 'Review created',
			updatedAt: 'Review last edited',
			summary: 'Order summary'
		}
	}
}

const Vue = require('vue').default
const RatingCell = Vue.component('RatingCell', {
	props: ['data'],
	computed: {
		icon: function() {
			switch (this.data) {
				case 'problem':
					return '😡'
				case 'bad':
					return '😟'
				case 'okay':
					return '🤷'
				case 'good':
					return '😊'
				default:
					return '?'
			}
		},
		style: function() {
			if (this.data === 'problem' || this.data === 'bad') {
				return { color: 'red' }
			} else if (this.data === 'good') {
				return { color: 'green' }
			} else {
				return {}
			}
		}
	},
	template: `<span class="RatingCell">{{ icon }} <span :style="style"> {{ data }}</span></span>`
})

const TimeAgo = Vue.component('TimeAgo', {
	props: ['data'],
	computed: {
		content: function() {
			let diff = new Date() - new Date(this.data)
			let hours = diff / (1000 * 3600) | 0
			if (hours > 24) {
				return ((hours / 24) | 0) + ' days ' + (hours % 24) + ' hours ago'
			} else {
				return hours + ' hours ago'
			}
		},
		readableData: function() {
			return this.data.replace('T', ' ').replace('Z', '')
		}
	},
	template: `<span class="TimeAgo" :title="readableData">{{ content }}</span>`
})
<Table :langKeyPrefix="'tableExample.review.tableColumnNames'"
:data="[
	{
		id: 15,
		orderId: 45,
		rating: 'problem',
		text:
			'Also, waiter made funny faces behind the closed door. I think this behavior is highly inappropriate and this is also an example of a slightly longer comment that a user might have.',
		reason: 'didNotGetProduct',
		createdAt: '2019-02-20T14:29:38.000Z',
		updatedAt: '2019-02-26T13:04:12.000Z',
		summary: '3 x Edible beef salad',
	},
	{
		id: 11,
		orderId: 46,
		rating: 'okay',
		text: 'Liha hieman sitkeää ja annos melko tylsä, mutta maku ok ja valtava annos!',
		reason: 'taste,service',
		createdAt: '2019-02-19T17:27:50.000Z',
		updatedAt: '2019-02-26T13:05:09.000Z',
		summary: '2 x Fermented eucalyptus oil',
	},
	{
		id: 5,
		orderId: 47,
		rating: 'bad',
		text: 'The bananas were tasty and order items did not exist at all',
		reason: null,
		createdAt: '2019-02-26T14:23:21.000Z',
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
]
" :columns="[
	{ id: 'createdAt', component: TimeAgo },
	{ id: 'summary' },
	{ id: 'rating', component: RatingCell },
	{ id: 'text', class: 'Table-Cell-italic' },
	{ id: 'reason' }
]">
</Table>
```
