// Define an array of quiz questions

const Quizquestions = [
    {question: '25+25', correctAnswer: '50'},
    {question: '88+75', correctAnswer: '163'},
    {question: '266+951', correctAnswer: '1217'},
    {question: '4562+1263', correctAnswer: '5825'},
    {question: '156+265', correctAnswer: '421'},
    ]
    
    // Global Variables
    let currentQuestionIndex = 0;
    let userScore = 0;
    let userName = '';

    const choices = ['50', '163', '1217', '5825', '421'];


    // Functions

    // Shuffle function to randomize the order of Quizquestions array
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Function to start the quiz, get the name from the user, update UI, call shuffle and showQuestion functions
    function startQuiz() {
        userName = document.getElementById('name').value;
        document.getElementById('start-container').style.display = 'none';
        document.getElementById('quiz-container').style.display = 'flex';

        shuffle(Quizquestions);

        showQuestion();
    }

    // Function to display the question and choices on the screen and reset the choices
    function showQuestion() {
        const currentQuestion = Quizquestions[currentQuestionIndex];   
        document.getElementById('question').innerText = currentQuestion.question; //display the question

        const choicesContainer = document.getElementById('choices');    
        choicesContainer.innerHTML = ''; // Reset the answered choices to avoid their duplication 

        //to create button for each choice and call check answer function after user click on a certain choice button
        choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.innerText = choice;
            button.onclick = () => checkAnswer(choice, currentQuestion.correctAnswer);
            choicesContainer.appendChild(button);
        });
    }

    
// Function to check the user's answer, update the score, and display the correct or wrong sign:
function checkAnswer(userAnswer, correctAnswer) {
    const isCorrect = userAnswer === correctAnswer;

    if (isCorrect) {
        userScore++;  //if answer is correct, score increases by one
    }

    // Display correct or wrong sign in the sign bar
    const signContainer = document.getElementById('sign');
    signContainer.innerHTML = isCorrect ? '<i id="correct" class="fa-solid fa-check fa-beat fa-2xl" style="color: #05cc26;"></i>' : '<i id="wrong" class="fa-solid fa-xmark fa-beat fa-2xl" style="color: #e00606;"></i>';

    // Disable all buttons to prevent changing the answer
    const choicesContainer = document.getElementById('choices');
    const choiceButtons = Array.from(choicesContainer.children);
    choiceButtons.forEach(choiceButton => {
        choiceButton.disabled = true;
    });

    //If condition to know if we reached the last question or not, if it is the last one, the results displayed
    currentQuestionIndex++;
    if (currentQuestionIndex < Quizquestions.length) {
        setTimeout(() => {
            showQuestion();
            // Clear the sign bar for the next question
            signContainer.innerHTML = '';
        }, 1000); // Delay to show sign before moving to the next question
    } else {
        setTimeout(() => {
            showResult();
        }, 1000); // Delay before showing the result
    }
}


// to display the result 
function showResult() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'flex';
    document.getElementById('user-name').innerText = `Name: ${userName}`;
    document.getElementById('user-score').innerText = `Score: ${userScore} / ${Quizquestions.length}`;

    // Save username and score in local storage
    const userHistory = JSON.parse(localStorage.getItem('userHistory')) || [];
    userHistory.push({ name: userName, score: userScore });
    localStorage.setItem('userHistory', JSON.stringify(userHistory));
}

// Function to display user history
function showHistory() {
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('history-container').style.display = 'flex';

    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';

    // to display user history from local storage
    const userHistory = JSON.parse(localStorage.getItem('userHistory')) || [];

    userHistory.sort((a, b) => b.score - a.score);

    userHistory.forEach(player => {
        if (player.name && player.score !== undefined) {
            const listItem = document.createElement('li');
            listItem.innerText = `${player.name}: ${player.score} points`;
            historyList.appendChild(listItem);
        }
    });
}


//function to allow the user to play again and starting new quiz by updating the UI
function startNewQuiz() {
    currentQuestionIndex = 0;
    userScore = 0;
    shuffle(Quizquestions);
    const signContainer = document.getElementById('sign');
    signContainer.innerHTML ='<span id="correct"><i class="fa-solid fa-check fa-xxl" style="color: #05cc26;"></i></span> <span id="wrong"><i class="fa-solid fa-xmark  fa-xxl" style="color: #e00606;"></i></span>'
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('history-container').style.display = 'none';
    document.getElementById('start-container').style.display = 'flex';
    document.getElementById('quiz-container').style.display = 'none';
}