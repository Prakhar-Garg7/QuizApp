import React from "react";
import "./CreateFillUpQuestion.css"

const CreateFillUpQuestion = () => {
	return <div>
                    <div className="createFillUpQuestionQues">
                              <div contentEditable="true" style={{ marginBottom: "3px", padding: "5px", outline: "none", backgroundColor: "#433878", color: "white", fontSize: "30px" }}></div>
                              <div contentEditable="true" style={{ padding: "5px", outline: "none", backgroundColor: "#433878", color: "white", fontSize: "30px" }}></div>
                    </div>
          </div>;
};

export default CreateFillUpQuestion;
