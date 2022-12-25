const mainContainer = document.querySelector('main');
const startContainer = document.querySelector('span');
const finishContainer = document.querySelector('article');
const movesEl = document.getElementById('moves');
const refreshBtn = document.getElementById('refresh-btn');
const scoreEl = document.getElementById('score');
const startBtn = document.getElementById('start-btn');
const divs = document.getElementsByClassName('card-container'); // All divs
const song = document.getElementById('song');
const movesResult = document.getElementById('moves-result');
const volumeIconContainer = document.getElementById('volume-container');
const muteIconContainer = document.getElementById('mute-container');
const volumeIcon = document.getElementById('volume');
const muteIcon = document.getElementById('mute')

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

let arr = []; // Store clicked images
let clickArr = []; // Store clicked divs
let moves = 0;
let score = 0;
let clickCount = 0;


let volumeLoop = 1
muteIconContainer.addEventListener('click',()=>{ // Pause or Play the plin plin plon
  console.log("clicked");
  volumeLoop++
  if(volumeLoop%2 === 0){
    song.pause();
    muteIcon.style.visibility = 'hidden'
    volumeIcon.style.display = 'block'
  } else{
    song.play();
    muteIcon.style.visibility = 'inherit';
    volumeIcon.style.display = "none"
  }
})


for(let i = 0; i < divs.length; i++) { // Loop the cards(divs)

  divs[i].addEventListener('click', () =>{ // Add event listener to every card


   turnCardFront(divs[i],src[i]); // Turn the cards front side

    clickCount++

    if(clickCount%2 === 0) { // If player chooses 2 cards, moves + 1
      moves++; // Moves count
      movesEl.textContent = `${moves} moves`
    }
    

    clickArr.push(divs[i]) // Push the last clicked div(card) (So you can change their inner html)
    arr.push(src[i]); // Push the last clicked img
    

    if(arr.length === 2) { // If user picks 2 cards
      if(arr[arr.length -1] === arr[arr.length -2]){ // If cards are same
        arr = [] // Reset the array
        score ++
        scoreEl.textContent = `score: ${score}` // Reflect the score

      } else{ // If cards are not same
        setTimeout(function() { // 750 ms delay 
          arr = [] // Reset the array
          turnCardBack(clickArr[clickArr.length -1]); // Turn cards back side
          turnCardBack(clickArr[clickArr.length -2]); 
        }, 750);
      }
    } else if(arr.length > 2){ // If player try to pick more than two cards at the same time
      arr = []
      refresh();
      movesEl.textContent = 'PICK 2 CARDS MAX AT ONE MOVE'
    }

    if(score === 6){ // When player finishes game 
      startContainer.style.display = "none";
      mainContainer.style.display = "none";
      finishContainer.style.display = "flex";
      movesResult.textContent += `${moves} moves`
    } 
    
  })

}



const shuffleArray = (array) => { // Shuffle array function 
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffleArray(src); // Shuffle the src array


const startGame =() => { // Start game functipn
  song.play()
  song.volume = 0.2
  startContainer.style.display = 'none';
  mainContainer.style.display = 'flex'

}


const turnCardBack = (val) => { // Turn cards backside function
  val.innerHTML = `
  <figure>
  <img class="card" src="images/logo.png" alt="">
</figure>
  `
}


const turnCardFront = (val,arr) => { // Turn cards frontside function
  val.innerHTML = `
  <img class="card-img" src="${arr}" alt="">
`
}


const refresh = () => { // Refresh Function
  arr = []
  clickArr = []
  moves = 0;
  matchCount = 0;
  score = 0;
  clickCount === 0;
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

const playAgain = () => {// Play again function
  refresh();
  startContainer.style.display = 'flex';
  mainContainer.style.display = 'none';
  finishContainer.style.display = 'none';
}