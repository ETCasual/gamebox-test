import _ from "lodash";
import LeaderRankIndicator from "Components/Global/LeaderRankIndicator.component";
import { monthYearDict } from "Utils/Enums";
import { defaultUserImage } from "Utils/DefaultImage";

export function getLeaderboardPrizeInfo(
    type,
    id,
    notificationList,
    leaderboardHistory,
    userId
) {
    let _data = [];
    if (leaderboardHistory.length > 0) {
        _data = leaderboardHistory?.filter(
            (e) => e?.cgId === parseInt(id) && e.userId === userId
        );
        const total = _data[0]?.totalTickets;
        const calcTotal =
            _data[0]?.tickets +
            _data[0]?.tickets * _data[0]?.rankMultiplier +
            _data[0]?.tickets * _data[0]?.vipMultiplier;
        const totalDiff = total - calcTotal;

        if (
            type === "prizeTitle" ||
            type === "gameIcon" ||
            type === "gameTitle"
        ) {
            return getNotificationInfo(
                type,
                _data[0]?.cgId,
                _data[0]?.createdOn,
                notificationList
            );
        } else if (type === "levelMultiplier") {
            return total !== calcTotal
                ? _data[0]?.tickets * _data[0]?.rankMultiplier + totalDiff
                : Math.floor(_data[0]?.tickets * _data[0]?.rankMultiplier);
        } else if (type === "vipMultiplier")
            return Math.ceil(_data[0]?.tickets * _data[0]?.vipMultiplier);
        else if (type === "exp") return _data[0]?.rewardExp;
        else if (type === "timeStamp") return _data[0]?.createdOn;
    }
}
function getNotificationInfo(type, cgId, createdOn, notificationList) {
    const infolist = [...notificationList];
    let currentMonthYear = `${
        monthYearDict[new Date(createdOn * 1000).getMonth()]
    } ${new Date(createdOn * 1000).getFullYear()}`;

    let monthYearIdx = infolist.findIndex(
        (e) => e.monthYear === currentMonthYear
    );
    let currentItem = infolist[monthYearIdx]?.list.filter(
        (e) => e.type === "tour"
    );
    if (monthYearIdx > -1) {
        for (let i = 0; i < currentItem.length; i++) {
            if (currentItem[i]?.cgId === cgId) {
                if (type === "prizeTitle") return currentItem[i]?.title;
                else if (type === "gameIcon") return currentItem[i]?.picture;
                else if (type === "gameTitle")
                    return currentItem[i]?.description;
            }
        }
    }
}

// LEADERBOARD HISTORY LIST
export function getLeaderboardList(
    id,
    leaderboardHistoryData,
    leaderRuleRanks,
    userId
) {
    let _leaderboardHistory,
        _data = [];

    let rankLength = _.maxBy(leaderRuleRanks, "rankTo")?.rankTo;

    _leaderboardHistory = leaderboardHistoryData.filter(
        (e) => e.cgId === parseInt(id)
    );
    for (let x = 0; x < rankLength; x++) {
        _data.push(
            <div
                key={`leaderboard-${x}`}
                className={`col-12 px-2 leaderboard-player-card mb-2 d-flex align-items-center justify-content-between ${
                    _leaderboardHistory[x]?.userId === userId
                        ? "current-user"
                        : ""
                }`}
            >
                {/* USER INFO */}
                <div className="user-info d-flex align-items-center">
                    {/* RANK INDICATOR & AVATAR */}
                    <div className="rank-and-avatar d-flex align-items-center">
                        <LeaderRankIndicator index={x} type="lb" />
                        <img
                            className="avatar ml-3"
                            onError={(e) => defaultUserImage(e)}
                            src={
                                _leaderboardHistory[x]?.avatarUrl ||
                                `${window.cdn}icons/icon_profile.svg`
                            }
                            alt="player"
                        />
                    </div>
                    {/* PLAYER NAME & POINTS */}
                    <div className="details ml-1 ml-md-3">
                        <p className="player-name mb-0">
                            {_leaderboardHistory[x]?.nickName?.split(" ")[0] ||
                                "-"}{" "}
                            {_leaderboardHistory[x]?.userId === userId
                                ? "(You)"
                                : ""}
                        </p>
                        <p className="points mb-0">
                            {`${
                                _leaderboardHistory[x]?.gameScore || "-"
                            } points`}
                        </p>
                    </div>
                </div>

                {/* TICKETS */}
                <div className="tickets d-flex align-items-center justify-content-center">
                    <span>
                        {_leaderboardHistory[x]?.tickets ||
                            getRankTickets(x, leaderRuleRanks)}{" "}
                        <img
                            className="icon ml-1"
                            src={`${window.cdn}assets/tickets_05.png`}
                            alt="ticket"
                        />
                    </span>
                </div>
            </div>
        );
    }
    return _data;
}
function getRankTickets(index, leaderRuleRanks) {
    let value;
    leaderRuleRanks?.forEach((el) => {
        if (el?.rankFrom <= index + 1) value = el?.tickets;
        if (index + 1 >= el?.rankTo) value = el?.tickets;
    });
    return value;
}
