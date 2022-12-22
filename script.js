const movesEl = document.getElementById('moves');
const refreshBtn = document.getElementById('refresh-btn');
const scoreEl = document.getElementById('score');

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
]

const arr = [];
const clickArr = [];
let moves = 0;
let matchCount = 0;
let score = 0;
let test = 0;

function shuffleArray(array) { // Shuffle array function (Study This)
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffleArray(src); // Shuffle the array


const divs = document.querySelectorAll('div');

for(let i = 0; i < divs.length; i++) {

  divs[i].addEventListener('click',function(){ // Add event listener to every card
    moves++; // Moves count
    movesEl.textContent = `${moves} moves`

    divs[i].innerHTML = `
    <img class="card-img" src="${src[i]}" alt="">
  `

      const timeoutId = setTimeout(function() { // 1 seconds delay
      divs[i].innerHTML = `
      <figure>
      <img class="card" src="images/logo.png" alt="">
    </figure>
      `
    }, 1000);
    clickArr.push(divs[i])
    arr.push(src[i]);

    if(arr[arr.length-1] === arr[arr.length - 2]) {
      clickArr[clickArr.length - 2].innerHTML = `
      <img class="card-img" src="${arr[arr.length - 1]}" alt="">
    `
    clearTimeout(timeoutId);
    }
  })

}



const refresh = () => { // Refresh Function
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

