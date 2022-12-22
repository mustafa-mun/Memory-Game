const mainContainer = document.querySelector('main');
const startContainer = document.querySelector('span');
const movesEl = document.getElementById('moves');
const refreshBtn = document.getElementById('refresh-btn');
const scoreEl = document.getElementById('score');
const startBtn = document.getElementById('start-btn');
const timeEl = document.getElementById('time');

const src = [ // Images src array
  "images/pic1.png",
  "images/pic2.png",
  "images/pic3.png",
  "images/pic4.png",
  "images/pic5.png",
  "images/pic6.png",
  "images/pic1.png",
  "images/pic2.png",
  "images/pic3.png",
  "images/pic4.png",
  "images/pic5.png",
  "images/pic6.png"
];

let arr = [];
let clickArr = [];
let moves = 0;
let score = 0;
let clickCount = 0;

function shuffleArray(array) { // Shuffle array function (Study This)
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffleArray(src); // Shuffle the array


const startGame =() => {
  
  startContainer.style.display = 'none';
  mainContainer.style.display = 'flex'

}


const divs = document.querySelectorAll('div');

for(let i = 0; i < divs.length; i++) { // Loop the cards



  divs[i].addEventListener('click',function(){ // Add event listener to every card
    clickCount++

    if(clickCount === 1) {
      // Set up a variable to keep track of the elapsed time
        let elapsedTime = 0;

        // Function to update the timer display
        function updateTimer() {
          // Increment the elapsed time
          elapsedTime++;

          // Format the timer display
          let display = pad(elapsedTime % 60);
          display = pad(Math.floor(elapsedTime / 60)) + ":" + display;

          // Update the timer display element
          timeEl.innerHTML = `Time: ${display}`;
          if(score === 6) {
            clearInterval(timer)
          }
        }

        // Start the timer
        let timer = setInterval(updateTimer, 1000);

        // Function to pad a number with leading zeros
        function pad(num) {
          return (num < 10 ? "0" : "") + num;
        }

    }


    if(clickCount%2 === 0) { // If player chooses 2 cards, moves + 1
      moves++; // Moves count
      movesEl.textContent = `${moves} moves`
    }
    

    divs[i].innerHTML = // Display cards at the divs
    `
    <img class="card-img" src="${src[i]}" alt="">
  `

    clickArr.push(divs[i])
    arr.push(src[i]);
    
    if(arr.length === 2) { // If user picks 2 cards
      if(arr[arr.length -1] === arr[arr.length -2]){ // If cards are same
        arr = [] // Reset the array
        score ++
        scoreEl.textContent = `score: ${score}`
      } else{
        let timeoutId = setTimeout(function() { // 1 second delay 
          arr = [] // Reset the array
          clickArr[clickArr.length - 1].innerHTML = `
          <figure>
          <img class="card" src="images/logo.png" alt="">
        </figure>
          ` // Turn cards 
          clickArr[clickArr.length - 2].innerHTML = `
          <figure>
          <img class="card" src="images/logo.png" alt="">
        </figure>
          `// Turn cards 
        }, 1000);
      }
    } else if(arr.length > 2){ // If player try to pick more than two cards at the same time
      arr = []
      refresh()
      movesEl.textContent = 'PICK 2 CARDS MAX AT ONE MOVE'
    }
    
  })

}





const refresh = () => { // Refresh Function
  arr = []
  clickArr = []
  moves = 0;
  matchCount = 0;
  score = 0;
  movesEl.textContent = `${moves} moves`;
  scoreEl.textContent = 'Score: '
  for(let i = 0; i < divs.length; i++) {
    divs[i].innerHTML = `
      <figure>
      <img class="card" src="images/logo.png" alt="">
    </figure>
      `
  }
  shuffleArray(src);
  console.clear()
}

