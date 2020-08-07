let idCats = 0;

let Cat = function(x, y, name, color){
    let setIdCat = function(){
        this.id = idCats;
        idCats++;
    }
    setIdCat.call(this);
    function getKey(obj, key){
        return Object.keys(obj)[Object.keys(obj).indexOf(key)]
    }

    this.x = x;
    this.y = y;
    this.name = name;
    this.color = color;
    
    let health = 100;
    let hungry = 50;
    let happiness = function(){
        return Math.floor((tiredness+playngUnit+health+hungry-pop)/3);
    };
    let pop = 0;
    let tiredness = 0;
    let playngUnit = 100;
    let catalog = {
        food: {
            'mouse': 30,
            'meat': 20,
            'fish': 15,
            'viskas': 5
        }
    }
    
    this.newFood = function(food, KKal){
        catalog.food[food] = KKal;
    }
    this.get = {
        health: (a=0) => {if(a!= 0){console.log(`${this.name} health: ${health}`)}; return health;},
        hungry: (a=0) =>{if(a!= 0){console.log(`${this.name} hungry: ${hungry}`)}; return hungry},
        happiness: (a=0) =>{if(a!= 0){console.log(`${this.name} happiness: ${happiness()}`)}; return happiness()},
        playngUnit: (a=0) =>{if(a!= 0){console.log(`${this.name} playngUnit: ${playngUnit}`)}; return playngUnit},
        tiredness: (a=0) =>{if(a!= 0){console.log(`${this.name} tiredness: ${tiredness}`)}; return tiredness},
        pop: (a=0) =>{if(a!= 0){console.log(`${this.name} pop: ${pop}`)}; return pop}
    }

    this.getAllParametrs = function(){
        for(let i=0; i<Object.keys(this.get).length; i++){
            this.get[Object.keys(this.get)[i]]();
        }
        return [health, hungry, happiness(), playngUnit, tiredness, pop];
    }
    
    this.eat = function(food){
        if(food !== undefined && food === getKey(catalog.food, food)){
            if(pop>49){
                console.log(`${this.name}: -Я меня уже живот болит! хочу в туалет`);
                return
            };
            hungry+=catalog.food[getKey(catalog.food, food)]
            if(hungry>100){
                pop+=hungry-100;
                hungry=100;
            }
            console.log(this.name + ': -кусь \n-ням-ням-ням\n*Сьел: ' + foodGlobObj.name + '*');
            $(`#food_${idF}`).detach();
        } else{
        console.log('*нюх-нюх*\n*что это такое? Я не буду это есть*' + foodGlobObj.name)
        };
    }
    this.play = {
        stroked: function(){
            playngUnit+=20;
            tiredness+=20;
        },
        ball: function(){
            playngUnit-=40;
            tiredness-=15;
        },
        hideEndSeek: function(){
            playngUnit+=50;
            tiredness-=20;
        }
    }
    this.sleep = function(){
        hungry-=tiredness;
        tiredness=0;
    }
    this.pop = function(){
        if(pop>0){
            this.setPop(pop);
            pop=0;
        }
    }
    this.say = {
        myau:()=>{
            console.log(this.name + ':-Мяу')
        }
    }
}
    Cat.prototype.draw = function(src){
        let catObj = this;
        let catHtml = `<div id='cat_${this.id}' class="Cat" onclick="${this.name}.say.myau()"></div>`;
        let catElement = $(catHtml);
        catElement.name = this.name;
        catElement.css({
            position: "absolute",
            left: this.x,
            top: this.y,
            width: "150px",
            height: "150px"
        });
        catElement.css("background", `url(${src})`)
        .css('background-size', 'contain')
        .css('background-repeat','no-repeat');
        $("body").append(catElement)
        parametrs();
        catElement.draggable({
            start:() => catName = catObj.name,
            stop:()=>{
                if(catBool){
                    catObj.pop();
                    newParams();
                    catBool=false;
                }
            }

        });
        catElement.droppable({
            drop: function() {
                catObj.eat(foodGlobObj.name);
                newParams();
            },
            accept: '.food'
        })
        function newParams(){

            $(`#${catObj.name}_health`).css(`width`, `${catObj.get.health()}px`);
            $(`#${catObj.name}_hungry`).css(`width`, `${catObj.get.hungry()}px`);
            $(`#${catObj.name}_happiness`).css(`width`, `${catObj.get.happiness()}px`);
            $(`#${catObj.name}_pop`).css(`width`, `${catObj.get.pop()*2}px`);
            // $(`#${catObj.name}_health`).text(`: ${catObj.get.health()}`);
            // $(`#${catObj.name}_hungry`).text(`: ${catObj.get.hungry()}`);
            // $(`#${catObj.name}_happiness`).text(`: ${catObj.get.happiness()}`);
            // $(`#${catObj.name}_pop`).text(`: ${catObj.get.pop()}`);
        }
        function parametrs(){
            let catParametrsHtml = `<div class="params"></div>`;
            let catParametrsElement = $(catParametrsHtml);
            catParametrsElement.css({
                position: "absolute",
                top: "-80px",
                "display":"flex",
                "align-items": "center",
                "max-width" : "150px",
                "flex-wrap" : "wrap"
            })
            catElement.append(catParametrsElement);
    
                let setCatElemParam = function(urlImage,id,param,height,top,color){
                    return `
                    <div class="param" 
                        style="background: 
                            url(&quot;${urlImage}&quot;) 0% 0% / 
                                contain no-repeat; 
                            width: 20px; 
                            height: ${height};
                            left:0;
                            position: absolute;
                            top:${top};"
                    >
                    </div>
                    <h6 id="${id}" style="width: ${param}px; height: 10px; background-color: ${color}; position: absolute; left:20px; top:${top}; margin: 0; font-size: 17px;"></h6>
                    `
                }
                // <h6 id="${id}" style="margin: 0; font-size: 17px; width: 130px">: ${param}</h6>
                catParametrsElement.append(setCatElemParam('./img/icons/heart.png',`${catObj.name}_health`,catObj.get.health(),'15px','0px','red'));
                catParametrsElement.append(setCatElemParam('./img/icons/meat.png',`${catObj.name}_hungry`,catObj.get.hungry(),'20px','20px','maroon'));
                catParametrsElement.append(setCatElemParam('./img/icons/smile01.png',`${catObj.name}_happiness`,catObj.get.happiness(),'20px','40px','yellow'));
                catParametrsElement.append(setCatElemParam('./img/icons/pop.png',`${catObj.name}_pop`,catObj.get.pop(),'17px','60px','saddlebrown'));
        }
    };
