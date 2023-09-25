import { useContext } from "react";
import styles from "./CaseWindow.module.css";
import appContext from "../../store/default-context";

const CaseWindow = () => {
	const ctx = useContext(appContext);
	const currentCase = ctx.needOpenCase.obj;
	return (
		<div className={styles["case"]}>
			<h3 className={styles["case-title"]}>{currentCase.title}</h3>
			<div className={styles["case-desc"]}>{currentCase.desc}</div>
			<div className={styles["case-footer"]}>
				<div className={styles["case-createdAt"]}>
					{currentCase.createdAt.toLocaleString("ru-RU")}
				</div>
				<div
					className={`${styles["case-status"]} ${
						currentCase.isDone ? styles.green : styles.red
					}`}
				>
					{currentCase.isDone ? "Выполнено" : "Не выполнено"}
				</div>
			</div>
		</div>
	);
};

export default CaseWindow;
