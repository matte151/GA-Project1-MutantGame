// Mutant Evolution!

/*----- constants -----*/
//set up class structure with basic name.
class Player {
    constructor (name) {
    this.name = name;
    }
}
const pauseInterval = 200
//set up basic class starting with just a Mutant.  Possible future to add evolution points add types of things to evolve into, top end: Phoenix(magic), Dragon (Range Damage), Some kind of turtle thing(Armor), Chinese Dragon(Speed), Tiger (Melee Damage), Health (Treant)
class Mutant extends Player {
    constructor (name, health, meleeDmg, rangedDmg, armor, speed, magic, level, imgLoc,imgSize,imgPos) {
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
        this.imgPos = imgPos;
    }
}
//set up monster
class Monster {
    constructor (name, health, meleeDmg, rangedDmg, armor, speed, magic, level, imgLoc,imgSize,imgPos,action) {
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
    this.imgPos = imgPos;
    this.action = action;
    Monster.allInstances.push(this);
    }
}

/*----- app's state (variables) -----*/

let startingGoodHealth;
let startingBadHealth;
let newBadHealth;
let newGoodHealth;
let attackResultGood;
let attackResultBad;
let nextMonster;
let player;
let badGuy;
let newBattleText;
let preyModalStatus;
let mutationModalStatus;
let currentBadSpriteLoc;
let currentBadSpriteSize;
let currentBadSpritePos;
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
const instructionModal = document.querySelector('#instructionModal')
const closeMutation = document.querySelector('#closeMutation');
const closePrey = document.querySelector('#closePrey');
const preySelect1 = document.querySelector('#preySelect1')
const preySelect2 = document.querySelector('#preySelect2')
const preySelect3 = document.querySelector('#preySelect3') 
const mutationSelect1 = document.querySelector('#mutationSelect1')
const mutationSelect2 = document.querySelector('#mutationSelect2')
const mutationSelect3 = document.querySelector('#mutationSelect3')
const battleLog = document.querySelector('.log')

/*----- event listeners -----*/
//main bar for attacking etc.
document.querySelector('.inputBar').addEventListener('click', handleClick);
//main nav, currently only for reset button.
document.querySelector('nav').addEventListener('click', handleNav);
//modal button listeners.
choosePreyModal.addEventListener('click', handlePreyModalClick)
chooseMutationModal.addEventListener('click', handleMutationModalClick)
//This listens to the health meters specifically.  At some point a mouseover effect would be great.
goodGuyHealth.addEventListener('click', handleHealthMeter);
badGuyHealth.addEventListener('click', handleHealthMeter);
/*----- functions -----*/

