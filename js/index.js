import { Quiz } from "./quiz.js";
import { Questions } from "./question.js";


const formQuiz=document.getElementById("quizOptions")
export const questionContiner=document.querySelector(".questions-container")
const categoryMenu=document.getElementById("categoryMenu")
const difficultyOptions=document.getElementById("difficultyOptions")
const questionsNumber=document.getElementById("questionsNumber")
const startQuizBtn=document.getElementById("startQuiz")
export let quiz
export let questions=


startQuizBtn.addEventListener("click", async function(){
    const category=categoryMenu.value
    const difficulty=difficultyOptions.value
    const numbers=questionsNumber.value
     quiz= new Quiz(category,difficulty,numbers)
     questions=await  quiz.getQusitions()
    //  console.log(questions[0].question);

     const question= new Questions(0)
     console.log(question);
     formQuiz.classList.replace("d-flex", "d-none")
     question.displayQuestion()
    

})
