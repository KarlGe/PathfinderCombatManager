var size = require("./Size.js");
class Character{
    constructor(name = "", isEnemy = true, sizeIndex = 4, initiative = 0, armorBonus = 0, miscACBonus = 0, maxHP = 0, saveFortitude = 0, saveReflex = 0, saveWill = 0, speed = 0, strength = 0, dexterity = 0, constitution = 0, intelligence = 0, wisdom = 0, charisma = 0, baseAttack = 0, miscCMBBonus = 0, miscCMDBonus = 0, meleeWeapons = null, rangedWeapons = null, statusEffects = null){
        this.name = name;
        this.sizeIndex = parseInt(sizeIndex);
        this.isEnemy = isEnemy;
        this.initiative = parseInt(initiative);
        this.initiativeRoll = 0;
        this.initiativeOrder = 0;
        this.armorBonus = parseInt(armorBonus);
        this.miscACBonus = parseInt(miscACBonus);
        this.AC = 10 + parseInt(armorBonus) + parseInt(miscACBonus) + Character.CalculateStatBonus(dexterity) + (size[this.sizeIndex].sizeMod * -1);
        this.ACTouch = this.AC - parseInt(armorBonus);
        this.ACFlatFoot = this.AC - Character.CalculateStatBonus(dexterity);
        this.maxHP = parseInt(maxHP);
        this.currentHP = this.maxHP;
        this.saveReflex = parseInt(saveReflex);
        this.saveFortitude = parseInt(saveFortitude);
        this.saveWill = parseInt(saveWill);
        this.strength = parseInt(strength);
        this.speed = parseInt(speed);
        this.dexterity = parseInt(dexterity);
        this.constitution = parseInt(constitution);
        this.intelligence = parseInt(intelligence);
        this.wisdom = parseInt(wisdom);
        this.charisma = parseInt(charisma);
        this.CMB = parseInt(baseAttack) + Character.CalculateStatBonus(strength) + size[this.sizeIndex].sizeMod + parseInt(miscCMBBonus);
        this.CMD = 10 + parseInt(baseAttack) +  Character.CalculateStatBonus(strength) + Character.CalculateStatBonus(dexterity) + size[this.sizeIndex].sizeMod + parseInt(miscCMDBonus);
        this.baseAttack = parseInt(baseAttack);
        this.meleeWeapons = meleeWeapons;
        this.rangedWeapons = rangedWeapons;
        this.statusEffects = statusEffects;
    }
    static CalculateStatBonus(statScore){
        return Math.floor((parseInt(statScore) - 10) / 2);
    }
}
module.exports = Character