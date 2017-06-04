class Weapon{
    constructor(name, dmgSmall, dmgMedium, dmgLarge, dmgBonus, attackBonus, critical, range, ranged, type){
        this.name = name;
        this.dmgSmall = dmgSmall;
        this.dmgMedium = dmgMedium;
        this.dmgLarge = dmgLarge;
        this.dmgBonus = dmgBonus;
        this.attackBonus = attackBonus;
        this.critical = critical;
        this.range = range;
        this.type = type;
    }
}
module.exports = Weapon;