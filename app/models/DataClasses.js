function AbilityScores(strength, dexterity, constitution, intelligence, wisdom, charisma){
    this.strength = strength; 
    this.dexterity = dexterity; 
    this.constitution = constitution;
    this.intelligence = intelligence; 
    this.wisdom = wisdom; 
    this.charisma = charisma;
}
function Armor(name, cost, acBonus, maxDex, acPenalty, arcaneFailure, speed, weight){
    this.name = name;
    this.cost = cost;
    this.acBonus = acBonus;
    this.maxDex = maxDex;
    this.acPenalty = acPenalty;
    this.arcaneFailure = arcaneFailure;
    this.weight = weight;
}
function CombatStats(initiative, ac, touchAC, flatFootAC, bab, cmb, cmd, hp, fort, ref, will){
    this.initiative = initiative;
    this.ac = ac;
    this.touchAC = touchAC;
    this.flatFootAC = flatFootAC;
    this.bab = bab;
    this.cmb = cmb;
    this.cmd = cmd;
    this.hp = hp;
    this.fort = fort;
    this.ref = ref;
    this.will = will;
}
function Creature(name, race, size, creatureClass, creatureType, xpValue, challengeRating, speed, combatStats, equipment, abilityScores, feats, skills, languages){
    this.name = name;
    this.race = race;
    this.creatureClass = creatureClass;
    this.creatureType = creatureType;
    this.xpValue = xpValue;
    this.challengeRating = challengeRating;
    this.speed = speed;
    this.combatStats = combatStats;
    this.equipment = equipment;
    this.abilityScores = abilityScores;
    this.feats = feats;
    this.skills = skills;
    this.languages = languages;
}
function Equipment(meleeWeapons, rangedWeapons, armor, potions, scrolls, magicItems){
    this.meleeWeapons = meleeWeapons;
    this.rangedWeapons = rangedWeapons;
    this.armor = armor;
    this.potions = potions;
    this.scrolls = scrolls;
    this.magicItems = magicItems;
}
function Feat(name, description, prerequisites, benefit){
    this.name = name;
    this.description = description;
    this.prerequisites = prerequisites;
    this.benefit = benefit;
}
function Weapon(name, cost, dmgS, dmgM, critical, range, weight, type){
    this.name = name;
    this.cost = cost;
    this.dmgM = dmgM;
    this.dmgS = dmgS;
    this.critical = critical;
    this.range = range;
    this.weight = weight;
    this.type = type;
}
module.exports = {
    AbilityScores : AbilityScores,
    Armor : Armor,
    CombatStats : CombatStats,
    Creature : Creature,
    Equipment : Equipment,
    Feat : Feat,
    Weapon : Weapon
}