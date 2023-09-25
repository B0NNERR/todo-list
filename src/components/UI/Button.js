import styles from "./Button.module.css";

const Button = (props) => {
	return (
		<button
			className={`${styles.button} ${props.className}`}
			type={props.type}
			name={props.name}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
};

export default Button;
