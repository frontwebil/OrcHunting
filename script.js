let xp = 0;
let health = 100;
let gold = 50;
const locations = [
  {
    name: "В штабі",
    "button text": ["Арсенал", "Виїхати на позицію", "Полювання на ворожий танк"],
    "button functions": [goArs, goPos, fightTank],
    text: "Ви виїжаєте на безпечну позицію"
  },
  {
    name: "Арсенал",
    "button text": ["Поповнити особовий склад(10)", "Покращити озброєння (30)", "Повернутися до позицій"],
    "button functions": [buyHealth, buyWeapon, goPosition],
    text: "Ви прибули до штабу"

  },
  {
    name: "Позиції",
    "button text": ["Полювання на орків", "Атака на спостережний пункт", "Покинути позицію"],
    "button functions": [fightOrk, fightBeast, goPosition],
    text: "Ви прибули на позицію , для відпрацювання по цілям"
  },
  {
    name: "fight",
    "button text": ["Постріл", "Змінити позицію", "Покинути позицію"],
    "button functions": [attack, dodge, goPosition],
    text: "Ви прибули на позицію."
  },
  {
    name: "kill monster",
    "button text": ["Повернутися","Повернутися","Повернутися"],
    "button functions": [goPosition,goPosition,goPosition],
    text: 'Ви успішно відпрацювали по цілі, повертайтесь на базу '
  },
  {
    name: "lose",
    "button text": ["Герої не вмирають!","Бути воїном-жити вічно","Слава Нації"],
    "button functions": [restart,restart,restart],
    text: "Вашу бригаду розбито..." 
  },
  {
    name: "win",
    "button text": ["СЛАВА УКРАЇНІ!","СЛАВА НАЦІЇ!","УКРАЇНА ПОНАД УСЕ"],
    "button functions": [restart,restart,restart],
    text: "Ви знищили ворожий танк.Ваша ціль виконана" 
  },


];
let inventory = ["Міномет 82мм"];


const weapons = [
  {
    name: "Міномет 82мм",
    power: 5,
  },

  {
    name: "Міномет 120мм",
    power: 30,
  },

  {
    name: "М777",
    power: 50,
  },

  {
    name: "M142 Himars",
    power: 100,
  },
];

const monsters = [

  {
    name: "Орк",
    level: 2,
    health: 15,
  },

  {
    name: "Спостережний пункт",
    level: 8,
    health: 60,
  },

  {
    name: "T90(ru)",
    level: 20,
    health: 300,
  }

];

let currentWeapon = 0;
let fighting;
let monsterHealth;

const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const text = document.querySelector('#text');
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');
goldText.innerText = gold; //com
const monsterStats = document.querySelector('#monsterStats');
const monsterName = document.querySelector('#monsterName');
const monsterHealthText = document.querySelector('#monsterHealth');

button1.onclick = goArs;
button2.onclick = goPos;
button3.onclick = fightTank;


//initialize buttons
function goPosition() {
  update(locations[0]);

};

function goArs() {
  update(locations[1]);

}


function goPos() {
  update(locations[2]);
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = 'block';
  monsterName.innerText= monsters[fighting].name;
  monsterHealthText.innerText = monsters[fighting].health;
}

function fightTank() {

  monsterStats.style.display = 'block';
  fighting = 2;
  goFight();
}

function fightOrk() {
  fighting = 0;
  goFight();

};

function fightBeast() {
  fighting = 1;
  goFight();

};

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  }
  else {
    text.innerText = "У вас недостатньо оснащення щоб поповнити особовий склад."

  }
}

function buyWeapon() {

  if (currentWeapon < weapons.length - 1) {

    if (gold >= 30) {


      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Зараз ви маєте" + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " У вашому озброєнні є: " + inventory;
    }
    else {
      text.innerText = "У вас недостатньо оснащення щоб взяти нове озброєння";

    }
  }
  else {
    text.innerText = "Ви вже маєте найкраще озброєння";
    button2.innerText = "Віддати старе озброєння";
    button2.onclick = sellWeapon;
  }
};




function update(locations) {
  monsterStats.style.display = 'none';

  text.innerHTML = locations.text;

  button1.innerText = locations["button text"][0];
  button2.innerText = locations["button text"][1];
  button3.innerText = locations["button text"][2];

  button1.onclick = locations["button functions"][0];
  button2.onclick = locations["button functions"][1];
  button3.onclick = locations["button functions"][2];

};

function sellWeapon() {

  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon;
    currentWeapon = inventory.shift();
    text.innerText = "Ви віддали іншому відділенню" + currentWeapon + ".";
    text.innerText += " На вашому озброєнні : " + inventory;

  }
  else {
    text.innerText = "Ви не можете віддати все своє озброєння.";
  }

}


function attack() {

  text.innerText = " Ви влучаєте по "+ monsters[fighting].name + '.' ;
  text.innerText += " Ви насипаєте по ворогу з "+weapons[currentWeapon].name+'.';
  health -= getMonsterAttackValue(monsters[fighting].level);
  if(isMonsterHit()){
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random()*xp)+1;
  }
  else{
    text.innerText += " потрібно зробити поправки"
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;



  if(health <= 0){
    lose()
  }else if (monsterHealth<=0){
    if (fighting === 2){
      winGame();
    }
    else{
      defeatMonster()
    }
  }


  if(Math.random()<=.1 && inventory.length!==1){
    text.innerText += " Ваш "+inventory.pop()+" Пошкодженно"
    currentWeapon--;
  }
};

function getMonsterAttackValue(level) {

  const hit = (level * 5) - (Math.floor(Math.random()*xp));
  return hit > 0 ? hit : 0;
};


function dodge() {
  text.innerText = "Ви змінили позицію.";

};


function defeatMonster() {
  gold += Math.floor(monsters[fighting].level*6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
};

function lose() {
  update(locations[5])
};

function winGame(){
  update(locations[6])
};

function restart() {
  xp = 0;
  gold = 50;
  health = 100;
  currentWeapon = 0;
  inventory = ["Міномет 82мм"]

  xpText.innerText = xp;
  goldText.innerText = gold;
  healthText.innerText = health;
  
  goPosition();
  
};

function isMonsterHit() {

  return Math.random()>.2 || health < 20;
  
}



