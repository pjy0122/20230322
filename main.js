const QUOTES = "quotes";

function getTime() {
  const time = document.querySelector(".time");
  // 실무 js에서 많이 쓰는 querySelector

  const newDate = new Date();

  const hours = String(newDate.getHours()).padStart(2, "0");
  const minutes = String(newDate.getMinutes()).padStart(2, "0");
  const seconds = String(newDate.getSeconds()).padStart(2, "0");

  // if (seconds.toString().length === 1) {
  //     seconds = "0" + seconds;
  //   }

  // time.innerText = hours + ":" + minutes + ":" + seconds;
  time.innerText = `${hours}:${minutes}:${seconds}`;
}

getTime();

setInterval(getTime, 1000);

function getQuotes() {
  const quotesMsg = document.querySelector(".quotesMsg");

  let savedQuotes = localStorage.getItem(QUOTES);

  if (!savedQuotes) {
    localStorage.setItem(
      QUOTES,
      JSON.stringify([
        "열심히 살지맙시다.",
        "그래도 열심히 살아야지.",
        "열심히 살면 뭐해~",
        "열심히 살면 반드시 빛이 온다.",
      ])
    );

    savedQuotes = localStorage.getItem(QUOTES);
  }

  let quotesArray = JSON.parse(savedQuotes);

  quotesMsg.innerText =
    quotesArray[Math.floor(Math.random() * quotesArray.length)];
}

getQuotes();

function onClickAdd() {
  const newQuotes = document.querySelector(".newQuotes");

  newQuotes.style.display = "inline-block";
}

function onClickRegist() {
  const quotesMsg = document.querySelector(".quotesMsg");
  const newQuotes = document.querySelector(".newQuotes");
  const newQuotesInput = document.querySelector(".newQuotesInput");

  if (!newQuotesInput.value) {
    return;
    // if문에서 아무것도 안적고 return을 하면 다음것이 실행안되게함 (함수를 끝내는 용도이기도함)
  }

  let savedQuotes = localStorage.getItem(QUOTES);

  let quotesArray = JSON.parse(savedQuotes);
  quotesArray.push(newQuotesInput.value);

  localStorage.setItem(QUOTES, JSON.stringify(quotesArray));

  quotesMsg.innerHTML = `<span style="color:red;">${newQuotesInput.value}<span>`;
  newQuotes.style.display = "none";
  newQuotesInput.value = "";
}

// const a = {
//   question: "질문입니다.",
// };

// const b = {
//   question: question,
// };

// const c = {
//   question,
// };

let isLoading = false;

async function onClickSearch() {
  const searchInput = document.querySelector(".searchInput");
  const searchResult = document.querySelector(".searchResult");
  
  if (!searchInput.value) return;
  if (isLoading) return;
  // return을 쓰고 뒤에 아무것도 적지 않으면 여기까지만 함수 실행

  isLoading = true;

  const question = searchInput.value;

  searchInput.value = "검색 중 입니다... 잠시만 기다려주세요.";

  console.log("챗 지피티 동작중");
  // 프론트엔드에서 백엔드로 보내는 코드
  // 강사님 백엔드에서 post요청을 받게 해둬서 post요청 (get요청도 있음)
  // await.....async...
  const response = await axios.post("https://holy-fire-2749.fly.dev/chat", {
      question,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer BLOCKCHAINSCHOOL3",
      },
    }
  );

  if(response.status === 200) {
    searchResult.style.display = "inline";
    searchResult.style.color = "whitesmoke";
    searchResult.style.fontSize = "50px";
    searchResult.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    searchResult.style.border = "5px solid crimson";
    searchResult.style.borderRadius = "10px";
    searchResult.style.padding = "20px";
    searchResult.innerText = response.data.choices[0].message.content;
  }

  searchInput.value = "";
  
  isLoading = false;
}

function onClickToggle(value) {
  const nft = document.querySelector(".nft");
  const nftView = document.querySelector(".nftView");

  if(value) {
    nft.style.display = "inline-block";
    nftView.style.display = "none";
  } else {
    nft.style.display = "none";
    nftView.style.display = "inline-block";
  }

  
}

