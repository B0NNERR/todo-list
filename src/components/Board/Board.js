import { useContext, useState } from "react";
import styles from "./Board.module.css";
import stylesCase from "../Case/Case.module.css";

import appContext from "../../store/default-context";
import Case from "../Case/Case";

const Board = (props) => {
	const ctx = useContext(appContext);
	const list = ctx.list;
	const [caseDrop, setCaseDrop] = useState(null);
	const [boardDrop, setBoardDrop] = useState(null);
	const [startDrag, setStartDrag] = useState({
		isStart: false,
		isRight: null,
	});

	const filteredArrayOfComplitedTasks = list
		.filter((item) => item.isDone)
		?.sort((a, b) => {
			if (a.createdAt > b.createdAt) return -1;
			if (a.createdAt < b.createdAt) return 1;
			return 0;
		});
	const filteredArrayOfUnfinishedTasks = list
		.filter((item) => !item.isDone)
		?.sort((a, b) => {
			if (a.createdAt > b.createdAt) return 1;
			if (a.createdAt < b.createdAt) return -1;
			return 0;
		});

	const dragStartHandler = (e, idCase) => {
		const item = list.find((item) => item.id === idCase);
		setStartDrag({
			isStart: true,
			isRight: item.isDone,
		});
		const target = e.target;
		target.classList.add(stylesCase.opacity);
		const parent = target.parentElement;
		setBoardDrop(parent);
		setCaseDrop(() => {
			return idCase;
		});
	};

	const dragEndHandler = (e) => {
		e.target.classList.remove(stylesCase.opacity);
	};

	const dragOverHandler = (e) => {
		e.preventDefault();
	};

	const dragDrop = (e) => {
		e.preventDefault();
		const endBoard = e.target.closest(`.${styles["board-item"]}`).classList
			.value;
		const startBoard = boardDrop?.classList.value;
		if (!startBoard) return;
		setStartDrag({
			isStart: false,
			isLeft: null,
		});

		if (endBoard === startBoard) return;

		ctx.updateDoneHandler(caseDrop);
	};

	const fakeCase = (
		<div className={`${stylesCase.item} ${stylesCase.opacity}`}>
			<div
				className={`${stylesCase.title} ${stylesCase["full-opacity"]}`}
			>
				Заголовок
			</div>
			<div className={`${stylesCase.desc} ${stylesCase["full-opacity"]}`}>
				Описание
			</div>
			<div className={stylesCase["bottom-info"]}>
				<div className={stylesCase["created-date"]}>123</div>
				<div>123</div>
			</div>
		</div>
	);

	return (
		<div className={styles["board-wrapper"]}>
			<div className={styles["board"]}>
				<div
					className={`${styles["board-item"]} left`}
					onDragEnd={dragEndHandler}
					onDragOver={dragOverHandler}
					onDrop={dragDrop}
				>
					<h3>Предстоит сделать</h3>

					{startDrag.isRight && startDrag.isStart && fakeCase}

					{filteredArrayOfUnfinishedTasks.map((item) => {
						return (
							<Case
								key={item.id}
								id={item.id}
								title={item.title}
								desc={item.desc}
								createdAt={item.createdAt.toLocaleString(
									"ru-RU"
								)}
								isDone={item.isDone}
								onDragStart={dragStartHandler}
							/>
						);
					})}
				</div>
				<div
					className={`${styles["board-item"]} right`}
					onDragEnd={dragEndHandler}
					onDragOver={dragOverHandler}
					onDrop={dragDrop}
				>
					<h3>Уже сделано</h3>

					{!startDrag.isRight && startDrag.isStart && fakeCase}

					{filteredArrayOfComplitedTasks.map((item) => {
						return (
							<Case
								key={item.id}
								id={item.id}
								title={item.title}
								desc={item.desc}
								createdAt={item.createdAt.toLocaleString(
									"ru-RU"
								)}
								isDone={item.isDone}
								onDragStart={dragStartHandler}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Board;
