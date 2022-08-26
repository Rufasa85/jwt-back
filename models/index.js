const Icon = require("./Icon");
const User = require("./User");
const Pixel = require("./Pixel");

User.hasMany(Icon);
Icon.belongsTo(User);

Icon.hasMany(Pixel);
Pixel.belongsTo(Icon);

module.exports = {User,Icon,Pixel}