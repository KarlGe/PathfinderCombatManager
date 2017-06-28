"use strict"
var Classes = require("../classes");
var Datastore = require('nedb'), db = {};
class DatabaseHandler{
    constructor(){
        db.character = new Datastore({ filename: 'app/db/character.db', autoload: true });
        db.statusEffect = new Datastore({ filename: 'app/db/statusEffect.db', autoload: true });
        db.weapon = new Datastore({ filename: 'app/db/weapon.db', autoload: true });
    }
    PopulateAvailableCharacters(callback){
        var self = this;
        var availableCharacters = [];
        db.character.find({}, function (err, docs) {
            $.each(docs, function(index, character){
                availableCharacters.push(self.CreateCharacterFromDB(character));
            })
            callback(availableCharacters);
        });
    }
    CreateCharacterFromDB(character){
        var newCharacter = new Classes.Character(
            character["name"],
            character["isEnemy"],
            character["sizeIndex"],
            character["initiative"],
            character["armorBonus"],
            character["miscACBonus"],
            character["maxHP"],
            character["saveFortitude"],
            character["saveReflex"],
            character["saveWill"],
            character["speed"],
            character["strength"],
            character["dexterity"],
            character["constitution"],
            character["intelligence"],
            character["wisdom"],
            character["charisma"],
            character["baseAttack"],
            character["miscCMBBonus"],
            character["miscCMDBonus"],
            character["meleeWeapons"],
            character["rangedWeapons"],
            character["statusEffects"]
        );
        return newCharacter;
    }    
}

module.exports = DatabaseHandler;
