import { combineReducers } from "redux/";
import loginReducer from "redux/reducers/Login.reducer";
import prizesReducer from "redux/reducers/Prizes.reducer";
import ranksReducer from "redux/reducers/Ranks.reducer";
import activityReducer from "redux/reducers/Activity.reducer";
import automatedEntryTicketsReducer from "redux/reducers/AutomatedEntryTickets.reducer";
import claimedPrizesReducer from "redux/reducers/ClaimedPrizes.reducer";
import claimPrizeReducer from "redux/reducers/ClaimPrize.reducer";
import configReducer from "redux/reducers/Config.reducer";
import currentUserRankReducer from "redux/reducers/CurrentUserRank.reducer";
import exchangeRateReducer from "redux/reducers/ExchangeRate.reducer";
import friendInvitationReducer from "redux/reducers/FriendInvitation.reducer";
import gemsListReducer from "redux/reducers/GemsList.reducer";
import highScoreReducer from "redux/reducers/HighScore.reducer";
import IAPurchaseReducer from "redux/reducers/IAPurchaseRequest.reducer";
import leaderboardReducer from "redux/reducers/Leaderboard.reducer";
import leaderboardHistoryReducer from "redux/reducers/LeaderboardHistory.reducer";
import leaderboardRanksReducer from "redux/reducers/LeaderboardRanks.reducer";
import notificationNumberReducer from "redux/reducers/NotifcationNumber.reducer";
import notificationReducer from "redux/reducers/Notifcations.reducer";
import playerDetailsReducer from "redux/reducers/PlayerDetails.reducer";
import playerTournamentInfoReducer from "redux/reducers/PlayerTournamentInfo.reducer";
import playerHighScoreReducer from "redux/reducers/PlayerHighScore.reducer";
import playerSpinnerInfoReducer from "redux/reducers/PlayerSpinnerInfo.reducer";
import playerTicketsReducer from "redux/reducers/PlayerTickets.reducer";
import prizePoolTicketsReducer from "redux/reducers/PrizePoolTickets.reducer";
import spinnerRulesReducer from "redux/reducers/SpinnerRules.reducer";
import unClaimedPrizesReducer from "redux/reducers/UnClaimedPrizes.reducer";
import updateNotificationTokenReducer from "redux/reducers/UpdateNotificationToken.reducer";
import winnersReducer from "redux/reducers/Winners.reducer";
import earnAdditinalBenefitReducer from "redux/reducers/EarnAdditionalTickets.reducer";
import overTimeReducer from "redux/reducers/OverTime.reducer";
import listGamesReducer from "redux/reducers/ListGames.reducer";
import ToastyReducer from "redux/reducers/Toasty.reducer";

// COMBINING MULTIPLE REDUX REDUCERS
const appReducer = combineReducers({
    toasty: ToastyReducer,
    activity: activityReducer,
    automatedEntryTickets: automatedEntryTicketsReducer,
    claimedPrizes: claimedPrizesReducer,
    claimPrize: claimPrizeReducer,
    config: configReducer,
    currentUserRank: currentUserRankReducer,
    exchangeRate: exchangeRateReducer,
    earnAdditional: earnAdditinalBenefitReducer,
    friendInvitation: friendInvitationReducer,
    gemsList: gemsListReducer,
    highScore: highScoreReducer,
    IAPurchaseRequest: IAPurchaseReducer,
    leaderboard: leaderboardReducer,
    leaderboardHistory: leaderboardHistoryReducer,
    leaderboardRanks: leaderboardRanksReducer,
    gamesList: listGamesReducer,
    notificationNumber: notificationNumberReducer,
    notifications: notificationReducer,
    overTime: overTimeReducer,
    playerDetails: playerDetailsReducer,
    playerTournamentInfo: playerTournamentInfoReducer,
    playerHighScore: playerHighScoreReducer,
    playerSpinnerInfo: playerSpinnerInfoReducer,
    playerTickets: playerTicketsReducer,
    prizePoolTickets: prizePoolTicketsReducer,
    prizes: prizesReducer,
    ranks: ranksReducer,
    userData: loginReducer,
    unClaimedPrizes: unClaimedPrizesReducer,
    updateNotificationToken: updateNotificationTokenReducer,
    spinnerRules: spinnerRulesReducer,
    winners: winnersReducer,
});

const rootReducer = (state, action) => {
    // when a logout action is dispatched it will reset redux state
    if (action.type === "LOG_OUT") {
        state = undefined;
        window.location.href = "/";
        window.scrollTo(0, 0);
        localStorage.clear();
        sessionStorage.removeItem("isAuthValid");
    }
    return appReducer(state, action);
};

export default rootReducer;
