import { useState, useCallback } from "react";

const useHttp = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const sendHttpRequest = useCallback(
		async (
			request = null,
			manageData = (data) => {
				return;
			}
		) => {
			try {
				if (!request) return;
				setIsLoading(true);
				setError(null);

				const response = await fetch(
					request.url,
					request.options ? request.options : {}
				);

				if (!response.ok) {
					throw new Error("Ошибка запроса...");
				}

				const data = await response.json();

				manageData(data);
			} catch (e) {
				setError(e.message || "Что-то пошло не так...");
			}

			if (request.options && request.options?.method !== "GET") {
				setIsLoading(false);
			} else {
				setTimeout(() => {
					setIsLoading(false);
				}, 1000);
			}
		},
		[]
	);

	return [isLoading, error, sendHttpRequest];
};

export default useHttp;
