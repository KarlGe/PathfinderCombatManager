class Size{
    constructor(sizeName, sizeMod){
        this.sizeName = sizeName;
        this.sizeMod = sizeMod;
    }
}
var sizes =[
    new Size("Fine", -8),
    new Size("Dimunitive", -4),
    new Size("Tiny", -2),
    new Size("Small", -1),
    new Size("Medium", 0),
    new Size("Large", +1),
    new Size("Huge", +2),
    new Size("Gargantuan", +4),
    new Size("Colossal", +8)
]
module.exports = sizes;