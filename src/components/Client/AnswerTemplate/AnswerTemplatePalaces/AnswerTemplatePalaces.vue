<template>
	<div class="answer-template-palaces">
		<div v-for="(item,index) in answerDetailItem" :key="index"></div>
	</div>
</template>

<script>
/** 组件/工具类/store 导入 */

/** 网络请求导入 导入 */

export default {
	name: "",
	props: {
		answerDetailItem: {
			type: Object,
			default: {}
		},
	},
	computed: {
		answerFormat() {
			return this.data
		}
	},
	data() {
		return {
			answerOpts: {
				userSelect: {},
				answerDetail: this.answerDetailItem.ANSWER_CONTENT.split("")
			}
		}
	},
	methods: {
		/** 事件或其他相关方法 **/
		name() {

		}
		/** 网络请求相关方法 **/
	},
}
</script>

<style lang="scss" scoped>
.answer-template-palaces {
	font-size: 48px;
}
</style>
