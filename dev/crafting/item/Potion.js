var mixins = [
    MixItemIngredient,
    MixItemUsable,
    MixItemEquippable,
    MixItemRandomizer
];

var ItemPotion = Item.create({
    id: 2,
    name: 'Potion',
    ilvl: 25,
    quality: QUALITY_UNCOMMON,
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