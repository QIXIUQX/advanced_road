<template>
	<div class="question-template">
		<header class="header"></header>
		<section class="question-wrap">
			<div class="level-info">
				<div class="level">第二阶(第{{ questionOpts.currentQuestion + 1 }}题)</div>
				<div class="timer">{{ countdown.times }}S</div>
			</div>
			<div class="error-progress-wrap">
				<span>{{ `答错${examInfo.currenErrorCount}/${examInfo.totalErrorCount}` }} </span>
				<div class="progress">
					<div class="progress-inner" :style="{
						width:  getProgressInnerWidth + '%'
					}"></div>
				</div>
			</div>
			<!--	题目类型		-->
			<div class="question-content" v-for="(item,index) in questionList" :key="index"
				 v-show="questionOpts.currentQuestion === index">
				<!--		选择题-->
				<ChoiceQuestion :choiceQuestionDetail="item" v-if="item.QUESTION_TYPE <= 11"
								:isExamEnd="examInfo.isExamEnd"
								@answerChange="answerChange">
				</ChoiceQuestion>
				<!--		宫格+题目-->
				<PalacesTemplate :palaceDetail="item" @change="handlePalaceChange" :isExamEnd="examInfo.isExamEnd"
								 v-if="item.QUESTION_TYPE >= 20">
				</PalacesTemplate>
			</div>
			<!--	提交按钮-->
			<div class="button-wrap">
				<div class="button" @click="handleCheckBtnClick">下一题</div>
			</div>
		</section>
	</div>
</template>

<script>/** 组件/工具类/store 导入 */

import PalacesTemplate from "@/components/Client/QuestionTemplate/PalaesTemplate/PalacesTemplate.vue";
import ChoiceQuestion from "@/components/Client/QuestionTemplate/ChoiceQuestionTemplate/ChoiceQuestion.vue";
import {commonUtils, dateUtils} from "@/utils/commonUtils";


/** 网络请求导入 导入 */

