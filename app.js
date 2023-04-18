const inputContainer = document.getElementById('inputNum');
const submitBtn = document.querySelector('.submit-btn');
const messageContainer = document.querySelector('.message-container');
const previousGuessContainer = document.querySelector('.previous-guess');
const message = document.querySelector('.msg');
const proximityText = document.querySelector('.proximity');
const startNewBtn = document.querySelector('.start-new-btn');
const randNumContainer = document.querySelector('.random-number-container');
const randNum = document.querySelector('.random-number');
let previousGuesses = [];

const randomNum = Math.ceil(Math.random() * 48) + 1;    // random numbers will be generated between 1 and 50(i.e. excluding 1 and 50)...
let count = 0;

const handleSubmit = () => {
    let inputNumber = inputContainer.value;
    if(inputNumber === "") inputNumber = 0;
    inputNumber = parseInt(inputNumber);    // parsing the string datatype from the input field to the number data type...
    
    messageContainer.style.display = 'block';
    count ++;
    // console.log(inputNumber);
    // console.log(randomNum);
    checkGuess(inputNumber);
    previousGuesses.push(inputNumber);
    previousGuessContainer.textContent = previousGuesses.join(", ");
}

submitBtn.addEventListener('click', handleSubmit);

function checkGuess(number) {
    if(number === randomNum) {
        gameOver();

        message.textContent = "Wohoo! You've guessed it!";  // here textContent of message is OVERWRITTEN.. to win...
        message.classList.remove('bg-danger');
        message.classList.add('bg-success');
    }
    else {
        message.textContent = "Wrong guess try again";
        message.classList.add('bg-danger');
        if(count === 5) {
            gameOver();
        }
    }
    checkProximity(number);
}

function gameOver() {
    submitBtn.removeEventListener('click', handleSubmit);
    submitBtn.style.opacity = 0.75;
    submitBtn.style.cursor = 'not-allowed';
    message.textContent = "Game Over buddy!";
    startNewBtn.style.display = 'block';
    randNumContainer.style.display = 'block';
    randNum.textContent = randomNum;
}

function checkProximity(num) {
    if((randomNum - 5) < num && num <= (randomNum + 5)) proximityText.textContent = "Previous Guess was too near!"; // numbers from ((randomNumber - 5) + 1) to (randomNumber + 5) is considered to be in the proximity...
    else {
        proximityText.textContent = "Previous Guess was too far!";
    }
}

startNewBtn.addEventListener('click', () => {
    window.location.reload();   // reloads the window when the 'start new' button is clicked...
})
