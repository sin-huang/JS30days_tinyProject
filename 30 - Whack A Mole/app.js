// 將所有會用到元素物件都選取起來 地洞、記分板、地鼠
const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const startButton = document.querySelector(".startButton");
let currentScore = 0;
//設定一個開關 當開關
// 開:
//     代表目前有地鼠在畫面上 所以不會呼叫下一隻地鼠 並將開關的狀態重置回關
// 關:
//     代表目前沒有地鼠在畫面上 所以會呼叫下一隻地鼠
let switchOn = false;
//打到地鼠的事件 我們要做兩件事
// 打到地鼠時->在每隻mole上加上事件監聽器
//     1、加分
//     2、地鼠下降
let lastHole;

startButton.addEventListener('click',startGame);

moles.forEach((mole)=>{
    mole.addEventListener('click',score);
});

function startGame(){
    currentScore = 0;
    scoreBoard.innerHTML = currentScore;
    // 出現第一隻地鼠
    popUp();
    setTimeout(function(){
        switchOn = true;
    },10000)
}

function score(event){
    if(!event.isTrusted) return;
    currentScore++;
    scoreBoard.innerHTML = currentScore;
    this.parentNode.classList.remove('up');
}

// 隨機位置與持續時間
// 寫一個函式 他會回傳有上下限的隨機時間
function randomTime(min, max) {
  let time = Math.floor(Math.random() * (max - min) + min);
  return time;
}
// 再來要隨機取得洞的位置 透過querySelectorAll('.hole')方法
// 可取得一個包含所有叫做`class="hole"`元素的Nodelist類物件
// 我們可以透過Nodelist[index]來取得我們想要取得的物件
// 另外 為了不要前後選到相同元素 我們每輪會用lastHole變數去存現在是哪個洞
// 下次隨機生成洞時 如果和前一次是同一個洞，就再選取一次



function randomHole() {
  // 因為總共有6個洞 所以index為0~5
  let index = Math.floor(Math.random() * 6);
  let currentHole = holes[index];
  if (currentHole === lastHole) {
    return randomHole();
  } else {
    // 記住本次是在哪個洞 下輪要比對
    lastHole = currentHole;
  }
  return currentHole;
}

function popUp() {
  //取得地鼠在頁面上的時間，單位為毫秒
  const time = randomTime(500, 900);
  //取得地鼠要出現的地洞元素
  const hole = randomHole();
  //將該地洞加上 up 這個 class 讓地鼠出現
  hole.classList.add("up");
  //顯示在頁面上的時間到之後執行以下程式碼
  setTimeout(function () {
    //將取得的元素移除 up 這個 class 讓地鼠下降
    hole.classList.remove("up");
    if (switchOn === false) {
      popUp();
    } else {
      //走到這段 代表switchOn目前為true;
      switchOn = false;
    }
  }, time);
}