export default {
	name: "",
	components: {
		PalacesTemplate, ChoiceQuestion
	},
	data() {
		return {
			questionList: [
				{
					"QUESTION_TIPS": "",
					"QUESTION_CONTENT": "",
					"QUESTION_TYPE": "10",
					"QUESTION_TOPIC": "下列诗句中，与《出塞》同为一个作者的是（）。",
					"QUESTION_ID": "93794286bd7c4b058f3063209e481299",
					"ANSWER": [
						{
							"ANSWER_ID": "2c77e241f3ca4e93abc62df1a83676d6",
							"ANSWER_CONTENT": "莫愁前路无知己，天下谁人不识君",
							"ANSWER_TYPE": "0"
						},
						{
							"ANSWER_ID": "656a650c15374681b878172a56e83cac",
							"ANSWER_CONTENT": "洛阳亲友如相问，一片冰心在玉壶",
							"ANSWER_TYPE": "1"
						},
						{
							"ANSWER_ID": "ab8a4a6a9e5a4c859a05039b2cc6ef66",
							"ANSWER_CONTENT": "莫笑农家腊酒浑，丰年留客足鸡豚",
							"ANSWER_TYPE": "0"
						}
					]
				},
				{
					"QUESTION_TIPS": "",
					"QUESTION_CONTENT": "",
					"QUESTION_TYPE": "10",
					"QUESTION_TOPIC": "被人们称为“杜甫生平第一快诗”的是（）。",
					"QUESTION_ID": "f184371813844cb0ba0cc294f6bb1fdf",
					"ANSWER": [
						{
							"ANSWER_ID": "03281d0ac3104eada14c7836aec59c10",
							"ANSWER_CONTENT": "《江南逢李龟年》",
							"ANSWER_TYPE": "0"
						},
						{
							"ANSWER_ID": "67134ca752ce46f9bb7687c7fd4d541b",
							"ANSWER_CONTENT": "《春夜喜雨》",
							"ANSWER_TYPE": "0"
						},
						{
							"ANSWER_ID": "7be9e68e854e41efbdb428759a419fa6",
							"ANSWER_CONTENT": "《江畔独步寻花》",
							"ANSWER_TYPE": "0"
						},
						{
							"ANSWER_ID": "b467d584b2194f20bc6e7963e55e9df1",
							"ANSWER_CONTENT": "《闻官军收河南河北》",
							"ANSWER_TYPE": "1"
						}
					]
				},
				{
					"QUESTION_TIPS": "",
					"QUESTION_CONTENT": "",
					"QUESTION_TYPE": "10",
					"QUESTION_TOPIC": "学习《寒食》一诗，“寒食”是我国的传统节日，时间是在（）前一两日。",
					"QUESTION_ID": "4bc85212717343bb85537b1cac55bdd2",
					"ANSWER": [
						{
							"ANSWER_ID": "2b57e08811624e22b1435aae71f0ea1c",
							"ANSWER_CONTENT": "中秋节",
							"ANSWER_TYPE": "0"
						},
						{
							"ANSWER_ID": "502b8b931bbf4f53af072d1fe39b12fd",
							"ANSWER_CONTENT": "元宵节",
							"ANSWER_TYPE": "0"
						},
						{
							"ANSWER_ID": "997788996b3641ba840ae6872ffc125c",
							"ANSWER_CONTENT": "除夕",
							"ANSWER_TYPE": "0"
						},
						{
							"ANSWER_ID": "b4b6caf3cd3e4d0fbf4900b74cd3e8e0",
							"ANSWER_CONTENT": "清明节",
							"ANSWER_TYPE": "1"
						}
					]
				},
				{
					"QUESTION_TIPS": "",
					"QUESTION_CONTENT": "",
					"QUESTION_TYPE": "10",
					"QUESTION_TOPIC": "“春眠不觉晓”的“晓”是指（）。",
					"QUESTION_ID": "8096dc2008d24b21b42459c4ddb10a84",
					"ANSWER": [
						{
							"ANSWER_ID": "408ea7f0eb6d416f9cea7087982b1072",
							"ANSWER_CONTENT": "天刚亮的时候",
							"ANSWER_TYPE": "1"
						},
						{
							"ANSWER_ID": "5fb260941f1c41d693883d5370f43db7",
							"ANSWER_CONTENT": "天黑的时候",
							"ANSWER_TYPE": "0"
						},
						{
							"ANSWER_ID": "f93f7610e4254fab80e97e592632e178",
							"ANSWER_CONTENT": "太阳落下的时候",
							"ANSWER_TYPE": "0"
						}
					]
				},
				{
					"QUESTION_TIPS": "",
					"QUESTION_CONTENT": "",
					"QUESTION_TYPE": "10",
					"QUESTION_TOPIC": "赵师秀《约客》一诗中，我们可以看出“黄梅时节”有什么特点？",
					"QUESTION_ID": "2295e069cf124cd094bec3a39b2398d9",
					"ANSWER": [
						{
							"ANSWER_ID": "5dcdd23a40cb41a78614b6208c55d109",
							"ANSWER_CONTENT": "干燥",
							"ANSWER_TYPE": "0"
						},
						{
							"ANSWER_ID": "797af40556d348f4b075a55450f87b50",
							"ANSWER_CONTENT": "下雪",
							"ANSWER_TYPE": "0"
						},
						{
							"ANSWER_ID": "bfc917b76f9c4dc4a14d520b00a14051",
							"ANSWER_CONTENT": "阴雨",
							"ANSWER_TYPE": "1"
						},
						{
							"ANSWER_ID": "fe1d6d7ee12b497fbf92e0e790f70d07",
							"ANSWER_CONTENT": "高温",
							"ANSWER_TYPE": "0"
						}
					]
				},
				{
					"QUESTION_TIPS": "",
					"QUESTION_CONTENT": "",
					"QUESTION_TYPE": "10",
					"QUESTION_TOPIC": "“休将白发唱黄鸡”的“休”是什么意思？",
					"QUESTION_ID": "2be73cae5e6b425890f78c7c74355cd1",
					"ANSWER": [
						{
							"ANSWER_ID": "6adabdcbef2f4f0ea04987beef0f29ab",
							"ANSWER_CONTENT": "轻松",
							"ANSWER_TYPE": "0"
						},
						{
							"ANSWER_ID": "ba2e0b99a5fc42969a239d1fcc48e291",
							"ANSWER_CONTENT": "不要",
							"ANSWER_TYPE": "1"
						},
						{
							"ANSWER_ID": "e92bda52fec64e12aef3613fa529d3ef",
							"ANSWER_CONTENT": "暂且",
							"ANSWER_TYPE": "0"
						},
						{
							"ANSWER_ID": "ecf8e6521ad94f0ab6d92f8790be4460",
							"ANSWER_CONTENT": "休息",
							"ANSWER_TYPE": "0"
						}
					]
				},
				{
					"QUESTION_TIPS": "",
					"QUESTION_CONTENT": "",
					"QUESTION_TYPE": "10",
					"QUESTION_TOPIC": "《望洞庭湖赠张丞相》一诗中理解有误的字词是（）。",
					"QUESTION_ID": "300bf8440623416faf65b89199fe88f5",
					"ANSWER": [
						{
							"ANSWER_ID": "12e0d88cf33340fd8902dac6e3bf287d",
							"ANSWER_CONTENT": "端居：恭敬地坐着",
							"ANSWER_TYPE": "1"
						},
						{
							"ANSWER_ID": "317a588cd7554e22a56e5871cd32760e",
							"ANSWER_CONTENT": "楫：船桨",
							"ANSWER_TYPE": "0"
						},
						{
							"ANSWER_ID": "7ccd706bd7fd4b6c974e4fa93be2ede4",
							"ANSWER_CONTENT": "圣明：指太平盛世",
							"ANSWER_TYPE": "0"
						},
						{
							"ANSWER_ID": "b5518206614c43fd859cc400b22dbf33",
							"ANSWER_CONTENT": "涵：包容",
							"ANSWER_TYPE": "0"
						}
					]
				},
				{
					"QUESTION_TIPS": "",
					"QUESTION_CONTENT": "",
					"QUESTION_TYPE": "10",
					"QUESTION_TOPIC": "以下哪个事物未在《绝句》中出现？",
					"QUESTION_ID": "1c9ea62eaac242a482489677782560d6",
					"ANSWER": [
						{
							"ANSWER_ID": "3fe9161871894903ad61bf15d974968d",
							"ANSWER_CONTENT": "黄鹤",
							"ANSWER_TYPE": "1"
						},
						{
							"ANSWER_ID": "4cc5d83ad9154b2abd0b8033f6c4cc68",
							"ANSWER_CONTENT": "船只",
							"ANSWER_TYPE": "0"
						},
						{
							"ANSWER_ID": "b0ebd33e321741dc86722dd8578c07b3",
							"ANSWER_CONTENT": "积雪",
							"ANSWER_TYPE": "0"
						},
						{
							"ANSWER_ID": "d8350f155efd4972bc6a23c3d0b720fb",
							"ANSWER_CONTENT": "白鹭",
							"ANSWER_TYPE": "0"
						}
					]
				},
				{
					"QUESTION_TIPS": "",
					"QUESTION_CONTENT": "",
					"QUESTION_TYPE": "10",
					"QUESTION_TOPIC": "下列诗词中，与《清平乐·村居》相同作者的是（）。",
					"QUESTION_ID": "305a8425a31d49b89a409c246b8020e3",
					"ANSWER": [
						{
							"ANSWER_ID": "44f9234a8be04514b28f74c3a7525696",
							"ANSWER_CONTENT": "醉里挑灯看剑，梦回吹角连营",
							"ANSWER_TYPE": "1"
						},
						{
							"ANSWER_ID": "5858c972012044098df11b6f8b67015e",
							"ANSWER_CONTENT": "明月几时有？把酒问青天",
							"ANSWER_TYPE": "0"
						},
						{
							"ANSWER_ID": "ec74de45609341999cf4ad932e5313b9",
							"ANSWER_CONTENT": "春风又绿江南岸，明月何时照我还",
							"ANSWER_TYPE": "0"
						},
						{
							"ANSWER_ID": "fb375a5a8ec0413982fca5dba882f71b",
							"ANSWER_CONTENT": "知否，知否，应是绿肥红瘦",
							"ANSWER_TYPE": "0"
						}
					]
				},
				{
					"QUESTION_TIPS": "",
					"QUESTION_CONTENT": "",
					"QUESTION_TYPE": "10",
					"QUESTION_TOPIC": "《闻官军收河南河北》一诗的颔联是（）。",
					"QUESTION_ID": "77f3b42d5a3c4638a58f10eb785a00aa",
					"ANSWER": [
						{
							"ANSWER_ID": "02b6e8e92954410aaef1c006e187caea",
							"ANSWER_CONTENT": "却看妻子愁何在，漫卷诗书喜欲狂。",
							"ANSWER_TYPE": "1"
						},
						{
							"ANSWER_ID": "065c04f420694831959b8e5725dda51e",
							"ANSWER_CONTENT": "剑外忽传收蓟北，初闻涕泪满衣裳。",
							"ANSWER_TYPE": "0"
						},
						{
							"ANSWER_ID": "4500646db3214a5cb71f45e8aa881017",
							"ANSWER_CONTENT": "即从巴峡穿巫峡，便下襄阳向洛阳。",
							"ANSWER_TYPE": "0"
						},
						{
							"ANSWER_ID": "f57a73e7e8ca47d8a186c213bbf62033",
							"ANSWER_CONTENT": "白日放歌须纵酒，青春作伴好还乡。",
							"ANSWER_TYPE": "0"
						}
					]
				},
				{
					"QUESTION_TIPS": "",
					"QUESTION_CONTENT": "",
					"QUESTION_TYPE": "10",
					"QUESTION_TOPIC": "《钱塘湖春行》中字词理解有误的是（）。",
					"QUESTION_ID": "32ba5afb75fb4c3d9012117738343e1e",
					"ANSWER": [
						{
							"ANSWER_ID": "40a2f0d1df3747e69a6e23513e8ee023",
							"ANSWER_CONTENT": "阴：树荫",
							"ANSWER_TYPE": "0"
						},
						{
							"ANSWER_ID": "4daa2960131744b78df78fdce55357c2",
							"ANSWER_CONTENT": "欲：将要",
							"ANSWER_TYPE": "0"
						},
						{
							"ANSWER_ID": "76d634b7c44d415c9a4eb2dede2fd2dc",
							"ANSWER_CONTENT": "云脚：脚步纷繁",
							"ANSWER_TYPE": "1"
						},
						{
							"ANSWER_ID": "76d7ce6ae2dc4dda87a4d752dae0e0a8",
							"ANSWER_CONTENT": "才能：刚够上",
							"ANSWER_TYPE": "0"
						}
					]
				},
				{
					"QUESTION_TIPS": "",
					"QUESTION_CONTENT": "",
					"QUESTION_TYPE": "10",
					"QUESTION_TOPIC": "“碧玉妆成一树高”采用了（）的修辞手法。",
					"QUESTION_ID": "06611b9aeb634e878920e35434fc869d",
					"ANSWER": [
						{
							"ANSWER_ID": "0812a559c13d4ee28da81b612b5d3a67",
							"ANSWER_CONTENT": "拟人",
							"ANSWER_TYPE": "1"
						},
						{
							"ANSWER_ID": "412066334ee64968b6b064efa1dca2a6",
							"ANSWER_CONTENT": "比喻",
							"ANSWER_TYPE": "0"
						},
						{
							"ANSWER_ID": "7a796c8f93974cb6abb0af536a57d397",
							"ANSWER_CONTENT": "对比",
							"ANSWER_TYPE": "0"
						},
						{
							"ANSWER_ID": "b824bd5e7dc24967bcf41b8a92fb154a",
							"ANSWER_CONTENT": "夸张",
							"ANSWER_TYPE": "0"
						}
					]
				},
				{
					"QUESTION_TIPS": "",
					"QUESTION_CONTENT": "",
					"QUESTION_TYPE": "10",
					"QUESTION_TOPIC": "《登岳阳楼》中的字词理解有误的是（）。",
					"QUESTION_ID": "a26f0eca175f4ce09c06c1e1462645b3",
					"ANSWER": [
						{
							"ANSWER_ID": "2fd8152224c64c4aa63a8c92f6203dbd",
							"ANSWER_CONTENT": "关山北：北方边境",
							"ANSWER_TYPE": "0"
						},
						{
							"ANSWER_ID": "50417ffbf08b49f7ad064bc16d141335",
							"ANSWER_CONTENT": "凭：根据",
							"ANSWER_TYPE": "1"
						},
						{
							"ANSWER_ID": "5b121db04d9b4de384b0afc5a89687f6",
							"ANSWER_CONTENT": "轩：窗户",
							"ANSWER_TYPE": "0"
						},
						{
							"ANSWER_ID": "a499bb8085db4988ad981c434c3a1c53",
							"ANSWER_CONTENT": "涕泗流：眼泪禁不住地流淌",
							"ANSWER_TYPE": "0"
						}
					]
				},
				{
					"QUESTION_TIPS": "请从十二宫选择文字组成正确答案。",
					"QUESTION_CONTENT": "故人西辞两个黄鹂鸣翠鹤楼",
					"QUESTION_TYPE": "31",
					"QUESTION_TOPIC": "诗词接龙：____________--楼阁玲珑五云起。",
					"QUESTION_ID": "38825478662143bcab1cee65b780e985",
					"ANSWER": [
						{
							"ANSWER_ID": "db56ff170d6d4e61ac0c46f46a39b3ef",
							"ANSWER_CONTENT": "故人西辞黄鹤楼",
							"ANSWER_TYPE": "1"
						}
					]
				},
				{
					"QUESTION_TIPS": "",
					"QUESTION_CONTENT": "",
					"QUESTION_TYPE": "10",
					"QUESTION_TOPIC": "被称为“诗鬼”的诗人是谁？",
					"QUESTION_ID": "24d29a4d327243f0909fbf7f4084250e",
					"ANSWER": [
						{
							"ANSWER_ID": "20136e2316e5420f9726eaf41eea87e9",
							"ANSWER_CONTENT": "李贺",
							"ANSWER_TYPE": "1"
						},
						{
							"ANSWER_ID": "8a0e7a1f57a748feb3489a8ba56c1a69",
							"ANSWER_CONTENT": "白居易",
							"ANSWER_TYPE": "0"
						},
						{
							"ANSWER_ID": "c4bba34030f648a9a8adfd0114115e99",
							"ANSWER_CONTENT": "杜甫",
							"ANSWER_TYPE": "0"
						},
						{
							"ANSWER_ID": "e34b8e24cb2846b3a66a2c5544240757",
							"ANSWER_CONTENT": "王维",
							"ANSWER_TYPE": "0"
						}
					]
				},
				{
					"QUESTION_TIPS": "请从十二宫选择文字组成正确答案。",
					"QUESTION_CONTENT": "白云生处有人谁家新燕啄春",
					"QUESTION_TYPE": "31",
					"QUESTION_TOPIC": "诗歌接龙：唯见江心秋月白--_____________。",
					"QUESTION_ID": "c2f2c37840844a45a2457e390530e586",
					"ANSWER": [
						{
							"ANSWER_ID": "0192cf71262b4fe9982413eb18043447",
							"ANSWER_CONTENT": "白云生处有人家",
							"ANSWER_TYPE": "1"
						}
					]
				},
				{
					"QUESTION_TIPS": "",
					"QUESTION_TYPE": "11",
					"QUESTION_TOPIC": "与图片最为匹配的诗句是（）。",
					"QUESTION_PICTURE": "https://www.fjwoke.com/efg/uploadFiles/SPECIAL_TOPIC_BOOK/4074319718d7456c882bc566970a232a.jpg",
					"QUESTION_ID": "b71cc5cd156b47a2bbf262629be08740",
					"ANSWER": [
						{
							"ANSWER_ID": "1700d85f547343b99ef35b8af5aaa7a2",
							"ANSWER_CONTENT": "开轩面场圃，把酒话桑麻",
							"ANSWER_TYPE": "0"
						},
						{
							"ANSWER_ID": "4fabeace63424984bd30fe6d14d0577d",
							"ANSWER_CONTENT": "有约不来过夜半，闲敲棋子落灯花",
							"ANSWER_TYPE": "1"
						},
						{
							"ANSWER_ID": "95ebb5229ef14403b7316e857456cfc6",
							"ANSWER_CONTENT": "何当共剪西窗烛，却话巴山夜雨时",
							"ANSWER_TYPE": "0"
						}
					]
				},
				{
					"QUESTION_TIPS": "",
					"QUESTION_CONTENT": "",
					"QUESTION_TYPE": "10",
					"QUESTION_TOPIC": "“春草明年绿，王孙归不归？”的“王孙”原指贵族子孙，诗中指的是作者送别的友人。",
					"QUESTION_ID": "bbe69aca1b0a48acb2296de1ae86beaa",
					"ANSWER": [
						{
							"ANSWER_ID": "1c93e37eda5c49b6bb2b439b2d490676",
							"ANSWER_CONTENT": "错误",
							"ANSWER_TYPE": "0"
						},
						{
							"ANSWER_ID": "ea7b38d784dc4a6da41dfb614ea2ba94",
							"ANSWER_CONTENT": "正确",
							"ANSWER_TYPE": "1"
						}
					]
				},
				{
					"QUESTION_TIPS": "",
					"QUESTION_CONTENT": "",
					"QUESTION_TYPE": "10",
					"QUESTION_TOPIC": "“万里长征人未还”的“还”应该读为huán，意为回来。",
					"QUESTION_ID": "01172f5a8c4d47f4bf2ebc556d537c62",
					"ANSWER": [
						{
							"ANSWER_ID": "275936c7094c48a3ab7b7b601612eb22",
							"ANSWER_CONTENT": "正确",
							"ANSWER_TYPE": "1"
						},
						{
							"ANSWER_ID": "e1a0bdd6932a48c28d4b3bbfcf47a250",
							"ANSWER_CONTENT": "错误",
							"ANSWER_TYPE": "0"
						}
					]
				},
				{
					"QUESTION_TIPS": "请从九宫选择文字组成正确答案。",
					"QUESTION_CONTENT": "春花秋月何眠不觉晓",
					"QUESTION_TYPE": "21",
					"QUESTION_TOPIC": "诗词接龙：___________--晓看红湿处。",
					"QUESTION_ID": "cd6ee9294faa4075bc0c36693e94cf3c",
					"ANSWER": [
						{
							"ANSWER_ID": "0ffe51f85d7d41119b03ac1809799c26",
							"ANSWER_CONTENT": "春眠不觉晓",
							"ANSWER_TYPE": "1"
						}
					]
				}
			],
			questionOpts: {
				currentQuestion: 0,
				userSelectList: [],
				answerObj: {
					TEST_HISTORY_ID: "",
					BEGIN_DATE: dateUtils.dateFormat(+new Date(), 'yyyy-MM-dd hh:mm:ss'),
					BOOK_ID: "d439cf0edf2b445481d0ecee1f036949",
				},
				tempUserSelect: {
					QUESTION_ID: "",
					END_DATE: "",
					ANSWER_CONTENT: "本题未答，判定错误",
					ANSWER_RESULT: "0",
				}
			},
			countdown: {
				timer: null,
				times: 60
			},
			examInfo: {
				totalErrorCount: 5,
				currenErrorCount: 0,
				isExamEnd: false
			}
		}
	},
	computed: {
		getProgressInnerWidth() {
			return 100 - ((this.examInfo.currenErrorCount / this.examInfo.totalErrorCount) * 100)
		}
	},
	methods: {
		/** 事件或其他相关方法 **/

		/**
		 * 宫格题答案提交
		 * @param answerObj
		 */
		handlePalaceChange(answerObj) {
			let currentQuestionItem = this.questionList[this.questionOpts.currentQuestion]

			this.questionOpts.tempUserSelect.ANSWER_CONTENT = answerObj.ANSWER_CONTENT // 用户选择的答案
			this.questionOpts.tempUserSelect.ANSWER_RESULT = this.checkAnswerCorrect(currentQuestionItem.ANSWER, answerObj, currentQuestionItem.QUESTION_TYPE) // 是否回答正确
			this.questionOpts.tempUserSelect.QUESTION_ID = currentQuestionItem.QUESTION_ID

		},
		/**
		 * 选择题答案提交
		 * @param answerObj
		 */
		answerChange(answerObj) {
			let currentQuestionItem = this.questionList[this.questionOpts.currentQuestion]

			this.questionOpts.tempUserSelect.ANSWER_CONTENT = answerObj.ANSWER_CONTENT // 用户选择的答案
			this.questionOpts.tempUserSelect.ANSWER_RESULT = answerObj.ANSWER_TYPE  // 是否回答正确
			this.questionOpts.tempUserSelect.QUESTION_ID = currentQuestionItem.QUESTION_ID
			this.questionOpts.tempUserSelect.ANSWERS = this.getUserAnswerSequence(currentQuestionItem.ANSWER)
		},

		/**
		 * 检测用户答案是否正确
		 * @param questionAnswerList
		 * @param userAnswer
		 * @param questionType
		 * @returns {string}
		 */
		checkAnswerCorrect(questionAnswerList, userAnswer, questionType) {
			let isCorrect = "0" // 0 错误  1正确
			questionAnswerList.forEach((item) => {
				if (item.ANSWER_TYPE === "1" && item.ANSWER_CONTENT === userAnswer.ANSWER_CONTENT) {
					isCorrect = "1"
				}
			})
			return isCorrect
		},

		/**
		 * 下一题按钮被点击
		 */
		handleCheckBtnClick() {
			if (this.examInfo.isExamEnd) {
				return
			}
			this.questionOpts.tempUserSelect.END_DATE = dateUtils.dateFormat(+new Date(), 'yyyy-MM-dd hh:mm:ss') // 结束时间
			this.questionOpts.userSelectList.push(Object.assign(this.questionOpts.tempUserSelect, this.questionOpts.answerObj))
			console.log(this.questionOpts.userSelectList)
			this.questionOpts.currentQuestion += 1
			if (this.questionOpts.tempUserSelect.ANSWER_RESULT === "0") {
				this.examInfo.currenErrorCount++
			}
			this.resetTempUserSelect()
		},

		/**
		 * 重置以用户选择答案
		 */
		resetTempUserSelect() {
			this.questionOpts.tempUserSelect = {
				QUESTION_ID: "",
				END_DATE: "",
				ANSWER_CONTENT: "本题未答，判定错误",
				ANSWER_RESULT: "0",
			}
		},
		initial() {
			this.questionList.forEach((item) => {
				item.ANSWER = commonUtils.messArray(item.ANSWER)
			})
		},
		countdownFn() {
			clearInterval(this.countdown.timer)
			this.countdown.timer = setInterval(() => {
				if (this.countdown.times === 0) {
					clearInterval(this.countdown.timer)
				} else {
					this.countdown.times--
				}
			}, 1000)
		},
		/**
		 * 获得以,作为分隔符的id字符串 id即为答案顺序,
		 * @param answerList 答案列表
		 * @returns {String}
		 */
		getUserAnswerSequence(answerList) {
			return answerList.map((item) => {
				return item.ANSWER_ID
			}, []).join(",")
		},


		/**
		 * 测试方法
		 */
		test() {
			let item = this.questionList[this.questionOpts.currentQuestion]
			if (item.QUESTION_TYPE <= 11) {
				item.ANSWER.forEach((answerItem) => {
					if (answerItem.ANSWER_TYPE === "1") {
						this.questionOpts.tempUserSelect.ANSWER_CONTENT = answerItem.ANSWER_CONTENT
						this.questionOpts.tempUserSelect.ANSWER_CONTENT = answerItem.ANSWER_CONTENT // 用户选择的答案
						this.questionOpts.tempUserSelect.ANSWER_RESULT = answerItem.ANSWER_TYPE  // 是否回答正确
						this.questionOpts.tempUserSelect.QUESTION_ID = item.QUESTION_ID
						this.questionOpts.tempUserSelect.ANSWERS = this.getUserAnswerSequence(item.ANSWER)
					}
				})
				this.handleCheckBtnClick()

			} else if (item.QUESTION_TYPE >= 20) {
				console.log("大于==11")
			}
			return `第${this.questionOpts.currentQuestion}题`
		}
		/** 网络请求相关方法 **/
	},
	created() {
		this.initial();
		this.countdownFn()

	},
	mounted() {
		window.test = this.test
	},
	watch: {
		'examInfo.currenErrorCount': {
			handler(newValue, oldValue) {
				if (newValue >= this.examInfo.totalErrorCount) {
					console.log("错误五题 答题结束")
					this.examInfo.isExamEnd = true
					clearInterval(this.countdown.timer)
				}
			},
		}
	}
}
</script>

