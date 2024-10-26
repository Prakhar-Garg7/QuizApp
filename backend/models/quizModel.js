const mongoose = require("mongoose");

const quizSchma = new mongoose.Schema({
          sections:[{
                    sectionName: {
                              type: String
                    },
                    questionsAnswers: [{
                              question: {
                                        type: String,
                              },
                              answer: {
                                        type: String
                              }
                    }]
          }]
});

module.exports = mongoose.model("quizModel", quizSchma);