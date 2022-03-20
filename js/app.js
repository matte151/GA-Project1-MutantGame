// console.log("JS Linked")

/*----- constants -----*/
//set up class structure with basic name.
class Player {
    constructor (name) {
    this.name = name;
}
}
//set up basic class starting with just a warrior.
class Warrior extends Player {
    constructor (name, weaponName, weaponDmg, health, items, spells) {
        super(name);
        this.weaponName = weaponName;
        this.weaponDmg = weaponDmg
        this.health = health;
        this.items = items;
        this.spells = spells;
    }
    gainXP() {
        console.log("Help me Level Up!")
    }
}
//set up monster
class Monster {
    constructor (name, health, atkDmg, armor, xp, items) {
    this.name = name;
    this.health = health;
    this.atkDmg = atkDmg;
    this.armor = armor;
    this.xp = xp;
    this.items = items;
    }
    giveXP() {
    console.log("I'm worth XPs and stuffs")
    }
}
/*----- app's state (variables) -----*/
//define a basic player and basic monster
let startingGoodHealth;
let startingBadHealth;
let newBadHealth = "";
let newGoodHealth = "";
let attackResultGood = "";
let attackResultBad = "";
let player;
let badGuy;

/*----- cached element references -----*/
const  badGuySprite = document.querySelector('.badGuySprite');
const  goodGuySprite = document.querySelector('.goodGuySprite');
const  badGuyHealth = document.querySelector('#badGuyHealthMeter');
const  goodGuyHealth = document.querySelector('#goodGuyHealthMeter');
const  attackResultDisplayBad = document.querySelector('.attackResultDisplayBad');
const  attackResultDisplayGood = document.querySelector('.attackResultDisplayGood');

/*----- event listeners -----*/
//main bar for attacking etc.
document.querySelector('.inputBar').addEventListener('click', handleClick);
//main nav for spells and stuff (Stretch!!!!)
document.querySelector('nav').addEventListener('click', handleNav);

/*----- functions -----*/


function init() {
    player = new Warrior("Matt","Sword",10,100,[],[]);
    badGuy = new Monster("Little Demon",50,10,0,100,[]);
    goodGuyHealth.max = player.health
    goodGuyHealth.min = 0
    goodGuyHealth.value = player.health
    goodGuyHealth.low = Math.floor(player.health*.3)
    goodGuyHealth.high = Math.floor(player.health*.6)
    goodGuyHealth.optimum = Math.floor(player.health*.75)
    badGuyHealth.max = badGuy.health
    badGuyHealth.min = 0
    badGuyHealth.value = badGuy.health
    badGuyHealth.low = Math.floor(badGuy.health*.3)
    badGuyHealth.high = Math.floor(badGuy.health*.6)
    badGuyHealth.optimum = Math.floor(badGuy.health*.75)
    startingGoodHealth = player.health;
    startingBadHealth = badGuy.health;
    render()
}
init();
// console.log(player)
// console.log(badGuy)

function render(){
    if (newBadHealth !== '') {badGuyHealth.value = newBadHealth;}
    if (newGoodHealth !== '') {goodGuyHealth.value = newGoodHealth;}
    if (attackResultBad !== '') {attackResultDisplayBad.innerText = attackResultBad;}
    if (attackResultGood !== '') {attackResultDisplayGood.innerText = attackResultGood;}
}

function handleClick(e) {
    if (e.target.tagName === "BUTTON") {
        // console.log(e.target.tagName)
      
        if (e.target.className === "attackButton") {
            doAttack();
        } else if (e.target.className === "runButton") {
            doRun();
        } else {
            console.log("wtf you clicking on?  This doesn't work!")
        }
render();
}
};
//make an attack roll, check to see if it hits, if it does, then roll damage in a sperate function.  4 result (crit, hit/player block, both hit, player only hit)
function doAttack(e) {
    const dieRoll = Math.random();
    if (dieRoll >.9) {
        attackResultGood = "Critical Hit!!";
        attackResultBad = "OUCH!!!";
        doDamage(2)
        takeDamage(0);
    } else if (dieRoll > 6) {
        attackResultGood = "Hit!";
        attackResultBad = "Swing, blocked!";
        doDamage(1)
        takeDamage(0);
    } else if (dieRoll >.2) {
        attackResultGood = "Hit!";
        attackResultBad = "Hit!";
        doDamage(1);
        takeDamage(1);
    } else if (dieRoll >.05) {
        attackResultGood = "I miss!!";
        attackResultBad = "Hit!";
        doDamage(0);
        takeDamage(1);
    } else {
        attackResultGood = "I miss!!";
        attackResultBad = "Critical Hit!";
        doDamage(0);
        takeDamage(2);
    }
   
}
function doDamage(e) {
    // make them take damage, do not render here, we are returning back to the attack check, which renders there.
    newBadHealth = Math.floor(badGuyHealth.value - (player.weaponDmg*e));

    return
}
function takeDamage(e) {
 // make them take damage, do not render here, we are returning back to the attack check, which renders there.
    newGoodHealth = Math.floor(goodGuyHealth.value - (badGuy.atkDmg*e));
 
    return
}


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
function resetGame(e) {
    newGoodHealth = startingGoodHealth;
    newBadHealth = startingBadHealth;
    attackResultBad = "You want to try again, pathetic human!";
    attackResultGood = "I WILL NEVER SUBMIT!";
    render()
}
