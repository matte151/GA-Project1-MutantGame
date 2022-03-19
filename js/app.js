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
        this.items = [];
        this.spells = [];
    }
    swingWeapon() {
        console.log("we swingin!")
    }
}
//set up monster
class Monster {
    constructor (name, health, dmg, armor, xp, items) {
    this.name = name;
    this.health = 100;
    this.armor = 0;
    this.xp = 100;
    this.items = [];
}
    swingWeapon() {
    console.log("we swingin!")
}
}
/*----- app's state (variables) -----*/
//define a basic player and basic monster

let newBadHealth = 50;
let newGoodHealth = 75;
let attackResultGood = "";
let attackResultBad = "";


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
let player = new Warrior("Matt","Sword",10,100,"","");
let badGuy = new Monster("Little Demon",50,10,0,100,"");

// function init() {
//     let player = new Warrior("Matt","Sword",10,100,"","");
//     let badGuy = new Monster("Little Demon",50,10,0,100,"");
    
// }
// init();
console.log(Player.name)
console.log(player)
console.log(badGuy)

function render(){
    badGuyHealth.value = newBadHealth;
    goodGuyHealth.value = newGoodHealth;
    attackResultDisplayBad.innerText = attackResultBad
    attackResultDisplayGood.innerText = attackResultGood
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
}};
//make an attack roll, check to see if it hits, if it does, then roll damage in a sperate function.  4 result (crit, hit/player block, both hit, player only hit)
function doAttack(e) {
    const dieRoll = Math.random()
    if (dieRoll >.9) {
        attackResultGood = "Critical Hit!!";
        attackResultBad = "OUCH!!!";
        doDamage(2);
    } else if (dieRoll > 6) {
        attackResultGood = "Hit!";
        attackResultBad = "Swing, blocked!";
        doDamage(1);
    } else if (dieRoll >.2) {
        attackResultGood = "Hit!";
        attackResultBad = "Hit!";
        doDamage(1);
        takeDamage(1);
    } else if (dieRoll >.05) {
        attackResultGood = "I miss!!";
        attackResultBad = "Hit!";
        takeDamage(1);
    } else {
        attackResultGood = "I miss!!";
        attackResultBad = "Critical Hit!";
        takeDamage(2);
    }
    
render()    
}
function doDamage(e) {


render()    
}
function takeDamage(e) {

}
function doRun(e) {

render()    
}
function handleNav(e) {
console.log(e.target)
render()    
}