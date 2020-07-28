<template>
	<div class="child-wrap-box">
		<article v-for="(item, index) in menu" :key="index">
			<aside> {{ item.label }} </aside>
			<section>
				<nav v-for="nav in item.child" :key="nav.label">
					{{ nav.label }}
				</nav>
			</section>
		</article>
	</div>
</template>

<script>
export default{
	name: 'headerMenuChild',
	props: {
		menu: {
			type: Array,
			default: () => []
		}
	},
	methods: {

	}
}
</script>

<style lang="scss" scoped>
.child-wrap-box{
	box-shadow: 0px 0px 10px 1px #ccc;
	width: 500px;
	article{
		padding: 10px;
		font-size: 14px;
		display: flex;
		aside{
			width: 200px;
			font-weight: bold;
			color: #666666;
		}
		section{
			color: #999999;
			flex: 1;
			display: flex;
			flex-direction: wrap;
		}
		&:hover{
			background-color: #ccc;
		}
	}
}
</style>