import { questions, quiz,questionContiner  } from "./index.js"
import { Quiz } from "./quiz.js";


export class Questions{
    constructor(index){
        
        this.question=questions[index].question;
        this.category=questions[index].category;
        this.correctAnswer=questions[index].correct_answer;
        this.inCorrectAnswer=questions[index].incorrect_answers;
        this.index=index
        this.allAnsewr=this.getChoices()
        this.answer=false

    }
    getChoices(){
        return  this.inCorrectAnswer.concat(this.correctAnswer).sort();
    }
    displayQuestion(){
        let questionsHtml=`
        <div
      class="question shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3 animate__animated animate__bounceIn"
    >
      <div class="w-100 d-flex justify-content-between">
        <span class="btn btn-category">${this.category}</span>
        <span class="fs-6 btn btn-questions">${this.index + 1} of ${questions.length} Questions</span>
      </div>
      <h2 class="text-capitalize h4 text-center">${this.question}</h2>  
      <ul class="choices w-100 list-unstyled m-0 d-flex flex-wrap text-center">
      ${this.allAnsewr.map((x) => `<li>${x}</li>`).join("")}
      </ul>
      <h2 class="text-capitalize text-center score-color h3 fw-bold"><i class="bi bi-emoji-laughing"></i> Score: ${quiz.score } </h2>        
    </div>
        `
        questionContiner.innerHTML=questionsHtml;
        const allList=document.querySelectorAll(".question ul li")
        for(let i=0;i<allList.length;i++)
        {
            allList[i].addEventListener("click", (e) =>{
              this.checkAnswer(e)
            })
        }
    }
    checkAnswer(e){
        if(!this.answer)
        {
            this.answer=true
            if(e.target.innerHTML.toLowerCase()==this.correctAnswer.toLowerCase())
        {
            e.target.classList.add("correct","animate__animated","animate__flipInY")
            quiz.score +=1
        }
        else
        {
            e.target.classList.add("wrong", "animate__animated", "animate__shakeX")
        }
       this.animateQustion(e.target,500)
    }
    }
    animateQustion(element,duration)
    {
        setTimeout(()=>{
            element.closest(".question").classList.add("animate__bounceOutLeft")
            setTimeout(()=>{
                this.nextQustions();
            },duration)
        },duration)
    }
    nextQustions(){
        this.index += 1;
        console.log(this.index);
        if(this.index > questions.length -1)
        {
            questionContiner.innerHTML+=quiz.endQuze();
            const tryAgin=document.querySelector(".again")
            tryAgin.addEventListener("click",function(){
                location.reload()
            })
            return;
        }
        else
        {
            const newQuest= new Questions(this.index);
            
            newQuest.displayQuestion();
        }
    }
}