//set up initial stuff
function init() {
    // (name, health, meleeDmg, rangedDmg, armor, speed, magic, level, imgLoc,imgSize, imgX, imgY,action)
    let mutantSpawnling = new Mutant("Spawnling",50,5,1,0,1,0,1,"url(imgs/spawnling.png)","contain","center");
    let monsterRabbit = new Monster("Rabbit",5,2,0,0,2,0,1,"url(imgs/rabbit.png)","contain","-center","run");
    let monsterDeer = new Monster("Deer",20,5,0,0,2,0,1,"url(imgs/deer.png)","contain","-center","meleeAttack");
    let monsterSquirrel = new Monster("Squirrel",15,0,2,0,3,0,2,"url(imgs/squirrel.png)","contain","-center","run");
    let monsterBadger = new Monster("Badger",20,10,0,2,3,0,2,"url(imgs/badger.png)","contain","-center","meleeAttack");
    let monsterSheep = new Monster("Sheep",20,3,0,5,2,0,1,"url(imgs/sheep.png)","contain","-center","meleeAttack");
    let monsterBear = new Monster("Bear",100,20,0,3,2,0,3,"url(imgs/bear.png)","contain","-center","meleeAttack");
    let monsterWolf = new Monster("Wolf",75,15,0,0,4,0,3,"url(imgs/wolf.png)","contain","-center","meleeAttack");
    let monsterPixie = new Monster("Pixie",15,0,0,0,3,5,1,"url(imgs/pixie.png)","contain","-center","run");
    let monsterAnteater = new Monster("Anteater",75,5,0,5,2,0,2,"url(imgs/anteater.png)","contain","-center","meleeAttack");
    let monsterTurtle = new Monster("Turtle",85,10,0,20,1,0,3,"url(imgs/turtle.png)","contain","-center","meleeAttack");
    let monsterGiantBee = new Monster("GiantBee",100,30,0,1,6,0,4,"url(imgs/giantBeeSm.png)","contain","-center","meleeAttack");
    let monsterGiantSpider = new Monster("GiantSpider",200,25,10,3,3,0,4,"url(imgs/giantSpider.png)","contain","-center","meleeAttack");
    let monsterGiantAnt = new Monster("GiantAnt",185,10,35,5,2,0,5,"url(imgs/mutantWolf.png)","contain","-center","rangedAttack");
    let monsterDemon = new Monster("Demon",100,0,0,5,3,20,4,"url(imgs/demon.png)","contain","-center","spellAttack");
    let monsterDireBear = new Monster("DireBear",250,40,0,10,3,0,6,"url(imgs/direBear.png)","contain","-center","meleeAttack");
    
    player = mutantSpawnling;
    badGuy = monsterRabbit;
    currentBadSpriteLoc = badGuy.imgLoc;
    currentBadSpriteSize = badGuy.imgSize;
    currentBadSpritePos = badGuy.imgPos;
    startingGoodHealth = player.health;
    startingBadHealth = badGuy.health;
    goodGuyHealth.max = player.health;
    goodGuyHealth.min = 0;
    goodGuyHealth.value = player.health;
    goodGuyHealth.low = Math.floor(player.health*.3);
    goodGuyHealth.high = Math.floor(player.health*.5);
    goodGuyHealth.optimum = Math.floor(player.health*.85);
    badGuyHealth.max = startingBadHealth;
    badGuyHealth.min = 0;
    badGuyHealth.value = badGuy.health;
    badGuyHealth.low = Math.floor(startingBadHealth*.3);
    badGuyHealth.high = Math.floor(startingBadHealth*.6);
    badGuyHealth.optimum = Math.floor(startingBadHealth*.8);
    attackResultBad = "";
    attackResultGood = "";
    newBattleText = "Battle Log:";
    preyModalStatus = 'none';
    mutationModalStatus = 'none';
//This is displaying the instruction block, and giving them 12 seconds to read it before going to the main game.
    instructionModal.style.display = 'block';
    setTimeout(function(){render()},12000);
}
init();
//Render function, controlls all updates to dom.
function render(){
    instructionModal.style.display ='none'
    badGuyHealth.min = 0;
    badGuyHealth.max = startingBadHealth
    badGuyHealth.value = badGuy.health;
    badGuyHealth.low = Math.floor(startingBadHealth*.3);
    badGuyHealth.high = Math.floor(startingBadHealth*.6);
    badGuyHealth.optimum = Math.floor(startingBadHealth*.8);
    goodGuyHealth.value = player.health;
    goodGuyHealth.max = Math.max(player.health,startingGoodHealth);
    //This part sets up the battle text to fade in and out.
    attackResultDisplayBad.innerText = attackResultBad;
    setTimeout(function(){attackResultDisplayBad.classList.toggle('fade')},1000);
    attackResultDisplayGood.innerText = attackResultGood;
    setTimeout(function(){attackResultDisplayGood.classList.toggle('fade')},1000);
    battleLog.innerText = newBattleText
   //update bad guy sprite
    badGuySprite.style.backgroundImage = currentBadSpriteLoc;
    badGuySprite.style.backgroundSize = currentBadSpriteSize; 
    badGuySprite.style.backgroundPosition = currentBadSpritePos;
    //update good guy sprite
    goodGuySprite.style.backgroundImage = player.imgLoc;
    goodGuySprite.style.backgroundSize = player.imgSize; 
    goodGuySprite.style.backgroundPosition = player.imgPos;
    //Update the button text for player damage (changes due to mutations)
    meleeButton.innerText = `Melee Attack \nPower: ${player.meleeDmg}`;
    rangedButton.innerText = `Ranged Attack \nPower: ${player.rangedDmg}`;
    spellButton.innerText = `Spell Attack \nPower: ${player.magic}`;
    chooseMutationModal.style.display = mutationModalStatus;
    choosePreyModal.style.display = preyModalStatus;
}
//This handles the main actions that the player takes
function handleClick(e) {
    if (e.target.tagName === "BUTTON") {
          if (e.target.className === "meleeButton") {doAttack(player.meleeDmg,1);}
          if (e.target.className === "rangedButton") {doAttack(player.rangedDmg,1);}
          if (e.target.className === "spellButton") {doAttack(player.magic, 0);}
          if (e.target.className === "runButton") {doRun(player.speed);}
            e.target.disabled=true;
    setTimeout(function(){e.target.disabled=false;},pauseInterval)
    }
};
//reset function on the nav bar
function handleNav(e) {
    if (e.target.innerText === "Play/Reset") {
        if (confirm('Are you sure? ')) {
            resetGame();
        } else {
        }
    }
}
function resetGame(e) {
    init()
}
//make an attack roll, check to see if it hits, if it does, then roll damage in a sperate function.  4 result (crit, hit/player block, both hit, player only hit)
function doAttack(e, f) {
    const dieRoll = Math.random();
    if (dieRoll >.8) {
        attackResultGood = "Critical!!";
        damageBadGuy(2*e, e, f,"player")
    } else if (dieRoll > .3) {
        attackResultGood = "Hit!";
         damageBadGuy(e,.5*e, f,"player")
    } else if (dieRoll >.15) {
        attackResultGood = "Glance!";
        damageBadGuy(.5*e,0, f,"player");
    } else {
        attackResultGood = "I miss!!";
        damageBadGuy(0, 0, f,"player");
    }
}
// This deals damage to the bad guy.  e and f are high and low damage numbers coming into the formula.  g is a value 1 or 0 based on if it's a melee/ranged or spell attack which ignores armor.  h is set based off of if the enemy had already taken an action.
function damageBadGuy(e, f, g, h) {
    newBadHealth = Math.floor(badGuy.health - Math.max(((Math.random() * e + f)-badGuy.armor*g),0));
    newBattleText = `You deal ${badGuy.health-newBadHealth} damage!`
    badGuy.health = newBadHealth
    render()
    if (h==="player"){
        if(badGuy.health <= 0) {
            doBadGuyDies()} 
            else {doBadGuyAction()
            }
        } else if (h==="run"){
            if(badGuy.health <= 0) {
                doBadGuyDies()} else {
                render() }
        }
}
//This checks to see what the enemy does for it's action, and routes the actions.
function doBadGuyAction(e) {
    if (badGuy.action === "run") {
        battleLog.innerText = "Your prey tries to run!"
        render()
        doEnemyRan()
    }
    //Melee Attack note the ,1 or ,0 is to ignore armor (by multiplying by 0 in the damage formula) if it's a magic attack)
    if (badGuy.action === "meleeAttack") {doBadGuyAttack(badGuy.meleeDmg,1)}
    //Ranged Attack
    if (badGuy.action === 'rangedAttack') {doBadGuyAttack(badGuy.rangedDmg,1)}
    //Spell Attack
    if (badGuy.action === 'spellAttack') {doBadGuyAttack(badGuy.magic,0)}
}
//This function actually randomly checks to see if the enemy hits, and the degree of the hit, then passes them into damage.
function doBadGuyAttack(e, f) {
    const dieRoll = Math.random();
    if (dieRoll >.9) {
            attackResultBad = "Crit!!!";
            damagePlayer(2*e, e,f);
        } else if (dieRoll > .4) {
            attackResultBad = "Hit";
            damagePlayer(1*e,e*.25,f);
        } else if (dieRoll >.2) {
            attackResultBad = "Glancing Hit!";
            damagePlayer(.5*e,0,f);
        } else {
            attackResultBad = "miss";
            damagePlayer(0*badGuy.meleeDmg,0,f);
        }
}
//This function sets the damage that the player will take and either sends them to the death function, or back to render.
function damagePlayer(e, f, g) {
    newGoodHealth = Math.floor(goodGuyHealth.value - Math.max(((Math.random() * e + f)-player.armor*g),0));
    player.health = newGoodHealth
    if(player.health<=0) {doPlayerDies()} else {render()}
}
//This function checks speeds and does damage to fleeing enemies if they are caught.  More speed = a higher chance of success, but it CAN always go the other way.
function doEnemyRan(e) {
    const playerSpeed = Math.random()*player.speed
    const badSpeed = Math.random()*badGuy.speed
    const dmgTaken = Math.max(player.meleeDmg,player.rangedDmg,player.magic)
    if (playerSpeed > .25+badSpeed && Math.floor(Math.random()*dmgTaken*2+dmgTaken) >= badGuy.health){
            newBattleText = "Your prey failed to escape. You consumed them!"
            render()
            doBadGuyDies()}
    else {doEnemyGetsAway()}
};
//if the enemy gets away display new battle text, and send to get new prey.  No upgrades as enemy wasn't consumed.  Enemy model disappears, room for a new gif here.
function doEnemyGetsAway() {
    newBattleText = "They got away!"   
    currentBadSpriteLoc = "";
    currentBadSpriteSize = "";
    currentBadSpritePos = "";
    render()
    getPrey()
};
//This function controlls if the player gets away.
function doRun(e) {
    if (badGuy.action === "run") {
        newBattleText = "You get away!"
        render()
        setTimeout(function() {getPrey()},pauseInterval)
    } else {
            const playerSpeed = Math.random()*player.speed
            const badSpeed = Math.random()*badGuy.speed
         if (playerSpeed > badSpeed) {
            newBattleText = "You get away!"
            render()
            setTimeout(function() {getPrey()},pauseInterval)
        } else {
            newBattleText = "You fail to get away!"
            render()
            setTimeout(function() {doBadGuyAction()},pauseInterval)
        }
    }
}
//If the bad guy dies, it updates the current sprite for the length of 1 poof animation, and checks to see if you won the game.  It then moves forward.
function doBadGuyDies() {
    currentBadSpriteLoc = "url(imgs/poof.gif)";
    currentBadSpriteSize = "contain"; 
    currentBadSpritePos = "center";
    render();
    setTimeout(function(){currentBadSpriteLoc = "";render()},1600)
    if (badGuy.name === "DireBear") {setTimeout(function() {doWinGame()},pauseInterval)}
        else {
        setTimeout(function() {getUpgrades()},pauseInterval)  
        }
}
//This function begins the upgrade and mutation process.  Options are based off of the stats that the monster possesses.  We then push that info over the the cuntion that actually makes these boxes appear.
function getUpgrades() {
    const availableChoices = [];
    badGuy.health=startingBadHealth; //We reset the enemy's health as it dies so that health is generated in the list of options.
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
    createUpgradeBoxes(availableChoices);
}
//This function makes the upgrades which we sorted and chose in getUpgrades() actually appear in the mutation modal box, and sets that box to visible.
function createUpgradeBoxes(e) {
    mutationSelect1.innerText = e[0]
    mutationSelect2.innerText = e[1]
    mutationSelect3.innerText = e[2]
    preyModalStatus = "none";
    mutationModalStatus= "block";
    render()
}
//This function allows you to actually choose from the options presented to you for a mutation.  It then randomly applies an upgrade based off of the stat value that the enemy had.
function handleMutationModalClick(e) {
    if (e.target.tagName === "BUTTON") {
        const selection = e.target.innerText
        if (selection === 'health') {
            player.health += Math.floor((goodGuyHealth.max-goodGuyHealth.value)*.8)
            player[selection] += Math.max(Math.floor(badGuy[selection]*(Math.random()*.5+.5)),1)
            player.level += .05
        } else {
            player.health += Math.floor((goodGuyHealth.max-goodGuyHealth.value)*.4)
            player[selection] += Math.max(Math.floor(badGuy[selection]*(Math.random()*.75+.25)),1) 
            player.level += .1   
        }
        mutationModalStatus = "none";
        getPrey()
    }   
}
//This function checks for monsters that are within the player's level range and pushes them to the buttons.
function getPrey(e) {
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
//This function actually causes the boxes to show up.  It was split up this way because there is a possibility that the createPreyBoxes and createUpgradeBoxes could be collapsed into 1.
function createPreyBoxes(e) {
    preySelect1.innerText = e[0].name
    preySelect2.innerText = e[1].name
    preySelect3.innerText = e[2].name
    mutationModalStatus = "none";
    preyModalStatus = "block";
    render()
}
//This function handles the actual choice from the prey options.  It also allows for a chance that instead a higher level predator appears.
function handlePreyModalClick(e) {
    if (e.target.tagName === "BUTTON") {
        let monsterHolder;
        const currentMonsterName = e.target.innerText
        if (Math.random() > .2) {
            monsterHolder = Monster.allInstances.filter(function(e){
                return e.name === currentMonsterName})
            nextMonster = monsterHolder[0]
        } else {
            let newPredator = Monster.allInstances.filter(function(e){
                return (e.level <= player.level + 1.5 &&  e.level >= player.level && e.action !== "run") || (e.level <= player.level + 1.5 &&  e.level >= 4 && e.action !== "run")
                })
                nextMonster = newPredator[Math.floor(Math.random()*newPredator.length)]
            //This grabs up an array of all the monsters, then randomly picks one that is up to 2 levels higher than the player, and doesn't run.
            }
        badGuy.health = startingBadHealth //set the health of the old monster to it's previous starting health
        badGuy = nextMonster
        startingBadHealth = badGuy.health
        newBattleText = `A wild ${badGuy.name} appears!`
        preyModalStatus = "none";
        currentBadSpriteLoc = badGuy.imgLoc;
        currentBadSpriteSize = badGuy.imgSize; 
        currentBadSpritePos = badGuy.imgPos;
        render()
    }
}
//This function shows information regarding health levels.  This is important because it can fluctuate wildly as health is gained and lost throughout combat.
function handleHealthMeter(e) {
    newBattleText = `Current HP: ${e.target.value} / ${e.target.max}.`
    render()
}
//This function is the holy grail which one seeks!!!
function doWinGame() {
    newBattleText = "You have become the apex predator!  Congratulations!"
    render()
}
//In the event of the player's untimely end... this function makes them go poof, and gives them a heartfelt message.
function doPlayerDies(){
    player.imgLoc = "url(imgs/poof.gif)";
    player.imgSize = "contain";
    player.imgPos = "center";
    newBattleText = "You have died... better luck next time!"
    render()
}