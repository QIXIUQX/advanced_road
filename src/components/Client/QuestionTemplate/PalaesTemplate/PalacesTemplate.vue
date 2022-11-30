<template>
	<div class="palaces-wrap">
		<div class="question-tips">{{ palaceDetail.QUESTION_TIPS }}</div>
		<div :class="[`palaces-content ${getPalaceType(palaceDetail.QUESTION_TYPE)}`]">
			<div :class="[ `palace-box-item ${getActiveClassStatus(item,index)}`]" v-for="(item,index) in keywords"
				 :key="index"
				 @click="handlePalaceItemClick(item,index)">
				{{ item }}
			</div>
		</div>
		<div class="topic" v-html="palaceDetail.QUESTION_TOPIC || ''"></div>
		<div class="answer-list">
			<div v-for="(item,index) in selectedKeywords" :key="index"
				 @click="handleAnswerItemClick(item)" class="palace-box-item">
				{{ item.text || "" }}
			</div>
		</div>
		<slot></slot>
	</div>
</template>
<script>
/** 组件/工具类/store 导入 */

import {commonUtils} from "@/utils/commonUtils";

/** 网络请求导入 导入 */

export default {
	name: "",
	props: {
		palaceDetail: {
			type: Object,
			default: {}
		},
		isExamEnd: {
			type: Boolean,
			default: false
		},
	},
	computed: {
		getPalaceType() {
			return (typeCode) => {
				let addClassName = ''
				switch (typeCode) {
					case '20':
					case '21':
						addClassName = 'nine'
						break;
					case '30':
					case '31':
						addClassName = 'twelve'
						break;
					default:
						addClassName = 'nine'
						break;
				}
				return addClassName
			}
		},
		/**
		 * 获取活跃的宫格
		 * @returns {function(*, *): string}
		 */
		getActiveClassStatus() {
			return (item, index) => {
				let addClassName = ''
				this.selectedKeywords.forEach(selectItem => {
					if (selectItem.index === index) {
						addClassName = 'active-keywords'
					}
				})
				return addClassName
			}
		}
	},
	data() {
		return {
			keywords: commonUtils.messArray(this.palaceDetail.QUESTION_CONTENT.split("")),
			selectedKeywords: [],
		}
	},

	methods: {
		/** 事件或其他相关方法 **/
		/**
		 * 点击宫格题的每一个字时候,如果已经存在则删除这个字,如果不存在则添加这个字
		 * @param selectedText 选择的文字信息
		 * @param idx  当前文字的编号
		 */
		handlePalaceItemClick(selectedText, idx) {
			if (this.isExamEnd) {
				return;
			}
			let currentIndex = -1
			/**  检测是否存在选中的字 */
			this.selectedKeywords.forEach((item, index) => {
				if (item.index === idx) {
					this.selectedKeywords.splice(index, 1)
					this.selectedKeywords.push({index: null, text: null})
					currentIndex = index
				}
			})
			// 防止删除后被重新添加
			if (currentIndex !== -1) {
				this.$emit("change", {
					ANSWER_CONTENT: this.generateAnswerStr(this.selectedKeywords),
					ANSWER_TYPE: this.palaceDetail.ANSWER[0].ANSWER_TYPE,
					ANSWER_ID: this.palaceDetail.ANSWER[0].ANSWER_ID
				});
				return
			}
			this.selectedKeywords.some((item) => {
				if (item.index === null) {
					item.index = idx
					item.text = selectedText
					return true
				}
			})
			this.$emit("change", {
				ANSWER_CONTENT: this.generateAnswerStr(this.selectedKeywords),
				ANSWER_TYPE: this.palaceDetail.ANSWER[0].ANSWER_TYPE,
				ANSWER_ID: this.palaceDetail.ANSWER[0].ANSWER_ID
			});
		},
		handleAnswerItemClick(editItem) {
			if (this.isExamEnd) {
				return;
			}
			this.selectedKeywords.some((item) => {
				if (item.index === editItem.index) {
					item.index = null
					item.text = null
					return true
				}
			})
			this.$emit("change", {
				ANSWER_CONTENT: this.generateAnswerStr(this.selectedKeywords),
				ANSWER_TYPE: this.palaceDetail.ANSWER[0].ANSWER_TYPE,
				ANSWER_ID: this.palaceDetail.ANSWER[0].ANSWER_ID
			});
		},
		/**
		 * 生成共宫格题答案字符串
		 * @returns {string}
		 */
		generateAnswerStr(selectList) {
			let answerStr = ''
			selectList.forEach((item) => {
				answerStr += item.text
			})
			return answerStr.replace(/null/g, '')
		}
		/** 网络请求相关方法 **/
	},
	created() {
		window.data = this.$data
		for (let i = 0; i < this.palaceDetail.ANSWER[0].ANSWER_CONTENT.length; i++) {
			this.selectedKeywords.push({
				index: null,
				text: null
			})
		}
	},
}
</script>

<style lang="scss" scoped>
.palaces-wrap {
	position: relative;
	font-size: 48px;
	display: flex;
	flex-direction: column;
	justify-content: center;

	.palace-box-item {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 120px;
		height: 120px;
		border-radius: 10px;
		font-size: 80px;
		font-weight: bold;
		color: #333;
		border: 6px solid #000;
	}

	.question-tips {
		margin-top: 80px;
	}

	.palaces-content {
		margin-top: 50px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 54px;
		align-self: center;
	}

	.topic {
		margin-top: 50px;
	}

	.active-keywords {
		background-color: #5ea4eb;
		color: #fff;
	}

	.answer-list {
		margin-top: 50px;

		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: 24px;

		.palace-box-item {
			font-size: 60px;

			color: #5ea4eb;
		}
	}

	.nine {
		width: 468px;
	}

	.twelve {
		width: 642px
	}

}
</style>
