import styles from "./LoadingBoard.module.css";

const LoadingBoard = () => {
	return (
		<div className={styles["loader"]}>
			<div className={styles.spinner}></div>
		</div>
	);
};

export default LoadingBoard;
