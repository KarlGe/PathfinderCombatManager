function Armor(name, cost, acBonus, maxDex, acPenalty, arcaneFailure, speed, weight){
    this.name = name;
    this.cost = cost;
    this.acBonus = acBonus;
    this.maxDex = maxDex;
    this.acPenalty = acPenalty;
    this.arcaneFailure = arcaneFailure;
    this.weight = weight;
}
module.exports = {
    Armor : Armor
}