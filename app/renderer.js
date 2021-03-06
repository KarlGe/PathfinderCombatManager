// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
"use strict"
var Datastore = require('nedb')
  , db = {};
var Classes = require("./classes");
var Rivets = require("rivets");
var ListJS = require("list.js");
var dbHandler = new Classes.DatabaseHandler();
var sizes = Classes.Size;
var combatInfo = new Classes.CombatInfo(1, null);
var rapier = new Classes.Weapon("Rapier", "1d4", "1d6", "1d8", "0", "0", "18-20/x2", "-", "Piercing")
var meleeWeapons = [];

meleeWeapons.push(rapier);
/*var character = new Classes.Character.Character("Renestrae",false,4,4,5,2,35,5,4,2,30,10,16,12,10,11,14,4,0,0)
character.initiativeRoll = 20;
character.initiativeOrder = 1;
var characters = [character];

db.character.insert(character, function(err, newDoc){

});
*/
var availableCharacters = [];
var characters = [];
var combatView = null;

function Setup(availableCharacters){
  availableCharacters = availableCharacters
  characters = availableCharacters;
  
  combatInfo.currentCharacter = characters[0];
  Rivets.bind($("#combatLogheader"), {combatInfo: combatInfo});
  combatView = Rivets.bind($('.combatParticipant'), {characters: characters});
  sizes = Rivets.bind($(".sizeList option"), {sizes: sizes});
  ActivateEditable();
  
  CreateAvailableCharacterSearchList(availableCharacters);
}
$(function() {
  
  Rivets.binders.setclass = function(el, value) {
    if(value === true){
      $(el).removeClass("hero");
      $(el).addClass("enemy");
    }
    else{
      $(el).removeClass("enemy");
      $(el).addClass("hero");
    }
  }
  Rivets.formatters.roundtotime = function (value) {
    var time = parseInt(value) * 6 - 6;
    var minutes = Math.floor(time / 60);
    var seconds = time - (minutes * 60);
	  return pad(minutes, 2) + ":" + pad(seconds, 2);
  };
  LoadModule($("#AddCharacterWrapper"),"modules/AddCharacter.html", function(){
    LoadModule($("#AddCharacterWrapper .primaryStats"), "modules/PrimaryStats.html", function(){
      BindHiddenStats($("#AddCharacterWrapper"));
    });
  });
  
  $(".primaryStats").each(function(i, obj){
    LoadModule($(this),"modules/PrimaryStats.html", null);
  });
  LoadModule($("#CreateCharacterWrapper"),"modules/CreateCharacter.html", function(){
    //Set the default selected to be the 4th value (Medium);
    $("#sizeSelectList").val(4);
    $('#characterTypeCheckbox').bootstrapToggle({
        on: 'Enemy',
        off: 'Hero'
    });
    $('#CreateCharacter').on("submit",function(e) {
      e.preventDefault(); 
      processForm($(this), e);
    });
  });

  dbHandler.PopulateAvailableCharacters(Setup);
  
  $(document).bind('click', function(e) {
    HidePopups(e); 
  });
  $("#availableCharacters").click(function(e){
    ShowPopup($("#availableCharacters > .list"), e)
  })
  $("#combatLog").on("click", ".removeHP span", function(){
    AddHP(GetCharacterIndex($(this)), $(this).text());
  });
  $("#combatLog").on("click", ".addHP span", function(){
    AddHP(GetCharacterIndex($(this)), $(this).text());
  });
  $("#combatLog").on("click", ".reOrderUp", function(){
    MoveCharacterUp($(this));
  });
  $("#combatLog").on("click", ".reOrderDown", function(){
    MoveCharacterDown($(this));
  });
  $("#btnEndTurn").click(function(){
    EndTurn();
  });
  $("#btnCreateCharacter").click(function(e){
    ShowPopup($('#CreateCharacterFormWrapper'),e);
  });
  $("#CreateCharacterWrapper").on("change", "#dexterityInput input", function(){
    NewCharDEXUpdate($(this).val());
  });
  $("#CreateCharacterWrapper").on("change", "#strengthInput input", function(){
    NewCharSTRUpdate($(this).val());
  });
  $("#CreateCharacterWrapper").on("change", "#baseAttackInput input", function(){
    NewCharBABUpdate($(this).val());
  });
  $("#CreateCharacterWrapper").on("change", ".sizeList", function(){
    NewCharacterSizeUpdate($("option:selected", this).attr("sizeMod"));
  });
  $("#CreateCharacterWrapper").on("change", ".ACContributor", function(){
    NewCharUpdate("#ACTotal", ".ACContributor");
  });
  $("#CreateCharacterWrapper").on("change", ".CMBContributor", function(){
    NewCharUpdate("#CMBTotal", ".CMBContributor", false);
  });
  $("#CreateCharacterWrapper").on("change", ".CMDContributor", function(){
    NewCharUpdate("#CMDTotal", ".CMDContributor");
  });
  BindHiddenStats($("#combatLog"));
});
function BindHiddenStats(element){
  element.on({
      mouseenter: function () {
        $(this).children('.hiddenStat').stop().fadeIn(100);
      },
      mouseleave: function () {
        $(this).children('.hiddenStat').stop().fadeOut(100);
      }
  }, ".hoverable");
}
function LoadModule(element, modulePath, callback){
  element.load(modulePath, callback);
}
function HidePopups(e){
  if($(e.target).closest('.popupWrapper').length) {
  }
  else{
    $(".popupWrapper").hide();
  }
}
function ShowPopup(element,e){
  HidePopups(e);
  element.show();
  e.stopPropagation();
}
function ActivateEditable(){
  $(".participantName h2").editable("destroy");
  $('.participantName h2').editable({
    type: 'text',
    title: 'Enter name'
  }); 
}
function NewCharSTRUpdate(newValue){
  var modifier = Classes.Character.CalculateStatBonus(newValue);
  $("#CMBSTRBonus").text(modifier);
  NewCharUpdate("#CMBTotal", ".CMBContributor", false);
}
function NewCharBABUpdate(newValue){
  $("#CMBBABBonus").text(newValue);
  NewCharUpdate("#CMBTotal", ".CMBContributor", false);
  $("#CMDBABBonus").text(newValue);
  NewCharUpdate("#CMDTotal", ".CMDContributor");
}
function NewCharDEXUpdate(newValue){
  var modifier = Classes.Character.CalculateStatBonus(newValue);
  $("#ACDexBonus").text(modifier);
  NewCharUpdate("#ACTotal", ".ACContributor");
  $("#CMDDEXBonus").text(modifier);
  NewCharUpdate("#CMDTotal", ".CMDContributor");
}
function NewCharacterSizeUpdate(sizeMod){
  var val = parseInt(sizeMod); 
  //We reverse it because characters get negative AC for being larger and positive AC for being smaller. Opposite of how the list is defined
  $("#ACSizeBonus").text(val * -1); 
  NewCharUpdate("#ACTotal", ".ACContributor");
  $("#CMDSizeBonus").text(val);
  NewCharUpdate("#CMDTotal", ".CMDContributor");
  $("#CMBSizeBonus").text(val);
  NewCharUpdate("#CMBTotal", ".CMBContributor", false);
  
}
function NewCharUpdate(fieldToUpdate, updateFrom, useBaseTen = true){
  var total = 0;
  if(useBaseTen){
    total = 10;
  }
  $(updateFrom).each(function(){
    var value = "";
    if($(this).is("input")){
      value = $(this).val();
    }
    else{
      value = $(this).text();
    }
    if(value != ""){
      total += parseInt(value);
    }
  })
  //Assumes there's a hidden input field as a sibling, where the value should be entered as well
  var hiddenSiblingInput = $(fieldToUpdate).siblings("input");
  if(hiddenSiblingInput != undefined){
    $(fieldToUpdate).siblings("input").val(total);
  }
  $(fieldToUpdate).text(total);
}
function CreateAvailableCharacterSearchList(availableCharacters){
  var availableCharactersListOptions = {
    valueNames: ['name', {name: 'characterIndex', attr: 'charIndex'}]
  }
  var availableCharacterNames = availableCharacters.map(function(a) {return {name: a.name, characterIndex: availableCharacters.indexOf(a)};});
  console.log(availableCharacterNames);
  var availableCharacterList = new ListJS('availableCharacters', availableCharactersListOptions, []);
  availableCharacterList.clear();
  availableCharacterList.add(availableCharacterNames);
}
function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}
function MoveCharacterUp(element){
  var index = GetCharacterIndex(element);
  var newIndex = ShiftIndex(index, -1);
  characters.move(index, newIndex);
  ActivateEditable();
  ResetInitiativeOrder();
}
function MoveCharacterDown(element){
  var index = GetCharacterIndex(element);
  var newIndex = ShiftIndex(index, +1);
  characters.move(index, newIndex);
  ActivateEditable();
  ResetInitiativeOrder();
}
function EndRound(){
  combatInfo.currentRound ++;
}
function EndTurn(){
  ShiftCharacters();
  if(combatInfo.currentCharacter.initiativeOrder == characters.length){
    EndRound();
  }
  combatInfo.currentCharacter = characters[0];  
}
function ShiftCharacters(){
  characters.move(0, characters.length-1);
}
function ResetInitiativeOrder(){
  for(var i = 0; i < characters.length; i++){
    characters[i].initiativeOrder = i +1;
  }
}
function AddHP(index, hpToAdd){
  characters[index].currentHP += parseInt(hpToAdd);
}
function GetCharacterIndex(element){
  return parseInt(element.closest('.combatParticipant').attr("characterIndex"));
}
function ShiftIndex(index, shiftAmount){
  var newIndex = parseInt(index) + parseInt(shiftAmount);
  if(newIndex < 0){
    newIndex = characters.length - 1;
  }
  else if (newIndex >= characters.length){
    newIndex = 0;
  }
  return newIndex;
}
Array.prototype.move = function (old_index, new_index) {
    while (old_index < 0) {
        old_index += this.length;
    }
    while (new_index < 0) {
        new_index += this.length;
    }
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};
//Editable success handler
$.fn.editable.defaults.send = 'never';
$.fn.editable.defaults.url = function(response, newValue){
  return null;
}
$.fn.editable.defaults.success = function(response, newValue){
  var valueToChange = $(this).attr("charactervalue");
  var index = GetCharacterIndex($(this));
  characters[index][valueToChange] = newValue;
  ActivateEditable();
}
function processForm(form, e) {
    if (e.preventDefault) e.preventDefault();
    var values = form.serializeArray();
    var result = { };
    jQuery.each( values, function( i, field ) {
      //$( "#results" ).append( field.value + " " );
      console.log(field.name +" = "+ field.value);
      result[this.name] = this.value;
    });
    var character = new Classes.Character(
      result["name"],
      result["isEnemy"] == 'on' ? true : false,
      result["sizeIndex"],
      result["initiative"],
      result["armorBonus"],
      result["miscACBonus"],
      result["hp"],
      result["saveFortitude"],
      result["saveReflex"],
      result["saveWill"],
      result["speed"],
      result["strength"],
      result["dexterity"],
      result["constitution"],
      result["intelligence"],
      result["wisdom"],
      result["charisma"],
      result["baseAttack"],
      result["miscCMBBonus"],
      result["miscCMDBonus"]
    );
    characters.push(character);

    /*var character = new Classes.Character.Character("Renestrae",false,4,4,5,2,35,5,4,2,30,10,16,12,10,11,14,4,0,0)
    character.initiativeRoll = 20;
    character.initiativeOrder = 1;
    var characters = [character];*/

    /* do what you want with the form */

    // You must return false to prevent the default form behavior
    return false;
}


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