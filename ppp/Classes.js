function Armor(name, cost, acBonus, maxDex, acPenalty, arcaneFailure, speed, weight){
    this.name = name;
    this.cost = cost;
    this.acBonus = acBonus;
    this.maxDex = maxDex;
    this.acPenalty = acPenalty;
    this.arcaneFailure = arcaneFailure;
    this.weight = weight;
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
    Armor : Armor,
    Weapon : Weapon
}