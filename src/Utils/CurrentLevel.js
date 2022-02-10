const getCurrentLevelExp = (user, ranks) => {
    let _ranks = [...ranks];
    if (user?.exp === 0) return ranks[0]?.exp;
    else if (user?.exp >= ranks[ranks.length - 1]?.exp)
        return ranks[ranks.length - 1]?.exp;
    else {
        const currentLevelExp = _ranks.sort(
            (a, b) =>
                Math.abs(user?.exp > a?.exp) - Math.abs(user?.exp > b?.exp)
        );
        if (currentLevelExp[0]?.exp === user?.exp && user?.exp > 0)
            return currentLevelExp[1]?.exp;
        else return currentLevelExp[0]?.exp;
    }
};

const getCurrentLevel = (user, ranks) => {
    let _ranks = [...ranks];

    if (user?.exp < ranks[1]?.exp) return ranks[0]?.title;
    else if (user?.exp >= ranks[ranks.length - 1]?.exp)
        return ranks[ranks.length - 1]?.title;
    else {
        let currentLevel = _ranks.sort(
            (a, b) =>
                Math.abs(user?.exp < a?.exp) - Math.abs(user?.exp >= b?.exp)
        );
        return currentLevel[0]?.title;
    }
};

const getCurrentLevelNo = (user, ranks) => {
    let title = getCurrentLevel(user, ranks);
    return title ? title.toLowerCase().replace("level", "").trim() : "";
};

const getCurrentMultiplier = (user, ranks) => {
    if (ranks.length > 0) {
        if (user?.exp === 0)
            return (ranks[0]?.multiplier * 100)?.toFixed(0) || 0;
        else if (user?.exp >= ranks[ranks.length - 1]?.exp)
            return (ranks[ranks.length - 1]?.multiplier * 100)?.toFixed(0) || 0;
        else {
            let _ranks = [...ranks];
            let currentLevel = _ranks.sort(
                (a, b) =>
                    Math.abs(user?.exp < a?.exp) - Math.abs(user?.exp >= b?.exp)
            );
            return (currentLevel?.[0]?.multiplier * 100)?.toFixed(0);
        }
    } else return 0;
};

const getLevelProgress = (user, ranks) => {
    let _ranks = [...ranks];
    if (user?.exp === 0) return 0;
    else if (user?.exp >= ranks[ranks.length - 1]?.exp) return 100;
    else {
        const currentLevelProgress = _ranks.sort(
            (a, b) =>
                Math.abs(user?.exp > a?.exp) - Math.abs(user?.exp > b?.exp)
        );
        if (currentLevelProgress[0]?.exp === user?.exp && user?.exp > 0)
            return parseFloat(
                Math.abs(
                    (user?.exp / currentLevelProgress[1]?.exp) * 100
                ).toFixed(1)
            );
        else
            return parseFloat(
                Math.abs(
                    (user?.exp / currentLevelProgress[0]?.exp) * 100
                ).toFixed(1)
            );
    }
};

export {
    getCurrentLevel,
    getCurrentLevelNo,
    getCurrentMultiplier,
    getLevelProgress,
    getCurrentLevelExp,
};
