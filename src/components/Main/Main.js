import styles from "./Main.module.css";

import Board from "../Board/Board";
import Button from "../UI/Button";

const Main = (props) => {
	return (
		<main>
			<h2 className={styles["main-title"]}>Список дел</h2>
			<Button
				onClick={(e) => {
					props.onShowForm();
				}}
				type="button"
				name={"add-new-case"}
				className={styles["button-add-case"]}
			>
				Создать новое дело
			</Button>
			<Board />
		</main>
	);
};

export default Main;
