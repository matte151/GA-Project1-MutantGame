// console.log("JS Linked")
// add a score points
// add evolution points
// add stats for armor, speed, health, Melee damage, Ranged damage, magic?
// add types of things to evolve into
// add ability to pick bad guys to eat
// add ability to get boosts from bad guys.
// top end: Phoenix(magic), Dragon (Range Damage), Some kind of turtle thing(Armor)
// top end: Chinese Dragon(Speed), Tiger (Melee Damage), Health (Treant)

/*----- constants -----*/
//set up class structure with basic name.
class Player {
    constructor (name) {
    this.name = name;
}
}

//set up basic class starting with just a Mutant.
class Mutant extends Player {
    constructor (name, health, meleeDmg, rangedDmg, armor, speed, magic, level, imgLoc,imgSize,imgXPos,imgYPos) {
        super(name);
        this.health = health;
        this.rangedDmg = rangedDmg;
        this.meleeDmg = meleeDmg;
        this.armor = armor;
        this.speed = speed;
        this.magic = magic;
        this.level = level;
        this.imgLoc = imgLoc;
        this.imgSize = imgSize;
        this.imgXPos = imgXPos;
        this.imgYPos = imgYPos;
    }
    gainXP() {
        console.log("Help me Level Up!")
    }
}
//set up monster
class Monster {
    constructor (name, health, meleeDmg, rangedDmg, armor, speed, magic, level, imgLoc,imgSize,imgXPos,imgYPos,action) {
    this.name = name;
    this.health = health;
    this.meleeDmg = meleeDmg;
    this.rangedDmg = rangedDmg;
    this.armor = armor;
    this.speed = speed;
    this.magic = magic;
    this.level = level;
    this.imgLoc = imgLoc;
    this.imgSize = imgSize;
    this.imgXPos = imgXPos;
    this.imgYPos = imgYPos;
    this.action = action;
    Monster.allInstances.push(this);
    }
    checkAction() {
    console.log("I'm worth XPs and stuffs")
    }
}


/*----- app's state (variables) -----*/
//define a basic player and basic monster
// let startingGoodHealth;
// let startingBadHealth;
let newBadHealth = "";
let newGoodHealth = "";
let attackResultGood = "";
let attackResultBad = "";
let player;
let badGuy;
// let availableChoices = []; //choices for player mutations will be pushed into here. - no no they won't, otherwise it will just grow forever.  It should be in a const in the function.
// let availablePrey = []; //choices for prey animals will be pushed in here, and shifted out based on level.  Only 3 ever, so the push one will have to shift one out too.
let availableAttackers = []; // potential monsters that attack us on the way to prey monsters, or after we kill the prey monster.  Keep this to 2-3 at MAX and level relevant.
Monster.allInstances = [];



/*----- cached element references -----*/
const badGuySprite = document.querySelector('.badGuySprite');
const goodGuySprite = document.querySelector('.goodGuySprite');
const badGuyHealth = document.querySelector('#badGuyHealthMeter');
const goodGuyHealth = document.querySelector('#goodGuyHealthMeter');
const attackResultDisplayBad = document.querySelector('.attackResultDisplayBad');
const attackResultDisplayGood = document.querySelector('.attackResultDisplayGood');
const meleeButton = document.querySelector('.meleeButton');
const rangedButton = document.querySelector('.rangedButton');
const spellButton = document.querySelector('.spellButton');
const anyModal = document.querySelector('.modal')
const choosePreyModal = document.querySelector('#choosePreyModal')
const chooseMutationModal = document.querySelector('#chooseMutationModal')
const closeMutation = document.querySelector('#closeMutation');
const closePrey = document.querySelector('#closePrey');
const preySelect1 = document.querySelector('#preySelect1')
const preySelect2 = document.querySelector('#preySelect2')
const preySelect3 = document.querySelector('#preySelect3') 
const healthMeter = document.querySelector('.healthMeter')
const mutationSelect1 = document.querySelector('#mutationSelect1')
const mutationSelect2 = document.querySelector('#mutationSelect2')
const mutationSelect3 = document.querySelector('#mutationSelect3') 


