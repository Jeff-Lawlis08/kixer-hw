var adOne = document.getElementById('ad-container-1');
var adTwo = document.getElementById('ad-container-2');
var display = document.getElementById('display-selected');


function renderAdDisplay(adNum){
  var img = new Image();
  var src;
  if(adNum===1){
    src = '../image_components/ad-unit-1.png';
  } else {
    src = '../image_components/ad-unit-2.png';
  }
  img.src = src;
  console.log(img);
  display.innerHTML= '';
  display.appendChild(img);
}

adOne.addEventListener('click', function(e){
  renderAdDisplay(1);
});
adTwo.addEventListener('click', function(e){
  renderAdDisplay(2);
});