<style lang="scss" scoped>
.question-template {
	display: flex;
	height: 100vh;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-image: url("../../../assets/images/advancedRoad/FlyFlwoerProcessing/img_bg.jpg");
	background-size: 100% 100%;

	.header {
		height: 144px;
		width: 100%;
		background: deepskyblue;
	}

	.question-wrap {
		flex: 1;
		width: 100%;
		padding: 0 30px;

		.level-info {
			margin-top: 50px;
			display: flex;
			justify-content: space-between;
			height: 84px;
			color: #333;
			font-size: 48px;

			.level, .timer {
				display: flex;
				justify-content: center;
				align-items: center;
				background-size: 100% 100%;
			}

			.level {
				width: 456px;
				background-image: url("../../../assets/images/advancedRoad/FlyFlwoerProcessing/img_arrow_right.png");
			}

			.timer {
				width: 240px;
				background-image: url("../../../assets/images/advancedRoad/FlyFlwoerProcessing/img_count_bg.png");
			}
		}

		.error-progress-wrap {
			display: flex;
			align-items: center;

			font-size: 48px;

			.progress {
				margin-left: 20px;
				flex: 1;
				display: flex;
				width: 100%;
				height: 40px;
				border: 4px solid #f95959;
				border-radius: 50px;
				padding: 6px 8px;

				.progress-inner {
					width: 100%;
					background-color: #f95959;
					border-radius: 50px;
					transition: width .2s ease;
				}
			}

		}

		.question-content {

		}

		.button-wrap {
			margin-top: 60px;
			display: flex;
			justify-content: center;
			align-items: center;

			.button {
				padding: 20px 80px;
				font-size: 48px;
				color: #eee;
				border-radius: 60px;
				background-color: #308CEA;
			}
		}

	}
}
</style>