let idFood = 0;

let Food = function(name){
    this.name = name;
    
    this.draw = function(src){
        idFood++;
        let id = idFood;
        let foodObj = this;
        
        let foodHtml = `<div id="food_${id}" class="food" ></div>`;
        let foodElement = $(foodHtml);
        this.element = foodElement;
        
        foodElement.css({
            position: "absolute",
            left: (Math.floor((Math.random()*80)-20) + "%"),
            top: (Math.floor((Math.random()*80)-20) + "%"),
            width: "50px",
            height: "50px",
        });
        foodElement.css("background", `url(${src})`);
        foodElement.css('background-size', 'contain');
        foodElement.css('background-repeat','no-repeat');
        
        $("#meatBox").append(foodElement);
        foodElement.draggable({
            start:()=> {
                idF=id;
                foodGlobObj = foodObj;
                // console.log(id + "--" + foodHtml)
            },
            stop:function(){
            }
        })
    }
}

function setTray(){
    let trayElement = $(`<div id="tray" style="z-index:-2 ; right:100px; bottom:100px; width: 100px; height: 100px;position: absolute; background: url('./img/icons/cat_tray.png') 0% 0% / contain no-repeat;" class="ui-draggable ui-draggable-handle ui-droppable"></div>`);
    trayElement.draggable().droppable({
        drop: function() {
            catBool=true;
        },
        accept: '.Cat'
    });
    $('body').append(trayElement);
};

Cat.prototype.setPop = function(popUnit){
    let popElem = $(`<div class="pop" style="
    background: url('./img/icons/pop.png');
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    width:${popUnit}px;
    height:${popUnit}px;
    left: ${$('#tray').position().left + Math.floor((Math.random()*80)-20)}px;
    top: ${$('#tray').position().top + Math.floor((Math.random()*80)-20)}px;
    z-index: -1;
"></div>`).draggable();
    $('body').append(popElem);
}