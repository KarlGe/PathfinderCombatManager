//A status effect is a colleciton of Effects that are applied at the same time, for example Frightened
function StatusEffect(name, description, effect, duration){
    this.name = name;
    this.description = description;
    this.effect = effect;
    this.duration = duration;
}
//An effect is a change to one value of a character, for example -2 to attack rolls.
function Effect(affects, value){
    this.affects;
    this.value;
}
module.exports = {
    StatusEffect,
    Effect
}