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
module.exports = Weapon;