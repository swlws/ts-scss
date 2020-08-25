<template>
	<div v-if="visible" class="sidebar-box">
		<article>
			<header>
				<span>{{title}}</span>
				<span @click="closeEvent">X</span>
			</header>
			<section>
				<slot />
			</section>
			<footer v-if="hasFooter">
				<slot name="footer" />
			</footer>
		</article>
	</div>
</template>

<script>
export default{
	name: 'BaseSidebar',
	props: {
		title: {
			type: String,
			default: ''
		},
		width: {
			type: [String, Number],
			default: ''
		},
		visible: {
			type: Boolean,
			default: false,
		}
	},
	methods: {
		closeEvent(){
			this.$emit('update:visible', false);
			this.$destory(true);
			this.$el.parentNode.removeChild(this.$el)
		}
	},
	computed: {
		barStyle(){
			let width = this.width;
			width = typeof width === 'number' ? width + 'px' : width;
			return {
				width: width || '400px'
			}
		},
		hasFooter(){
			return !!this.$slots.footer;
		}
	}
}
</script>

<style lang="scss" scoped>
.sidebar-box{
	position: fixed;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,0.3);

	> article{
		width: 400px;
		height: 100%;
		float: right;
		display: flex;
		flex-direction: column;
		background-color: #fff;

		>header{
			color: #333;
			font-size: 14px;
			font-weight: bold;
			height: 40px;
			padding: 0px 16px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #ccc;
		}

		> section{
			padding: 0px 16px;
			flex: 1;
			overflow: auto;
		}
		>footer{
			padding: 0px 16px;
			border-top: 1px solid #ccc;
			height: 50px;
		}
	}
}
</style>