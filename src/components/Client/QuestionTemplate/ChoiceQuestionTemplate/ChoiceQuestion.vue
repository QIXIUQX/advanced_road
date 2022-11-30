<template>
	<div class="choice-question">
		<div class="choice-question-pic">
			<img :src="choiceQuestionDetail.QUESTION_PICTURE">
		</div>
		<div class="question-tips">{{ choiceQuestionDetail.QUESTION_TIPS }}</div>
		<div class="topic" v-html="choiceQuestionDetail.QUESTION_TOPIC || ''"></div>
		<div class="answer-wrap">
			<div :class="['answer-item',{'active-answer-item':index === activeAnswerItemIndex}]"
				 v-for="(item,index) in choiceQuestionDetail.ANSWER"
				 @click="handleAnswerItemClick(item,index)"
			>
				{{ `${answerIndexMap[index]}： ${item.ANSWER_CONTENT}` }}
			</div>
		</div>
		<slot></slot>
	</div>
</template>

<script>
/** 组件/工具类/store 导入 */

/** 网络请求导入 导入 */

export default {
	name: "",
	props: {
		choiceQuestionDetail: {
			type: Object,
			default: {}
		},
		isExamEnd: {
			type: Boolean,
			default: false
		},
	},
	data() {
		return {
			answerIndexMap: [
				"A",
				"B",
				"C",
				"D",
				"E",
				"F",
				"G",
				"H",
			],
			activeAnswerItemIndex: -1
		}
	},
	methods: {
		/** 事件或其他相关方法 **/
		handleAnswerItemClick(item, index) {
			if (this.isExamEnd) {
				return
			}
			this.activeAnswerItemIndex = index
			this.$emit("answerChange", item);
		}
		/** 网络请求相关方法 **/
	},
}
</script>

<style lang="scss" scoped>
.choice-question {
	position: relative;
	font-size: 48px;
	max-height: 1300px;
	overflow-y: auto;

	.choice-question-pic {
		margin-top: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.question-tips {
		margin-top: 30px;
	}

	.topic {
		margin-top: 30px;
	}

	.answer-wrap {
		margin-top: 30px;

		.answer-item {
			margin: 20px 0;
			padding: 20px 30px;
			border: 4px solid #000;
			border-radius: 60px;
			text-indent: 2em;
		}
	}

	.active-answer-item {
		color: #fff;
		background-color: #308cea;
	}
}
</style>
