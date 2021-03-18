const userCard = document.querySelector('#user-card')
const computerCard = document.querySelector('#computer-card')
let buttonsArray = document.querySelectorAll("button");

for (let button of buttonsArray) {
  button.addEventListener("click", buttonEventListener);
}
//current target is what you hust clikcked on
function buttonEventListener(element) {
  buttonsArray.forEach(item=>item.disabled=true)
  let pickID = element.currentTarget.id;
  userCard.querySelector('.heads img').src=`./img/${pickID}.png`
  //fetches the pick
  //fetch sends to server
  fetch(`/api?pick=${pickID}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      //do more stuff to data here
    document.querySelector('#response').innerText = data.response
    // document.querySelector('.compResults').innerText = data.computerPicked
    // document.querySelector('#gameboard').innerText = data.computerPick
    computerCard.querySelector('.heads img').src=`./img/${data.computerPick}.png`

    userCard.querySelector('.heads').style.animation = 'facedown-180 .3s linear both'
    userCard.querySelector('.tails').style.animation = 'faceup-180 .3s linear both'
    setTimeout(() => {
      computerCard.querySelector('.heads').style.animation = 'facedown-180 .3s linear both'
      computerCard.querySelector('.tails').style.animation = 'faceup-180 .3s linear both'
      // if()
    },1000)


    setTimeout(()  => {
      userCard.querySelector('.tails').style.animation = 'facedown-180 .3s linear both'
      userCard.querySelector('.heads').style.animation = 'faceup-180 .3s linear both'
      computerCard.querySelector('.tails').style.animation = 'facedown-180 .3s linear both'
      computerCard.querySelector('.heads').style.animation = 'faceup-180 .3s linear both'
      buttonsArray.forEach(item=>item.disabled=false)
    },3000)

    });
}
