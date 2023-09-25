import styles from "./Modal.module.css";
import Button from "./Button";

const Modal = (props) => {
	return (
		<div className={styles.modal}>
			{props.children}
			<div className={styles["close-wrapper"]}>
				<Button
					type="button"
					name="close-modal"
					className={styles.close}
					onClick={props.onClick}
				>
					<span>&#10008;</span>
				</Button>
			</div>
		</div>
	);
};

export default Modal;
