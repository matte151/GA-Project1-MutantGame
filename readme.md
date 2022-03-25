Project 1 Mutant Spawnling Game
Begin your life as a little mutant spawnling. Find prey to consume in order to build your strength, until you are ready to become the Alpha Predator!

Authors
@MattEdwards
Demo
https://matte151.github.io/project1/

FAQ
I selected a Rabbit, but a huge wolf came out to eat me, is this bugged?
No, it says that you need to be careful because sometimes YOU might be the prey, that wolf is trying to get a tasty meal, ya better run, or boop him on the nose!

What does magic damage do?
It bypasses armor, but it's very hard to get. Only a few monsters have magic damage.

Are there bugs I should be aware of?
NOOOOO Silly!!! Those aren't bugs, they're features. Our design crew (myself) has been tirelessly (except for when I get tired and sleep) working to provide the most fun in our games! We want to give you the most! And that means that we(I) don't REMOVE the bugs that you might otherwise enjoy! I leave those in, and don't judge what you're into!

Are there any important code bits you're proud of?
SURE! This code below is nice because the combination of the class, and then the way that the choosing feature for the next monster works means that new monsters can be added simply by adding the 1 line that starts off "let monsterDireBear..." and an image.

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
    let monsterDireBear = new Monster("DireBear",250,40,0,10,3,0,6,"url(imgs/direBear.png)","contain","-center","meleeAttack");

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
Roadmap
Additional browser and device support

Add more mutation options for the player.

Increase the bio-diversity of enemies.

Screenshots
App Screenshot

App Screenshot

App Screenshot

Support
For support, open the code, and make it better. Don't email.

Used By
This project is used by:

General Assembly
Matt Edwards
Matt Edwards' Mother (screen grabs make a great fridge magnet!)
Tech Stack
Client: HTML, CSS, Javascript

Server: github
