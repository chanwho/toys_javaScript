function qaToArray() {
  // 문제 받아오기
  let question_Array = [];
  const fs_question = require("fs");
  const filepath_question = "docs/refer/question_text.txt";
  let question_text = fs_question
    .readFileSync(filepath_question)
    .toString()
    .trim()
    .split("\n"); // question_text에 문항이 담겨있음
  for (let i = 0; i < question_text.length; i++) {
    let question_obj = {};
    question_obj = {
      question_uid: "Q" + (i + 1).toString(),
      questions: question_text[i],
      orders: i + 1,
    }; // Q1~5까지와 문항들, orders를 object 형식으로 만들음
    question_Array[i] = question_obj;
  }
  //답변 받아오기
  let answer_Array = [];
  const fs_answer = require("fs");
  const filepath_answer = "docs/refer/answer_text.txt";
  let example_text = fs_answer
    .readFileSync(filepath_answer)
    .toString()
    .trim()
    .split("\n");
  for (let i = 0; i < example_text.length; i++) {
    let example_obj = {};
    example_obj = {
      example_uid: "E" + (i + 1).toString(),
      example: example_text[i],
      orders: i + 1,
    };
    answer_Array[i] = example_obj;
  }
  return [question_Array, answer_Array];
} // 두 배열을 하나의 배열로 담아서 리턴함

let answer_array = function () {
  // 선택한 답 가져오기
  const fs_chosen_answer = require("fs");
  const filepath_anchosen_answer = "docs/refer/chosen_answer.txt";
  let chosen_answer = fs_chosen_answer
    .readFileSync(filepath_anchosen_answer)
    .toString()
    .trim()
    .split(" ")
    .map(Number);

  return chosen_answer;
};

let printFunction = (qaToArray, chosen_answer) => {
  // 출력하기
  let ans = "";
  for (let j = 0; j < 4; j++) {
    console.log(`${j + 1}. ${qaToArray[0][j].questions}`);
    if (j == 0) {
      for (let i = 0; i < 3; i++) {
        ans += `(${i + 1})${qaToArray[1][i].example} `;
      }
      console.log(ans);
      ans = "";
      console.log(`답 : (${chosen_answer[j]})\n`);
    } else if (j == 1) {
      for (let i = 0; i < 2; i++) {
        ans += `(${i + 1})${qaToArray[1][i].example} `;
      }
      console.log(ans);
      ans = "";
      console.log(`답 : (${chosen_answer[j]})\n`);
    } else if (j == 2) {
      qaToArray[1].forEach(
        (elements, index) =>
          (ans += "(" + (index + 1).toString() + ")" + elements.example + " ")
      );
      console.log(`${ans}\n`);
      ans = "";
    } else if (j == 3) {
      for (let i = 0; i < 3; i++) {
        ans += `(${i + 1})${qaToArray[1][i].example} `;
      }
      console.log(ans);
      ans = "";
      console.log(`답 : (${chosen_answer[j]})\n`);
    }
  }

  // 설문자가 고른 답 보여주기
  console.log(`\n------------ 설문자 선택 --------------`);

  for (let j = 0; j < 4; j++) {
    console.log(`${j + 1}. ${qaToArray[0][j].questions}`);
    console.log(
      `(${chosen_answer[j]}) ${qaToArray[1][chosen_answer[j] - 1].example}\n`
    );
  }
  console.log(`이용해 주셔서 감사합니다!`);
};
