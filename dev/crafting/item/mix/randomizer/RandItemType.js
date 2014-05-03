function RandItemType(props) {
    if (props.hasOwnProperty('bonusDist') && props.hasOwnProperty('dist')) {
        console.error('RandItemType must not have both bonus and dist');
        return false;
    }

    this.type = props.type;
    this.text = props.text;
    this.bonusDist = props.bonusDist || null;
    this.dist = props.dist || null;
}

RandItemType.pre = function(props) {
    props.type = RANDITEM_TYPE_PREFIX;
    return new RandItemType(props);
};

RandItemType.suf = function(props) {
    props.type = RANDITEM_TYPE_SUFFIX;
    return new RandItemType(props);
};

RandItemType.prototype.commit = function(RItem) {
    var sd = RItem.statData;
    var stat;
    if (this.bonusDist !== null) {
        RItem.hasBonus = true;
        for (stat in this.bonusDist) {
            if (this.bonusDist.hasOwnProperty(stat))
                sd.bonusDist[stat] = this.bonusDist[stat];
        }
    }
    else if (this.dist !== null) {
        for (stat in this.dist) {
            if (this.dist.hasOwnProperty(stat))
                sd.dist[stat] = this.dist[stat];
        }
    }
};