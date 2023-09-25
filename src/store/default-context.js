import { createContext, useState, useEffect, useCallback } from "react";

import useHttp from "../hooks/use-http";

const appContext = createContext({
	list: [{}, {}, {}],
	isLoading: false,
	error: null,
	needOpenCase: false,
	updateDoneHandler: (id) => {
		return;
	},
	openCase: (id) => {
		return;
	},
	postNewCase: (obj) => {
		return;
	},
});

export const ContextProvider = (props) => {
	const [list, setList] = useState([{}, {}, {}]);
	const [isLoading, error, sendHttpRequest] = useHttp();
	const [needOpenCase, setNeedOpenCase] = useState({
		isShow: false,
		obj: null,
	});

	const getProduct = useCallback(() => {
		const requestData = {
			url: "https://todo-list-2f1da-default-rtdb.firebaseio.com/list-cases.json",
			options: {
				method: "GET",
			},
		};

		sendHttpRequest(requestData, (data) => {
			const resultArray = [];

			for (const key in data) {
				const tempObj = {
					...data[key],
					id: key,
					createdAt: new Date(data[key].createdAt),
				};
				resultArray.push(tempObj);
			}

			setList(resultArray);
		});
	}, [sendHttpRequest]);

	useEffect(() => {
		getProduct();
	}, [getProduct]);

	const openCase = (id) => {
		const currentCase = list.find((item) => item.id === id);
		setNeedOpenCase((prev) => {
			return {
				isShow: !prev.isShow,
				obj: !prev.isShow ? currentCase : null,
			};
		});
	};

	const updateDoneHandler = (id) => {
		const item = list.find((item) => item.id === id);
		item.isDone = !item.isDone;

		const obj = {
			[id]: {
				title: item.title,
				desc: item.desc,
				createdAt: item.createdAt,
				isDone: item.isDone,
				finishedAt: item.isDone ? new Date() : null,
			},
		};

		const requestData = {
			url: "https://todo-list-2f1da-default-rtdb.firebaseio.com/list-cases.json",
			options: {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(obj),
			},
		};

		sendHttpRequest(requestData);
	};

	const postNewCase = (obj) => {
		const requestData = {
			url: "https://todo-list-2f1da-default-rtdb.firebaseio.com/list-cases.json",
			options: {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(obj),
			},
		};

		sendHttpRequest(requestData, (data) => {
			getProduct();
		});
	};

	const ctx = {
		list,
		isLoading,
		error,
		updateDoneHandler,
		openCase,
		needOpenCase,
		postNewCase,
	};

	return (
		<appContext.Provider value={ctx}>{props.children}</appContext.Provider>
	);
};

export default appContext;
