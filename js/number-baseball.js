const $input = document.querySelector("#input");
const $form = document.querySelector("#form");
const $logs = document.querySelector("#logs");

const numbers = [];
for (let n = 0; n < 9; n += 1) {
  numbers.push(n + 1);
}
const answer = [];
for (let n = 0; n < 4; n += 1) {
  const index = Math.floor(Math.random() * numbers.length);
  answer.push(numbers[index]);
  numbers.splice(index, 1);
}
console.log(answer);

const tries = [];
let out = 0;
function checkInput(input) {
  if (input.length !== 4) {
    //길이는 4가 아닌가
    return alert("4자리 숫자를 입력해 주세요.");
  }
  if (new Set(input).size !== 4) {
    //중복된 숫자가 있는가
    return alert("중복되지 않게 입력해 주세요.");
  }
  if (tries.includes(input)) {
    //이미 시도한 값은 아닌가
    return alert("이미 시도한 값입니다.");
  }
  return true;
}

$form.addEventListener("submit", (event) => {
  event.preventDefault(); //기본 동작 막기
  const value = $input.value;
  $input.value = "";
  if (!checkInput(value)) {
    return;
  }
  if (answer.join("") === value) {
    $logs.textContent = "홈런!";
    return;
  }
  if (tries.length >= 9) {
    const message = document.createTextNode(`패배! 정답은 ${answer.join("")}`);
    $logs.appendChild(message);
    return;
  }

  let strike = 0;
  let ball = 0;

  for (let i = 0; i < answer.length; i++) {
    const index = value.indexOf(answer[i]);
    if (index > -1) {
      if (index === i) {
        strike++;
      } else {
        ball++;
      }
    }
  }
  if (!strike && !ball) {
    out++;
    $logs.append(`${out}아웃! `, document.createElement("br"));
  } else {
    $logs.append(
      `${value} : ${strike} 스트라이크 ${ball} 볼`,
      document.createElement("br")
    );
    tries.push(value);
  }
  if (out === 3) {
    $logs.append(`패배! 정답은 ${answer.join("")}`);
    return;
  }
});
