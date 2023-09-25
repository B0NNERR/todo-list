import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";

import Header from "./components/Header/Header";
import useTheme from "./hooks/use-theme";
import Wrapper from "./components/Wrapper/Wrapper";
import LoadingBoard from "./components/Board/LoadingBoard/LoadingBoard";
import Main from "./components/Main/Main";
import appContext from "./store/default-context";
import Overlay from "./components/UI/Overlay";
import CaseWindow from "./components/Case/CaseWindow";
import Modal from "./components/UI/Modal";
import NewCase from "./components/Case/NewCase/NewCase";

function App() {
	const ctx = useContext(appContext);
	const [theme, setTheme] = useTheme();
	const [showForm, setShowForm] = useState(false);

	const handleLightThemeClick = (e) => {
		e.preventDefault();

		setTheme("light");
	};

	const handleDarkThemeClick = (e) => {
		e.preventDefault();

		setTheme("dark");
	};

	const toggleFormHandler = () => {
		setShowForm((prev) => !prev);
	};

	const closeFormHandler = () => {
		setShowForm(false);
	};

	return (
		<Wrapper>
			<Header
				onDarkThemeClick={handleDarkThemeClick}
				onLightThemeClick={handleLightThemeClick}
				isDark={theme === "dark" ? true : false}
			/>
			{ctx.isLoading && <LoadingBoard></LoadingBoard>}
			{!ctx.isLoading && <Main onShowForm={toggleFormHandler} />}
			{ctx.needOpenCase.isShow && (
				<React.Fragment>
					{ReactDOM.createPortal(
						<Overlay onClick={ctx.openCase} />,
						document.querySelector("#overlay")
					)}
					{ReactDOM.createPortal(
						<Modal onClick={ctx.openCase}>
							<CaseWindow></CaseWindow>
						</Modal>,
						document.querySelector("#modal")
					)}
				</React.Fragment>
			)}
			{showForm && !ctx.isLoading && (
				<React.Fragment>
					{ReactDOM.createPortal(
						<Overlay />,
						document.querySelector("#overlay")
					)}
					{ReactDOM.createPortal(
						<Modal onClick={toggleFormHandler}>
							<NewCase onCloseForm={closeFormHandler} />
						</Modal>,
						document.querySelector("#modal")
					)}
				</React.Fragment>
			)}
		</Wrapper>
	);
}

export default App;
