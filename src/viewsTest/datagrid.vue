<template>
		<base-data-grid :data="data" :columns="columns" />
</template>

<script>
	export default{
		name: 'Datagrid',
		data(){
			return {
				columns: [
					{
						prop: 'a',
						label: 'a'
					},
					{
						prop: 'b',
						label: 'b'
					},
					{
						prop: 'c',
						label: 'c'
					}
				],
				data: [
					{a: 'a', b:'b', c:'c'},
					{a: 'a', b:'b', c:'c'},
					{a: 'a', b:'b', c:'c'},
				]
			}
		}
	}
</script>