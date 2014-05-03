var p = RANDITEM_TYPE_PREFIX;
var s = RANDITEM_TYPE_SUFFIX;

var Types = {
    generic: {
        prefixes: {
            gold: RandItemType.pre({text: "Explorer's", dist: {goldFind: 1}}),
            str: RandItemType.pre({text: "Barbarian's", dist: {str: 1}}),
            dex: RandItemType.pre({text: "Rogue's", dist: {dex: 1}}),
            int: RandItemType.pre({text: "Wizard's", dist: {int: 1}}),
            wis: RandItemType.pre({text: "Sage's", dist: {wis: 1}}),

            warr: RandItemType.pre({text: "Warrior's", dist: {str: 0.75, dex: 0.25}}),
            hunt: RandItemType.pre({text: "Hunter's", dist: {str: 0.25, dex: 0.75}}),
            mage: RandItemType.pre({text: "Mage's", dist: {int: 0.75, wis: 0.25}}),

            monk: RandItemType.pre({text: "Monk's", dist: {str: 0.5, wis: 0.5}}),
            jest: RandItemType.pre({text: "Jester's", dist: {dex: 0.5, int: 0.5}})
        },
        suffixes: {
            gold: RandItemType.suf({text: "of the Scavenger", bonusDist: {goldFind: 1}}),
            str: RandItemType.suf({text: "of Strength", bonusDist: {str: 1}}),
            dex: RandItemType.suf({text: "of Dexterity", bonusDist: {dex: 1}}),
            int: RandItemType.suf({text: "of Intellect", bonusDist: {int: 1}}),
            wis: RandItemType.suf({text: "of Wisdom", bonusDist: {wis: 1}}),

            monk: RandItemType.suf({text: "of Piety", bonusDist: {str: 0.5, wis: 0.5}})
        }
    }
};

// Create profiles for pre-made typesets
for (var typeSet in Types) {
    if (Types.hasOwnProperty(typeSet)) {
        Types[typeSet].profile = RandItemProfile.fromObject(Types[typeSet]);
    }
}

// module.exports = Types;