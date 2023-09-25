import { useContext, useState } from "react";
import Button from "../../UI/Button";
import styles from "./NewCase.module.css";
import appContext from "../../../store/default-context";

const NewCase = (props) => {
	const [inputTitle, setInputTitle] = useState("");
	const [inputDescription, setInputDescription] = useState("");

	const ctx = useContext(appContext);

	const changeInputTitle = (e) => {
		setInputTitle(e.target.value);
	};

	const changeInputDescription = (e) => {
		setInputDescription(e.target.value);
	};

	const submitHandler = (e) => {
		e.preventDefault();

		if (
			inputTitle.trim().length === 0 ||
			inputDescription.trim().length === 0
		)
			return;

		ctx.postNewCase({
			title: inputTitle,
			desc: inputDescription,
			createdAt: new Date(),
			isDone: false,
		});

		setInputDescription("");
		setInputTitle("");
		props.onCloseForm();
	};

	return (
		<form className={styles.form} onSubmit={submitHandler}>
			<div>
				<label htmlFor="title">Заголовок</label>
				<input
					name="title"
					id="title"
					className={styles.input}
					placeholder="Какой-то заголовок..."
					onChange={changeInputTitle}
					value={inputTitle}
					required
				></input>
			</div>
			<div>
				<label htmlFor="desc">Описание</label>
				<textarea
					name="desc"
					id="desc"
					className={styles.input}
					placeholder="Какое-то описание..."
					onChange={changeInputDescription}
					value={inputDescription}
					required
				></textarea>
			</div>
			<div>
				<Button type="submit" name="new-case" className={styles.button}>
					Создать
				</Button>
			</div>
		</form>
	);
};

export default NewCase;
