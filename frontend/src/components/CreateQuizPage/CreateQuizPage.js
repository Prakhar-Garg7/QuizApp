import React, { useState } from "react";
import { AddSectionButton, FinishCreatingQuizButton } from "../Button/Button";
import "./CreateQuizPage.css";
import CreateQuizSection from "../CreateQuizSection/CreateQuizSection";

const CreateQuizPage = () => {
	const [sections, setSections] = useState([]);

	const createSection = () => {
		setSections([...sections, <CreateQuizSection key={sections.length} />]);
	};

	return (
		<div className="CreateQuizPageBody">
			<div id="CreateQuizSectionsContainer">
				{sections} 
			</div>
			<div style={{ maxWidth: "fit-content" }}>
				<AddSectionButton
					text="Add new section"
					fa_icon_name="fa-solid fa-plus"
					color="#F4EEFF"
					backgroundColor="#424874"
					hoveredBackgroundColor="#A6B1E1"
					createSectionAddSectionFunction={createSection}
				/>
			</div>
			{/* <div style={{ maxWidth: "fit-content" }}>
				<FinishCreatingQuizButton
					text="Finish quiz creation"
					fa_icon_name="fa-solid fa-right"
					color="#F4EEFF"
					backgroundColor="#424874"
					hoveredBackgroundColor="#A6B1E1"
					createSectionFinishTestCreationFunction={finishTestCreation}
				/>
			</div> */}
		</div>
	);
};

export default CreateQuizPage;
