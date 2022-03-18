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
        console.log("we swingin")
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
    console.log("we swingin")
}
}
/*----- app's state (variables) -----*/
//define a basic player and basic monster
let player;
let badGuy;
let newBadHealth = 50;
let newGoodHealth = 75;


/*----- cached element references -----*/
const  badGuySprite = document.querySelector('.badGuySprite');
const  goodGuySprite = document.querySelector('.goodGuySprite');
const  badGuyHealth = document.querySelector('#badGuyHealthMeter');
const  goodGuyHealth = document.querySelector('#goodGuyHealthMeter');

/*----- event listeners -----*/
//main bar for attacking etc.
document.querySelector('.inputBar').addEventListener('click', handleClick);
//main nav for spells and stuff (Stretch!!!!)
document.querySelector('nav').addEventListener('click', handleNav);

/*----- functions -----*/

function init() {
    const player = new Warrior("Matt","Sword",10,100,"","")
    const badGuy = new Monster("Little Demon",50,10,0,100,"")
}
init();

function render(){
    badGuyHealth.value = newBadHealth;
    goodGuyHealth.value = newGoodHealth
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
function doAttack(e) {

render()    
}
function doRun(e) {

render()    
}
function handleNav(e) {
console.log(e.target)
render()    
}