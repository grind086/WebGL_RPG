var mixins = [
    MixItemIngredient
];

var ItemRoot = Item.create({
    id: 1,
    name: 'Root',
    quality: QUALITY_COMMON
}, mixins);

//module.exports = ItemRoot;