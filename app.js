// game values

let min = 1,
    max = 10,
    winningNum = getRandomNum(min,max),
    guessLeft = 3;

// UI elements 

const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max 

minNum.textContent = min;
maxNum.textContent = max;


// play again event listener

game.addEventListener('mousedown', function(e){
  if(e.target.className === 'paly-again'){
    window.location.reload();
  }
})



// Listen for guess 

guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);

  // validate 

  if(isNaN(guess) ||guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // check if won 
  if (guess === winningNum) {
    // game over - won 

    gameOver(true, `${winningNum} is correct! YOU WIN!`);
    
  } else {
    //wrong number 
    guessLeft -= 1;

    if (guessLeft === 0) {
      //game over - lost 
      gameOver(false, `Game over, you lost . The correct number was ${winningNum}`);
    }else{
      //border color
      guessInput.style.borderColor = 'red';
      // clear input 
      guessInput.value = '';
      // game continues - answer wrong 
      setMessage(`${guess} is not correct, ${guessLeft} guesses left`,'red');
    }
  }
})

// game over

function gameOver(won, msg) {
  let color;

  won === true ? color = 'green' : color = 'red';
  

  // disable input 
  guessInput.disabled = true;
  // change border color 
  guessInput.style.borderColor = color;
  // set text color
  message.style.color = color;
  // set message 
  setMessage(msg);

  //play againg 

  guessBtn.value = 'Play Again';
  guessBtn.className += 'paly-again';
}

// get winning number 

function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}
//set message

function setMessage(msg, color){
  message.textContent = msg;
  message.style.color = color;
}