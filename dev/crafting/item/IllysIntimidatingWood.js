var mixins = [
    MixItemUsable,
    MixItemEquippable,
    MixItemWeapon
];

// TO DO:
//  Enchantments: Poison, Speed (? maybe covered by dex)
var ItemIllysIntimidatingWood = Item.create({
    id: 3,
    name: 'Illy\'s Intimidating Wood',
    flavor: 'Illy was a successful lizard banker until the allure of his mighty wood turned him into a gibbering idiot.',
    quality: QUALITY_LEGENDARY,
    requirements: {
        level: 10
    },
    ilvl: 75,
    statDist: {
        magicFind: 0.25,
        str: 0.75,
        dex: 0.75,
        int: -0.25,
        wis: -0.25
    },
    randomizer: {
        profile: Types.generic.profile
    },
    useCooldown: 5
}, mixins);

ItemPotion.prototype.useItem = function() {
    console.log('Restored 10 hp!');
    return true;
};

//module.exports = ItemRoot;