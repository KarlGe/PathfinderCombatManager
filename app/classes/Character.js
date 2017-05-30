function Character(name, isEnemy, maxHP, size, armorBonus, miscACBonus, baseAttack, strength, dexterity, constitution, intelligence, wisdom, charisma, initiative, speed, saveReflex, saveConstitution, saveWill, meleeWeapons, rangedWeapons, statusEffects){
    this.name = name;
    this.isEnemy = isEnemy;
    this.maxHP = maxHP;
    this.size = size;
    this.currentHP = maxHP;
    this.armorBonus = armorBonus;
    this.miscACBonus = miscACBonus;
    this.AC = 10 + CalculateStatBonus(dexterity) + armorBonus + miscACBonus;
    this.ACTouch = 10 + CalculateStatBonus(dexterity) + miscACBonus;
    this.ACFlatFoot = 10 + armorBonus + miscACBonus;
    this.baseAttack = baseAttack;
    this.strength = strength;
    this.dexterity = dexterity;
    this.constitution = constitution;
    this.intelligence = intelligence;
    this.wisdom = wisdom;
    this.charisma = charisma;
    this.initiative = initiative;
    this.initiativeRoll = 0;
    this.initiativeOrder = 0;
    this.speed = speed;
    this.saveReflex = saveReflex;
    this.saveConstitution = saveConstitution;
    this.saveWill = saveWill;
    this.CMB = baseAttack + CalculateStatBonus(strength);
    this.CMD =  CalculateCMD(baseAttack, strength, dexterity, size);
    this.meleeWeapons = meleeWeapons;
    this.rangedWeapons = rangedWeapons;
    this.statusEffects = statusEffects;
}
function CalculateStatBonus(statScore){
    return Math.floor((statScore - 10) / 2);
}
function CalculateCMD(baseAttack, strength, dexterity, size){
    var CMD = 10 + CalculateStatBonus(strength) + CalculateStatBonus(dexterity);
    var sizeMod = 0;
    switch(size){
        case "Fine":
            sizeMod = -8;
            break;
        case "Dimunitive":
            sizeMod = -4;
            break;
        case "Tiny":
            sizeMod = -2;
            break;
        case "Small":
            sizeMod = -1;
            break;
        case "Medium":
            sizeMod = 0;
            break;
        case "Large":
            sizeMod = +1;
            break;
        case "Huge":
            sizeMod = +2;
            break;
        case "Gargantuan":
            sizeMod = +4;
            break;
        case "Colossal":
            sizeMod = +8;
            break;
    }
    return CMD + sizeMod;
}
module.exports = {
    Character,
    CalculateStatBonus
}