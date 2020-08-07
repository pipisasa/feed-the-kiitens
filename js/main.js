let foodName = 'qwerty';
let foodGlobObj = {};
let idF;

let catBool = false;
let catName = 'cat';

setTray();

$(function(){
    $('#meatBody').draggable();
})

let kisya = new Cat((Math.floor(Math.random()*150)),(Math.floor(Math.random()*150)),'kisya','red');
    kisya.draw('./img/cat01.png');
let ki = new Cat((Math.floor(Math.random()*150)+300),(Math.floor(Math.random()*150)),'ki','red');
    ki.draw('./img/cat02.png');
let kotik = new Cat((Math.floor(Math.random()*150)),(Math.floor(Math.random()*150)+300),'kotik','red');
    kotik.draw('./img/cat03.png');
let koshak = new Cat((Math.floor(Math.random()*150)+300),(Math.floor(Math.random()*150)+300),'koshak','red');
    koshak.draw('./img/cat04.png')

let meat = new Food('meat');
    meat.draw('./img/food/meat.png');