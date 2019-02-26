This is a table.

```js

<Table :data="[
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
]
">
</Table>
```

If a Table does not have the data property, or the data property is an empty array, it renders the
slot `emptyState` instead:

```js
<div style="text-align: center; font-style: italic">You have no data. Go add some!</div>
```

Often you might want to render a custom component inside a table cell. To accomplish this, you
can give the Table a `cellComponents` object, which is a mapping from column ids to component names.
The component gets its content via the `data` property. In this example, 'nicely formatted date'
is rendered by `DateCell` and 'reversed summary' is rendered by `ReversedCell`.

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
	template: `<span style="font-style: italic" :title="'Data was: ' + this.data">{{ this.formattedDate }}</span>`,
}

const ReversedCell = {
	props: { data: String },
	computed: {
		content: function() {
			return this.data.split('').reverse().join('')
		}
	},
	template: `<span style="font-weight: bold">{{ content }}</span>`
}

Vue.component('DateCell', DateCell)
Vue.component('ReversedCell', ReversedCell)

<Table :data="[{
	id: 4,
	'nicely formatted date': '2019-02-19T17:20:52.000Z',
	summary: '1 x Fermented eucalyptus oil',
	'reversed summary': '1 x Fermented eucalyptus oil',
}, {
	id: 1,
	'nicely formatted date': '2019-02-19T17:13:40.000Z',
	summary: '2 x Kotimaista mässyä',
	'reversed summary': '2 x Kotimaista mässyä',
}]" :cellComponents="{
	'nicely formatted date': 'DateCell',
	'reversed summary': 'ReversedCell'
}">
</Table>
```