/*----- event listeners -----*/
//main bar for attacking etc.
document.querySelector('.inputBar').addEventListener('click', handleClick);
//main nav for spells and stuff (Stretch!!!!)
document.querySelector('nav').addEventListener('click', handleNav);
//this is to close ANY modal box.  First one is by clicking the x the second is by clicking off..
//modal button listener and stuff?
anyModal.addEventListener('click', handleModalClick)
closePrey.onclick = function() {
    choosePreyModal.style.display = "none";
  }
closeMutation.onclick = function() {
    chooseMutationModal.style.display = "none";
  }
window.onclick = function(event) {
   if (event.target == choosePreyModal) {choosePreyModal.style.display = "none";}
   if (event.target == chooseMutationModal) {chooseMutationModal.style.display = "none";}


}
// use this to make health appear on the meter maybe?
healthMeter.addEventListener('onMouseOver', handleHealthMeter);

/*----- functions -----*/

//set up initial stuff
function init() {
    // (name, health, meleeDmg, rangedDmg, armor, speed, magic, level, imgLoc,imgSize, imgX, imgY,action)
    let mutantSpawnling = new Mutant("Spawnling",50,5,1,0,1,0,1,"url(imgs/pixelKnight.png)","333vw","169vw","78vw");
    let monsterRabbit = new Monster("Rabbit",5,2,0,0,2,0,1,"url(imgs/giantBee.png)","85vw","-28vw","-26vw","run");
    let monsterDeer = new Monster("Deer",10,5,0,0,2,0,1,"url(imgs/giantBee.png)","85vw","-28vw","-26vw","meleeAttack");
    let monsterSquirrel = new Monster("Squirrel",5,0,0,0,3,0,2,"url(imgs/giantBee.png)","85vw","-28vw","-26vw","meleeAttack");
    let monsterBadger = new Monster("Badger",20,10,0,2,3,0,2,"url(imgs/giantBee.png)","85vw","-28vw","-26vw","meleeAttack");
    let monsterSheep = new Monster("Sheep",20,0,0,2,2,0,1,"url(imgs/giantBee.png)","85vw","-28vw","-26vw","meleeAttack");
    let monsterBear = new Monster("Bear",85,10,0,3,1,0,3,"url(imgs/giantBee.png)","85vw","-28vw","-26vw","meleeAttack");
    let monsterWolf = new Monster("Wolf",50,8,0,0,3,0,2,"url(imgs/giantBee.png)","85vw","-28vw","-26vw","meleeAttack");
    let monsterPixie = new Monster("Pixie",25,0,0,0,3,5,1,"url(imgs/giantBee.png)","85vw","-28vw","-26vw","meleeAttack");
    let monsterAnteater = new Monster("Anteater",25,5,0,5,2,0,2,"url(imgs/giantBee.png)","85vw","-28vw","-26vw","meleeAttack");
    let monsterTurtle = new Monster("Turtle",85,10,0,10,1,0,3,"url(imgs/giantBee.png)","85vw","-28vw","-26vw","meleeAttack");
    let monsterGiantBee = new Monster("Giant Bee",50,15,0,1,5,0,4,"url(imgs/giantBee.png)","85vw","-28vw","-26vw","meleeAttack");
    let monsterGiantSpider = new Monster("Giant Spider",100,5,10,3,3,0,4,"url(imgs/giantBee.png)","85vw","-28vw","-26vw","meleeAttack");
    let monsterGiantAnt = new Monster("Giant Ant",85,15,0,5,2,0,4,"url(imgs/giantBee.png)","85vw","-28vw","-26vw","meleeAttack");
    let monsterDireBear = new Monster("Dire Bear",150,20,0,10,3,0,5,"url(imgs/giantBee.png)","85vw","-28vw","-26vw","meleeAttack");
    player = mutantSpawnling;
    badGuy = monsterRabbit;
    goodGuyHealth.max = player.health;
    goodGuyHealth.min = 0;
    goodGuyHealth.value = player.health;
    goodGuyHealth.low = Math.floor(player.health*.3);
    goodGuyHealth.high = Math.floor(player.health*.5);
    goodGuyHealth.optimum = Math.floor(player.health*.85);
    badGuyHealth.max = badGuy.health;
    badGuyHealth.min = 0;
    badGuyHealth.value = badGuy.health;
    badGuyHealth.low = Math.floor(badGuy.health*.3);
    badGuyHealth.high = Math.floor(badGuy.health*.6);
    badGuyHealth.optimum = Math.floor(badGuy.health*.8);
    meleeButton.innerText = `Melee (${Math.floor(player.meleeDmg*.5)} - ${player.meleeDmg})`;
    rangedButton.innerText = `Ranged (${Math.floor(player.rangedDmg*.5)} - ${player.rangedDmg})`;
    spellButton.innerText = `Spell (${Math.floor(player.magic*.5)} - ${player.magic})`;
    render();
}
init();
// console.log(player)
// console.log(badGuy)

