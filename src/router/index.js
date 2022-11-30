import Vue from "vue";
import VueRouter from "vue-router";
import {edit} from "./edit";

import QuestionTemplate from "@/components/Client/QuestionTemplate/QuestionTemplate.vue";
import AdvancedRoad from "@/views/AdvancedRoad/AdvancedRoad.vue";


Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		redirect: "/AdvancedRoad"
	},
	{
		path: "/AdvancedRoad",
		component: AdvancedRoad
	},
	{
		path: "/QuestionTemplate",
		component: QuestionTemplate
	},
];


const router = new VueRouter({
	// mode: "history",
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	let matched = to.matched;
	matched.forEach((item) => {
		if (item.path === to.fullPath) {
			document.title = item.meta.title;
		}
	});
	next();
});

export default router;
