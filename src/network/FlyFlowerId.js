import {requestServer} from "./request";

/**
 * 获取书籍
 * @param bookName
 * @returns {*}
 */
export function fetchFlyFlowerId(bookName) {
	return requestServer({
		url: "/getFlyFlowerId",
		method: "POST",
		data: {
			bookname:bookName
		},
	});
}

/**
 * 获取 用户的飞花令等级
 */
export function fetchUserFlyFlowerLevel() {
	return requestServer({
		url: "/getUserFlyFlowerLevel",
		method: "POST",
		data: {},
	});
}
