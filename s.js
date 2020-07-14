
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}


function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};




function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// create questions here
var questions = [
    new Question("You're 3rd place right now in a race. What place are you in when you pass the person in 2nd place?", ["1st", "2nd","3rd", "4th"], "2nd"),
    new Question("A farmer has 17 sheep, all of them but 8 die. How many sheep are still standing? ", ["8", "9", "25", "35"], "8"),
    new Question("How many months have 28 days?", ["1", "4","8", "12"], "12"),
    new Question("There are 45 apples in your basket. You take three apples out of the basket. How many apples are left?", ["3", "42", "45", "idontknow"], "45"),
    new Question("The answer is really big. ", ["THE ANSWER", "REALLY BIG", "AN ELEPHANT", "DATA INSUFFICIENT"], "AN ELEPHANT")
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();
