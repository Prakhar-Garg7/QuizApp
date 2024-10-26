import React, { useState } from "react";
import "./CreateQuizSection.css";
import CreateQuizQuestion from "../CreateQuizQuestion/CreateQuizQuestion";
import { AddQuestionButton } from "../Button/Button";

const CreateQuizSection = () => {
	const [questions, setQuestions] = useState([]);

	const createQuestion = () => {
		setQuestions([
			...questions,
			<CreateQuizQuestion key={questions.length} />,
		]);
	};
	return (
		<div id="CreateQuizSectionBody">
			{questions}
			<div style={{ maxWidth: "fit-content" }}>
				<AddQuestionButton
					text="Add new question"
					fa_icon_name="fa-solid fa-plus"
					color="#F4EEFF"
					backgroundColor="#424874"
					hoveredBackgroundColor="#A6B1E1"
					createQuestionFunction={
						createQuestion
					}
				/>
			</div>
		</div>
	);
};

export default CreateQuizSection;
