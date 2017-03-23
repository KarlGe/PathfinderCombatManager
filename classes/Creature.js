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
module.exports = Creature;