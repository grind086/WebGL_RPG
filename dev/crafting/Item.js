var guid = 0;

function Item(props) {
    // Prevent changes to the ids and ilvl of the item
    var id = props.id;
    this.__defineGetter__("id", function() {
        return id;
    });

    var uid = guid++;
    this.__defineGetter__("uid", function() {
        return uid;
    });

    var ilvl;
    this.__defineGetter__("ilvl", function() {
        return ilvl;
    });

    this.requirements = props.requirements || {};
    this.requirements = {
        level: this.requirements.level || 0
    };

    ilvl = props.ilvl || Math.round(this.requirements.level * ILVL_PER_LEVEL);

    this.name = props.name || 'Unknown Item';
    this.flavor = props.flavor || null;
    this.quality = props.quality || QUALITY_TRASH;

    // Global item properties
    this.isIngredient = false;
    this.isEquippable = false;
    this.isUsable = false;
    this.isArmor = false;
    this.isWeapon = false;

    this.hasBonus = false;

    this.statData = {
        base: {},
        dist: props.statDist || {},
        bonus: {},
        bonusDist: {},
        calcs: [this.calcStatsCommon]
    };

    this.stats = {
        goldFind: 0,
        magicFind: 0
    };

    // Setup mixins
    var mixins, i;

    this.data_ = {};
    if (this.constructor.mixins !== undefined) {
        mixins = this.constructor.mixins;

        // Allow mixins to set up default properties
        for (i = 0; i < mixins.length; i++) {
            mixins[i].meta.ctor.call(this, props);
        }

        // Allow mixins to set do startup
        for (i = 0; i < mixins.length; i++) {
            if (mixins[i].meta.hasOwnProperty('init'))
                mixins[i].meta.init.call(this, props);
        }
    }
    delete this.data_;

    this.calcStats();

    // Add requirements preventing non-positive player stats
    for (var stat in this.stats) {
        if (this.stats.hasOwnProperty(stat) && this.stats[stat] < 0) {
            this.requirements[stat] = -1 * this.stats[stat] + 1;
        }
    }
}

Item.prototype.getEffectiveIlvl = function() {
    var qualityBonus;
    switch (this.quality) {
        case QUALITY_TRASH:
            qualityBonus = -1; break;
        case QUALITY_COMMON:
            qualityBonus = 0; break;
        case QUALITY_UNCOMMON:
            qualityBonus = 0.333; break;
        case QUALITY_RARE:
            qualityBonus = 0.666; break;
        case QUALITY_EPIC:
            qualityBonus = 1; break;
        case QUALITY_LEGENDARY:
            qualityBonus = 2.75; break;
    }

    return this.ilvl + ILVL_TIER_SIZE * qualityBonus;
};

Item.prototype.getStat = function (stat) {
    return (this.statData.base[stat] || 0) + (this.statData.bonus[stat] || 0);
};

Item.prototype.calcStats = function() {
    for (var i = 0; i < this.statData.calcs.length; i++) {
        if (this.hasBonus) {
            this.calcStatsMerge(
                this.statData.calcs[i](this.getEffectiveIlvl() - ILVL_TIER_SIZE, this.statData.dist),
                this.statData.calcs[i](ILVL_TIER_SIZE, this.statData.bonusDist)
            );
        } else {
            this.calcStatsMerge(
                this.statData.calcs[i](this.getEffectiveIlvl(), this.statData.dist),
                {}
            );
        }
    }

    var stat;
    var stats = {};
    for (stat in this.statData.base) {
        if (this.statData.base.hasOwnProperty(stat)) {
            stats[stat] = this.statData.base[stat];
        }
    }
    for (stat in this.statData.bonus) {
        if (this.statData.bonus.hasOwnProperty(stat)) {
            stats[stat] = (stats[stat] || 0) + this.statData.bonus[stat];
        }
    }
    this.stats = stats;
};

Item.prototype.calcStatsMerge = function(base, bonus) {
    var stat;
    for (stat in base) {
        if (base.hasOwnProperty(stat)) {
            this.statData.base[stat] = (this.statData.base.hasOwnProperty(stat)
                ? this.statData.base[stat] : 0) + base[stat];
        }
    }
    for (stat in bonus) {
        if (bonus.hasOwnProperty(stat)) {
            this.statData.bonus[stat] = (this.statData.bonus.hasOwnProperty(stat)
                ? this.statData.bonus[stat] : 0) + bonus[stat];
        }
    }
};

Item.prototype.calcStatsCommon = function(ilvl, dist) {
    return {
        goldFind: Math.round(ilvl * (dist.goldFind || 0) / STAT_VALUE_GOLDFIND),
        magicFind: Math.round(ilvl * (dist.magicFind || 0) / STAT_VALUE_MAGICFIND)
    };
};

Item.db = {};

Item.create = function(props, mixins) {
    // Check for ID conflicts
    if (!props.id || Item.db.hasOwnProperty(props.id)) {
        console.error('Duplicate or missing item ID: ' + props.id);
        return null;
    }

    // Create standard item
    var SItem = function() {
        Item.call(this, props);
    };
    inherits(SItem, Item);
    SItem.props = props;

    // Add mixins
    for (var i = 0; i < mixins.length; i++) {
        Item.extend(SItem, mixins[i]);
    }

    Item.db[props.id] = SItem;

    return SItem;
};

Item.extend = function(ItemCtor, mixin) {
    for (var prop in mixin) {
        if (mixin.hasOwnProperty(prop) && prop !== 'meta') {
            ItemCtor.prototype[prop] = mixin[prop];
        }
    }

    if (ItemCtor.mixins === undefined) {
        ItemCtor.mixins = [];
    }
    ItemCtor.mixins.push(mixin);
};

//module.exports = Item;