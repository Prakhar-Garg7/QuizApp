import React, { useState } from "react";
import "./Button.css";

export const AddSectionButton = (props) => {
	const [isButtonHovered, setButtonHovered] = useState(false);
	const [isButtonActive, setButtonActive] = useState(false);
	return (
		<div>
			<button
				className="createQuizPageAddSectionButtonBody"
				onMouseEnter={() => setButtonHovered(true)}
				onMouseLeave={() => setButtonHovered(false)}
				onMouseUp={() =>
					setButtonActive(!isButtonActive)
				}
				onClick={props.createSectionAddSectionFunction}
                                        style={{ backgroundColor: isButtonHovered ? props.hoveredBackgroundColor : props.backgroundColor, border: isButtonHovered ? `2px solid ${props.backgroundColor}`: "none" }}
			>
				<i
					className={props.fa_icon_name}
					style={{
						color: isButtonHovered ? props.backgroundColor : `${props.color}`,
						paddingRight: "4px",
					}}
				></i>
				<span
					style={{
						color: isButtonHovered ? props.backgroundColor : `${props.color}`,
					}}
				>
					{props.text}
				</span>
			</button>
		</div>
	);
};

export const AddQuestionButton = (props) => {
	const [isButtonHovered, setButtonHovered] = useState(false);
	const [isButtonActive, setButtonActive] = useState(false);
	return (
		<div>
			<button
				className="createQuizPageAddQuestionButtonBody"
				onMouseEnter={() => setButtonHovered(true)}
				onMouseLeave={() => setButtonHovered(false)}
				onMouseUp={() =>
					setButtonActive(!isButtonActive)
				}
				onClick={props.createQuestionFunction}
                                        style={{ backgroundColor: isButtonHovered ? props.hoveredBackgroundColor : props.backgroundColor, border: isButtonHovered ? `2px solid ${props.backgroundColor}`: "none" }}
			>
				<i
					className={props.fa_icon_name}
					style={{
						color: isButtonHovered ? props.backgroundColor : `${props.color}`,
						paddingRight: "4px",
					}}
				></i>
				<span
					style={{
						color: isButtonHovered ? props.backgroundColor : `${props.color}`,
					}}
				>
					{props.text}
				</span>
			</button>
		</div>
	);
};

export const FinishCreatingQuizButton = (props) => {
	const [isButtonHovered, setButtonHovered] = useState(false);
	const [isButtonActive, setButtonActive] = useState(false);
	return (
		<div>
			<button
				className="createQuizPageFinishCreatingQuizButtonBody"
				onMouseEnter={() => setButtonHovered(true)}
				onMouseLeave={() => setButtonHovered(false)}
				onMouseUp={() =>
					setButtonActive(!isButtonActive)
				}
				onClick={props.createSectionFinishTestCreationFunction}
                                        style={{ backgroundColor: isButtonHovered ? props.hoveredBackgroundColor : props.backgroundColor, border: isButtonHovered ? `2px solid ${props.backgroundColor}`: "none" }}
			>
				<i
					className={props.fa_icon_name}
					style={{
						color: isButtonHovered ? props.backgroundColor : `${props.color}`,
						paddingRight: "4px",
					}}
				></i>
				<span
					style={{
						color: isButtonHovered ? props.backgroundColor : `${props.color}`,
					}}
				>
					{props.text}
				</span>
			</button>
		</div>
	);
};