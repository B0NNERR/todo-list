import Button from "../UI/Button";

import styles from "./Header.module.css";

const Header = (props) => {
	return (
		<header>
			<div className={styles.logo}>
				<span className={styles["logo-text"]}>TO-DO</span>list
			</div>
			<div>
				<Button
					className={`${styles["button"]} ${
						props.isDark && styles["active"]
					}`}
					type="button"
					name="dark-theme"
					onClick={props.onDarkThemeClick}
				>
					Тёмная
				</Button>
				<Button
					className={`${styles["button"]} ${
						!props.isDark && styles["active"]
					}`}
					type="button"
					name="light-theme"
					onClick={props.onLightThemeClick}
				>
					Светлая
				</Button>
			</div>
		</header>
	);
};

export default Header;
