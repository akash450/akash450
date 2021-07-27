/* list of questions on the quiz */
var questionList = [
  {
    question: "What is the meaning of 'Ulaanbaatar'?",
    answers: {
      a: 'Red Hero',
      b: 'Green Crusader',
      c: 'Yellow River'
    },
    correctAnswer: 'a'
  },

  {
    question: "What is the birthplace of Genghis Khaan?",
    answers: {
      a: 'Darkhan',
      b: 'Ogloobaatar',
      c: 'Deluun Boldog'
    },
    correctAnswer: 'c'
  },

  {
    question: "Was Temulun Genghis Khaan's:",
    answers: {
      a: 'Sister?',
      b: 'Daughter?',
      c: 'Mother?'
    },
    correctAnswer: 'a'
  },

  {
    question: "Why is Tsagaan Sar celebrated?",
    answers: {
      a: 'For partying and wine drinking',
      b: 'As a symbol of peace and harmony',
      c: 'As a way to honour the horses'
    },
    correctAnswer: 'b'
  },
];

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submit = document.getElementById('submit');
generateQuiz(questionList, quizContainer, resultsContainer, submit);

/* ------------------generate a quiz form ------------------------ */
function generateQuiz(questions, quizContainer, resultsContainer, submit) {
  /* -------------- display the questions --------------------------- */
  function displayQ(questions, quizContainer) {
    // storing output and answers
    var output = [],
    answers;

    // for each question...
    for (var i = 0; i < questions.length; i++){
      
      // empty list of answers (on restart)
      answers = [];

      // for each available answer to this question...
      for (letter in questions[i].answers){

        // push answers as HTML radio buttons
        answers.push(
          '<label>'
            + '<input type="radio" name="question'+i+'" value="'+letter+'">'
            + questions[i].answers[letter]
          + '</label>'
        );
      }

      // push question and answers as output
      output.push(
        '<div class="question">' + questions[i].question + '</div>'
        + '<div class="answers">' + answers.join('') + '</div>'
      );
    }

    // combine output list into one string of html and put it on the page
    quizContainer.innerHTML = output.join('');
  }
  
  /* -----------------------show correct (or incorrect) results---------------- */
  function displayAnswers(questions, quizContainer, resultsContainer){
    // gather answer containers from our quiz
    var answerContainers = quizContainer.querySelectorAll('.answers'),
    // keep track of user's answers
    userAnswer = '',
    numCorrect = 0;
    
    // for each question...
    for (var i = 0; i < questions.length; i++){

      // find selected answer
      userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
      
      
      // if answer is correct
      if(userAnswer === questions[i].correctAnswer){
        // add to the number of correct answers
        numCorrect++;
      }
    }

    // show number of correct answers out of total
    resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length; 
    var promo = 'SAVE';
    if (numCorrect == questions.length) {
      //lightgreen background --> 4 out of 4! Your promo code is: SAVE
      document.getElementById("quiz-container").style.backgroundColor = 'lightgreen';
      quizContainer.style.display = 'none';
      submit.style.display = 'none';
      resultsContainer.innerHTML += '! Your promo code is: ' + promo;
    } else {
      //n out of 4 (n <= 3). You are not eligible for discount!
      document.getElementById("quiz-container").style.backgroundColor = 'red';
      quizContainer.style.display = 'none';
      submit.style.display = 'none';
      document.getElementById("booking-link").style.display = 'none';
      resultsContainer.innerHTML += '. You are not eligible for discount!';
    }
  }

  // show the questions
  displayQ(questions, quizContainer);

  // when user clicks submit, show results
  submit.onclick = function() {
    displayAnswers(questions, quizContainer, resultsContainer);
  }
}