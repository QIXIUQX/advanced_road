<template>
	<div class="advanced-road">
		<ul class="u-list" ref="UList">
			<li class="u-item" v-for="(item,index) in levelNameList" :key="item"
				@click="handleFlyFlowerItem(item,index)">
				<div
					:class="[`platform-item
						${getLockStatus(index) ? 'platform-item-dark':'platform-item-highlight'}
						${getDirection(index)}`
						]"
				>
					<div class="lock" v-show="getLockStatus(index)"></div>
					<div class="level-name">{{ `第${item}阶` }}</div>
					<div class="angel" v-show="getAngelStatus(index)"></div>
				</div>
			</li>

		</ul>
	</div>
</template>

<script>/** 组件/工具类/store 导入 */
import {fetchFlyFlowerId, fetchUserFlyFlowerLevel} from "@/network/FlyFlowerId";


/** 网络请求导入 导入 */

export default {
	name: "AdvancedRoad",
	data() {
		return {
			bookName: "飞花令",
			userLevel: 18,
			flyFlowerTotalLevel: 30,
			levelNameList: ['三十', '二十九', '二十八', '二十七', '二十六', '二十五', '二十四', '二十三', '二十二', '二十一', '二十', '十九', '十八', '十七', '十六', '十五', '十四', '十三', '十二', '十一', '十', '九', '八', '七', '六', '五', '四', '三', '二', '一']
		}
	},
	computed: {
		getDirection() {
			return (index) => {
				let direction

				if (index === 0) {
					return ""
				}
				if (index % 2 === 0) {
					if ((this.flyFlowerTotalLevel - index - 1) >= this.userLevel) {
						direction = 'to-right'
					} else {
						direction = 'to-right-highlight'

					}

				} else {
					if ((this.flyFlowerTotalLevel - index - 1) >= this.userLevel) {
						direction = 'to-left'
					} else {
						direction = 'to-left-highlight'

					}
				}
				return direction
			}
		},
		getLockStatus() {
			return (index) => {
				let status = true;


				// if(index){}
				if (this.levelNameList.length - 1 - index > this.userLevel) {
					status = true
				} else {
					status = false

				}

				return status
			}
		},
		getAngelStatus() {
			return (index) => {
				return this.flyFlowerTotalLevel - index === this.userLevel
			}
		}
	},
	methods: {
		/** 事件或其他相关方法 **/
		/**
		 * 设置用户所在的层数
		 */
		setUserPosition() {
			let scrollTop = (this.$refs.UList.querySelector(".u-item").offsetHeight * (this.levelNameList.length - this.userLevel - 2))
			this.$refs.UList.scrollTo(0, scrollTop)
		},

		handleFlyFlowerItem(item, index) {
			console.log(item, this.levelNameList.length - index)
			this.$router.push("/QuestionTemplate").catch(err => err)
		},


		/** 网络请求相关方法 **/

		fetchFlyFlowerById() {
			fetchFlyFlowerId(this.bookName).then((res) => {
				// console.log(res)
			}, err => {
				console.log(err)
			})
		},
		fetchUserFlyFlowerLevel() {
			fetchUserFlyFlowerLevel().then((res) => {
				console.log(res)
			}, err => {
				console.log(err)
			})
		}
	},
	mounted() {
		this.setUserPosition();
		// this.fetchUserFlyFlowerLevel();
	},
	created() {
		// this.fetchFlyFlowerById();
	},
	watch: {
		userLevel(newValue, oldValue) {
			this.setUserPosition();
		}
	},

}
</script>

<style lang="scss" scoped>
.advanced-road {
	padding: 50px 68px;
	width: 1080px;
	height: 1920px;
	background-image: url("../../assets/images/advancedRoad/LevelSelect/advanced_road_bg.png");
	background-size: 100% 100%;
	display: flex;

	.u-list {
		overflow-y: auto;
		height: 100%;
		width: 100%;
		scroll-behavior: smooth;
		scrollbar-width: none;
		-ms-overflow-style: none;

		&::-webkit-scrollbar {
			display: none;
		}

		.u-item {
			position: relative;
			display: flex;

			&:nth-child(even) {
				justify-content: flex-end;
			}

			&:nth-child(odd) {
				justify-content: flex-start;
			}

			.platform-item {
				position: relative;
				margin-top: 154px;
				width: 434px;
				height: 290px;
				background-size: 100% 100%;

				.lock {
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					width: 388px;
					height: 138px;
					background-image: url("../../assets/images/advancedRoad/LevelSelect/Lock.png");
					background-size: 100% 100%;
				}

				.level-name {
					display: flex;
					justify-content: center;
					align-items: center;
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					font-size: 38px;
					font-weight: 700;
					text-shadow: 3px 1px 0 rgba(201, 126, 76, 0.74);
					height: 74px;
					bottom: 0;
					color: #FEEDB0;
				}

				.angel {
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					z-index: 999;
					width: 289px;
					height: 287px;
					bottom: 200px;
					background-image: url("../../assets/images/advancedRoad/LevelSelect/angel.png");
					background-size: 100% 100%;
				}
			}

			.platform-item-highlight {
				background-image: url("../../assets/images/advancedRoad/LevelSelect/platform_highlight.png");
			}

			.platform-item-dark {
				background-image: url("../../assets/images/advancedRoad/LevelSelect/platform.png");
			}
		}

		.to-right:after {
			position: absolute;
			content: "";
			display: block;
			left: 236px;
			right: 54px;
			top: -270px;
			width: 351px;
			height: 269px;
			background-image: url("../../assets/images/advancedRoad/LevelSelect/platform_right.png");
			background-size: 100% 100%;
		}

		.to-right-highlight:after {
			position: absolute;
			content: "";
			display: block;
			left: 236px;
			right: 54px;
			top: -270px;
			width: 351px;
			height: 269px;
			background-image: url("../../assets/images/advancedRoad/LevelSelect/platform_right_highlight.png");
			background-size: 100% 100%;
		}

		.to-left:after {
			position: absolute;
			content: "";
			display: block;
			right: 270px;
			top: -270px;
			width: 351px;
			height: 269px;
			background-image: url("../../assets/images/advancedRoad/LevelSelect/platform_left.png");
			background-size: 100% 100%;
		}

		.to-left-highlight:after {
			position: absolute;
			content: "";
			display: block;
			right: 270px;
			top: -270px;
			width: 351px;
			height: 269px;
			background-image: url("../../assets/images/advancedRoad/LevelSelect/platform_left_highlight.png");
			background-size: 100% 100%;
		}
	}
}
</style>
