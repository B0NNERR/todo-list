import styles from "./Overlay.module.css";

const Overlay = (props) => {
	return (
		<div className={styles.overlay} onClick={props.onClick}>
			{props.children}
		</div>
	);
};

export default Overlay;
