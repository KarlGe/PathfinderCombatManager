// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var DataClasses = require("./models/DataClasses"); 
/*
var Datastore = require('nedb')
  , db = {};
  db.creature = new Datastore({ filename: 'db/creature.db', autoload: true });
  db.feat = new Datastore({ filename: 'db/feat.db', autoload: true });
  db.weapon = new Datastore({ filename: 'db/weapon.db', autoload: true });
  db.armor = new Datastore({ filename: 'db/armor.db', autoload: true });
var improvedInitiative = new DataClasses.Feat("Improved Initiative", "Your quick reflexes allow you to react rapidly to danger.", "","You get a +4 bonus on initiative checks.");
var hideArmor = new DataClasses.Armor("Hide", 15, 4, 4, -3, 20, 25);
var dogSlicer = new DataClasses.Weapon("Dogslicer", 8, "1d4","1d6","19-20/x2","-","1lb.","S");
var goblinCombatStats = new DataClasses.CombatStats(6,16,13,14,1,0,12,6,3,2,-1);
var goblinEquipment = new DataClasses.Equipment([dogSlicer],[],[],[],[],[]);
var goblinAbilityScores = new DataClasses.AbilityScores(11,15, 12, 10, 9, 6);
var goblinFeats = [improvedInitiative];
var goblinSkills = {Ride : 10,Stealth : 10, Swim : 4};
var goblinLanguages = ["Goblin"];  
var goblin = new DataClasses.Creature("Goblin Warrior","Goblin", "Small","Warrior","Humanoid", 100, 0.33, 30, goblinCombatStats, goblinEquipment, goblinAbilityScores, goblinFeats, goblinSkills, goblinLanguages);
db.creature.insert(goblin, function(err, newDoc){

});
db.feat.insert(improvedInitiative, function(err, newDoc){

});
db.weapon.insert(dogSlicer, function(err, newDoc){

});
db.armor.insert(hideArmor, function(err, newDoc){

});
$( "h1" ).hover(function(){
    console.log("Hello");
});
*/