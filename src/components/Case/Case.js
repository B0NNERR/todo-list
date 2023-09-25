import { useContext } from "react";
import styles from "./Case.module.css";
import appContext from "../../store/default-context";

const Case = (props) => {
	const ctx = useContext(appContext);

	const openThisCase = (e) => {
		ctx.openCase(props.id);
	};

	return (
		<div
			className={styles["item"]}
			onClick={openThisCase}
			draggable="true"
			onDragStart={(e) => {
				props.onDragStart(e, props.id);
			}}
		>
			<div className={styles.title}>{props.title}</div>
			<div className={styles.desc}>{props.desc}</div>
			<div className={styles["bottom-info"]}>
				<div className={styles["created-date"]}>{props.createdAt}</div>
				<div
					className={`${
						props.isDone ? styles.done : styles.unfulfilled
					} case-status`}
				>
					{props.isDone ? "Выполнено" : "Не выполнено"}
				</div>
			</div>
		</div>
	);
};

export default Case;
