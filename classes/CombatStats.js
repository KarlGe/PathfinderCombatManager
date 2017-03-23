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
module.exports = CombatStats;