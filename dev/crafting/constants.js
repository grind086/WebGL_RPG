// Item constants
STAT_VALUE_STR = 1;
STAT_VALUE_DEX = 1;
STAT_VALUE_INT = 1;
STAT_VALUE_WIS = 1;
STAT_VALUE_GOLDFIND = 7.5;
STAT_VALUE_MAGICFIND = 5;

ILVL_TIER_SIZE = 15;
ILVL_PER_LEVEL = 2.5;

RANDITEM_TYPE_PREFIX = 1;
RANDITEM_TYPE_SUFFIX = 2;

QUALITY_TRASH = 1;
QUALITY_COMMON = 2;
QUALITY_UNCOMMON = 3;
QUALITY_RARE = 4;
QUALITY_EPIC = 5;
QUALITY_LEGENDARY = 6;

COLOR_TRASH = 0xCCCCCC;
COLOR_COMMON = 0xFFFFFF;
COLOR_UNCOMMON = 0x00FF00;
COLOR_RARE = 0x0000FF;
COLOR_EPIC = 0xFF00FF;
COLOR_LEGENDARY = 0xFFAA00;

WEAPON_SWORD = 1;
WEAPON_WAND = 2;
WEAPON_BOW = 3;

var inherits = function(childCtor, parentCtor) {
    // Create a dummy class so we aren't instantiating anything important
    function TempCtor() {}
    // Give the dummy class the prototype of the parent
    TempCtor.prototype = parentCtor.prototype;
    // Instantiate the prototype
    childCtor.prototype = new TempCtor();
    // Set the constructor back to childCtor (would have been parentCtor)
    childCtor.prototype.constructor = childCtor;
    // Provide access to the parent class constructor
    childCtor.prototype.__Super = parentCtor.prototype.constructor;
    childCtor.prototype.__super = parentCtor.prototype;
};