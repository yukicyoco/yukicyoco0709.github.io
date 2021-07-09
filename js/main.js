'use strict';
{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');// スコア

  const quizSet = shuffle([
    {q: 'ゆっきーのおとうとは❓', c: ['ひろくん', 'だいきくん', 'たんじろう']},
    {q: 'こはるちゃんとたかしとうちゃんのならいごとは❓', c: ['たいこ', 'おどり', 'スキップ']},
    {q: 'ほのかちゃんとさくらちゃんはなんねんせい❓', c: ['1ねんせい', '３ねんせい', 'おひさまぐみ']},
    {q: 'ひろくんちにいたいぬのなまえは❓', c: ['たび', 'ける', 'いのすけ']},
]);

//変数の定義
  let currentNum = 0;
  let isAnswered;
  let score = 0;

    function shuffle(arr) {

      for (let i = arr.length - 1 ; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
      [arr[j],arr[i]] = [arr[i],arr[j]];
      }

      return arr;
    }

  function checkAnswer(li){
    // if(isAnswered === true) {
  if (isAnswered) {
      return;
    }

    isAnswered = true;

    if(li. textContent === quizSet[currentNum].c[0]){
      li.classList.add('correct');
      score++; //正解の時にスコアを一つふやす
    }else{
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');

  }

  function setQuiz() {
    isAnswered = false;

  question.textContent = quizSet[currentNum].q;

  //次の問題に進んだら前の問題を削除
  while(choices.firstChild) {
    choices.removeChild(choices.firstChild);
  }

  const shuffledChoices = shuffle([...quizSet[currentNum].c]);
  shuffledChoices.forEach(choice =>{
    const li = document.createElement('li');
    li.textContent = choice;
    li.addEventListener('click', ()=>{
        checkAnswer(li);
    });
    choices.appendChild(li);
  });

  if(currentNum === quizSet.length - 1) {
    btn.textContent = 'なん点でしょうかにゃぁ😺❓';
  }
  }

  setQuiz();

  //未回答状態だとNextボタンを押せないように
  btn.addEventListener('click', () => {
    if(btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if (currentNum === quizSet.length - 1){
      // console.log(`Score: ${score} / ${quizSet.length}`); //何個中何個正解🎵てきな
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`; //何個中何個正解🎵てきな
      result.classList.remove('hidden'); //スコア
    }else{
      currentNum++;
      setQuiz();
    }
  });
}