function render(){
    badGuyHealth.value = badGuy.health;
    goodGuyHealth.value = player.health;
    attackResultDisplayBad.innerText = attackResultBad;
    attackResultDisplayGood.innerText = attackResultGood;
   //update bad guy sprite
    badGuySprite.style.backgroundImage = badGuy.imgLoc;
    badGuySprite.style.backgroundSize = badGuy.imgSize; 
    badGuySprite.style.backgroundPositionX = badGuy.imgXPos;
    badGuySprite.style.backgroundPositionY = badGuy.imgYPos;
    badGuySprite.innerText = badGuy.name;  //comment me out later, it's in here for testing to make sure it changes later instead of images.
    //update good guy sprite
    goodGuySprite.style.backgroundImage = player.imgLoc;
    goodGuySprite.style.backgroundSize = player.imgSize; 
    goodGuySprite.style.backgroundPositionX = player.imgXPos;
    goodGuySprite.style.backgroundPositionY = player.imgYPos;
    goodGuySprite.innerText = player.name; // comment me out later
}

function handleClick(e) {
    if (e.target.tagName === "BUTTON") {
        // console.log(e.target.tagName)
          if (e.target.className === "meleeButton") {doAttack(player.meleeDmg,1);}
          if (e.target.className === "rangedButton") {doAttack(player.rangedDmg,1);}
          if (e.target.className === "spellButton") {doAttack(player.magic, 0);}
          if (e.target.className === "runButton") {doRun(player.speed);}
render();
}
};
//initiative check??? Stretch, might be nice to stick that in, it'd be cool

//make an attack roll, check to see if it hits, if it does, then roll damage in a sperate function.  4 result (crit, hit/player block, both hit, player only hit)
function doAttack(e, f) {
    const dieRoll = Math.random();
    if (dieRoll >.8) {
        attackResultGood = "Critical Hit!!";
        damageBadGuy(2*e, e, f)
    } else if (dieRoll > .5) {
        attackResultGood = "Hit!";
         damageBadGuy(e,.5*e, f)
    } else if (dieRoll >.15) {
        attackResultGood = "Glancing Hit!";
        damageBadGuy(.5*e,0, f);
    } else {
        attackResultGood = "I miss!!";
        damageBadGuy(0, 0, f);
    }
}
function doBadGuyAction(e) {
    //Run if it's a run action
    if (badGuy.action === "run") {
        if (Math.random()*badGuy.speed > Math.random()*player.speed) {doEnemyRan()} 
    } else { doEnemyRunFail()}
    //Melee Attack
    if (badGuy.action === "meleeAttack") {doBadGuyAttack(badGuy.meleeDmg,1)}
    //Ranged Attack
    if (badGuy.action === 'rangedAttack') {doBadGuyAttack(badGuy.rangedDmg,1)}
    //Spell Attack
    if (badGuy.action === 'spellAttack') {doBadGuyAttack(badGuy.magic,0)}
}
function doBadGuyAttack(e, f) {
    const dieRoll = Math.random();
    if (dieRoll >.9) {
            attackResultBad = "Crit!!!";
            damagePlayer(2*e, e,f);
        } else if (dieRoll > .6) {
            attackResultBad = "Hit";
            damagePlayer(1*e,e*.25,f);
        } else if (dieRoll >.3) {
            attackResultBad = "Glancing Hit!";
            damagePlayer(.5*e,0,f);
        } else {
            attackResultBad = "miss";
            damagePlayer(0*badGuy.meleeDmg,0,f);
        }
    }

