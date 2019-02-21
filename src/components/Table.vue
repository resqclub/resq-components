<template>
	<table>
		<thead>
			<tr>
				<th>User id</th>
				<th>Name</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>2</td>
				<td>Marko</td>
			</tr>
			<tr>
				<td>17</td>
				<td>Antti</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	name: 'Table',
}
</script>

<style lang='stylus' scoped>
table {
	border-collapse: collapse

	th, td {
		border: 1px solid #ccc
	}

	th {
		background: #eee
        font-weight: 600
	}
}
</style>

