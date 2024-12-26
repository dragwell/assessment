'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDiv = document.getElementById('result-area');
const tweetDiv = document.getElementById('tweet-area');

const createTweetBtn = (text) => {
    /**
     * <a href="https://twitter.com/intent/tweet?button_hashtag=あなたのいいろところ&ref_src=twsrc%5Etfw" 
     * class="twitter-hashtag-button" 
     * data-text="診断結果の文章" 
     * data-show-count="false">
     * Tweet #あなたのいいろところ</a>
     */
    /**
     * <script src="https://platform.twitter.com/widgets.js"
     * charset="utf-8">
     * </script>
     */
    const anchor = document.createElement('a');
    const hrefVal = `https://x.com/intent/tweet?button_hashtag=${encodeURIComponent('あなたのいいろところ')}&ref_src=twsrc%5Etfw`;
    anchor.href = hrefVal;
    anchor.classList.add('twitter-hashtag-button');
    anchor.dataset.text = text;
    anchor.dataset.showCount = false;
    anchor.innerText = 'Tweet #あなたのいいところ';

    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    return [anchor, script];
}
assessmentButton.addEventListener('click', ()=>{
    const userName = userNameInput.value;
    if (userName.length === 0)return;
    
    resultDiv.replaceChildren();
    const cardheaderDiv = document.createElement('div');
    cardheaderDiv.innerText = '診断結果';
    cardheaderDiv.classList.add('card-header','text-bg-primary');
    resultDiv.appendChild(cardheaderDiv);

    const cardbodyDiv = document.createElement('div');
    cardbodyDiv.classList.add('card-body');
    resultDiv.appendChild(cardbodyDiv);
    
    const p = document.createElement('p');
    const result = assessment(userName);
    p.innerText = result;
    p.classList.add('card-text');
    cardbodyDiv.appendChild(p);

    resultDiv.classList.add('card');

    tweetDiv.replaceChildren();
    const [anchor, script] = createTweetBtn(result);
    tweetDiv.appendChild(anchor);
    tweetDiv.appendChild(script);
});

userNameInput.addEventListener('keydown', (e)=>{
    if(e.code === 'Enter') assessmentButton.click();
});

const answers = [
  '###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',
  '###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',
  '###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
  '###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',
  '###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',
  '###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',
  '###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
  '###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',
  '###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。',
  '###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',
  '###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。',
  '###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
  '###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',
  '###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。',
  '###userName###のいいところはその全てです。ありのままの###userName###自身がいいところなのです。',
  '###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
*/
function assessment(userName) {
let sumOfCharCode = 0;
  // 全文字のコード番号を取得してそれを足し合わせる
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  result = result.replaceAll('###userName###', userName);
  return result;
}

// テストを行う関数
function test() {
    console.log('診断結果の文章のテスト');
  
    //太郎
    const a = () =>{
        let aaaa = assessment('太郎');
        console.log('太郎');
        console.assert(
            aaaa ===
            '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
            '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
        );
        return aaaa;
    };
    const bef_1 = a();
    //次郎
    const b = () =>{
        console.log('次郎');
        let aaaa =assessment('次郎');
        console.assert(
             aaaa ===
            '次郎のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる次郎が皆から評価されています。',
            '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
        );
        return aaaa;
    };
    const bef_2 = b();
    //花子
    const c = () => {
        console.log('花子');
        let aaaa = assessment('花子');
        console.assert(
            aaaa ===
            '花子のいいところはまなざしです。花子に見つめられた人は、気になって仕方がないでしょう。',
            '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
        );
        return aaaa;
    };
    const bef_3 = c();
    console.log('診断結果の文章のテスト終了');

    console.log('同じ名前なら、同じ結果を出力することのテスト');
    console.log('太郎');
    console.assert(
        bef_1 === assessment('太郎'),
        '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
    );
    console.log('次郎');
    console.assert(
        bef_2 === assessment('次郎'),
        '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
    );
    console.log('花子');
    console.assert(
        bef_3 === assessment('花子'),
        '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
    );
    console.log('同じ名前なら、同じ結果を出力することのテスト終了');
  }
  
  //test();