function damageBadGuy(e, f, g) {
    // make them take damage, do not render here, we are returning back to the attack check, which renders there.
    newBadHealth = Math.floor(badGuyHealth.value - ((Math.random() * e + f)-badGuy.armor*g));
    badGuy.health = newBadHealth
    if(badGuy.health <= 0) {doBadGuyDies()} else {doBadGuyAction()};
}
function damagePlayer(e, f, g) {
 // make them take damage, do not render here, we are returning back to the attack check, which renders there.
    newGoodHealth = Math.floor(goodGuyHealth.value - ((Math.random() * e + f)-player.armor*g));
    player.health = newGoodHealth
    if(player.health<=0) {doPlayerDies()}
}

function doEnemyRan(e) {
    const playerSpeed = Math.random()*player.speed
    const badSpeed = Math.random()*badGuy.speed
    const dmgTaken = Math.max(player.meleeDmg,player.rangedDmg,player.magic)
    if( playerSpeed > .25+badSpeed){damageBadGuy(dmgTaken*2,dmgTaken,0)}
    if( playerSpeed > badSpeed){damageBadGuy(dmgTaken,dmgTaken*.5,0)}
    if( badSpeed >= playerSpeed){damageBadGuy(dmgTaken*.5,0,0)}
    if( badSpeed >= .25+playerSpeed){doEnemyGetsAway()}
    //get new choices and stuff here.
};
function doEnemyRunFail(){
 //what happens if the enemy fails to run.  Mainly just an image jiggle? Maybe? and nothing...
}
function doEnemyGetsAway() {
    badGuy.imgLoc = "";
    badGuy.imgSize = "";
    badGuy.imgXPos = "";
    badGuy.imgYPos = "";
    //get new monster and stuff.
};
function doRun(e) {
    const dieRoll = Math.random();
    if (dieRoll > .5) {
        console.log("You run and live!");
    } else {
        console.log("You're cut down and die... sadness...")
    }
render()    
}
function handleNav(e) {
    if (e.target.innerText === "Play") {
        if (confirm('Are you sure? ')) {
            resetGame();
        } else {
            console.log("you were not")}
        }
render()    
}

function doPlayerDies(){
    player.imgLoc = "url(imgs/deathEffect.png)";
    player.imgSize = "130vw";
    player.imgXPos = "0vw";
    player.imgYPos = "-4vw";
    //add in something else for a "Game over" type screen or something...
}
function doBadGuyDies() {
    //Change the bad guy picture, render it, and give the player some upgrades.
    badGuy.imgLoc = "url(imgs/deathEffect.png)";
    badGuy.imgSize = "130vw"; 
    badGuy.imgXPos = "0vw";
    badGuy.imgYPos = "-4vw";
    
    render();
    
    getUpgrades();
}
function resetGame(e) {
    init()
}
function getUpgrades() {
    const availableChoices = [];
    availableChoices.push('health')
    for (const property in badGuy) {
        if (badGuy[property] > 0 && property !=='level') {
            availableChoices.push(property)
        }

    }
    if (availableChoices.length > 3) {
        //remove random elements from the array until it's 3 or under
        for(let i = availableChoices.length-1; i>3; i--) {
        availableChoices.splice(Math.floor(Math.random()*availableChoices.length), 1);
        }
    }
    console.log(availableChoices)
    createUpgradeBoxes(availableChoices);
}
function createUpgradeBoxes(e) {
    mutationSelect1.innerText = e[0]
    mutationSelect2.innerText = e[1]
    mutationSelect3.innerText = e[2]
    choosePreyModal.style.display = "none"
    chooseMutationModal.style.display = "block";
    // getPrey();
}
function getPrey(e) {
    // console.log(Monster.allInstances)
    const availablePrey = Monster.allInstances.filter(function(e){
        return e.level <= player.level    
    })
    if (availablePrey.length > 3) {
        //remove random elements from the array until it's 3 or under
        for(let i = availablePrey.length-1; i>3; i--) {
            availablePrey.splice(Math.floor(Math.random()*availablePrey.length), 1);
        }
    }
    createPreyBoxes(availablePrey)
}
function createPreyBoxes(e) {
    preySelect1.innerText = e[0].name
    preySelect2.innerText = e[1].name
    preySelect3.innerText = e[2].name
    chooseMutationModal.style.display = "none";
    choosePreyModal.style.display = "block";
}
function handleModalClick(e) {
    console.log(e.target)
}

function handleHealthMeter(e) {
    //this should create a little pop up above the health meter to show the health values.
}
