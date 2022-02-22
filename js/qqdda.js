const number = parseInt(prompt("몇명이 참가하나요?"));
const $button = document.querySelector("button");
const $input = document.querySelector("input");
const $word = document.querySelector("#word");
const $order = document.querySelector("#order");
let word;
let newWord;

if (number) {
  const onClickButton = () => {
    if (
      newWord.length === 3 &&
      (!word || word[word.length - 1] === newWord[0])
    ) {
      //제시어가 비어있는 경우
      word = newWord;
      $word.textContent = word;
      const order = parseInt($order.textContent);
      if (order + 1 > number) {
        $order.textContent = 1;
      } else {
        $order.textContent = order + 1;
      }
    } else {
      alert("올바르지 않은 단어입니다.");
    }
    $input.value = "";
    $input.focus();
  };
  const onInput = (event) => {
    newWord = event.target.value;
  };

  $button.addEventListener("click", onClickButton);
  $input.addEventListener("input", onInput);
} else {
  alert("게임을 종료합니다.");
  document.querySelector("body").remove();
}
