import {
    AddUserRequest,
    AddInviteRequest,
    BuyRequest,
    ClaimWinnerRequest,
    ListPrizeRequest,
    ListBlockchainNetworksRequest,
    ListRankRequest,
    ListLogPrizePoolRequest,
    ListWinnerRequest,
    ListLeaderboardRequest,
    ListGameLeaderRuleRequest,
    ListItemRequest,
    ListSpinnerRuleRequest,
    ListWinnerUnclaimedRequest,
    ListWinnerClaimedRequest,
    ListPlayerHighscoreRequest,
    ListLeaderboardHistoryRequest,
    ListNotificationRequest,
    ListGameRequest,
    LogGEnterRequest,
    LogGLeaveRequest,
    LogSEnterRequest,
    LogSLeaveRequest,
    LogSExtraRequest,
    GetConfigRequest,
    GetPrizeTicketPoolRequest,
    GetPrizeTicketsCollectedRequest,
    GetTotalTicketsSinceRequest,
    GetCurrentPlayerRankRequest,
    GetSpinAvailableRequest,
    GetPlayerRequest,
    GetNotificationNoRequest,
    SignInRequest,
    UpdateNotificationSeenRequest,
    UpdateUserSettingsRequest,
    UpdateMsgTokenRequest,
    ClaimPrizeRequest,
    CreateIntentRequest,
} from "../proto/gameboxapi_pb";
import axios from "axios";
import _ from "lodash";
import { monthYearDict, PRIZE_CATEGORY_NAME } from "Utils/Enums";
import { saveCookie, getCookie } from "Utils/ManageCookies";
import getToken from "Utils/GetToken";

const {
    GameboxApiPromiseClient,
} = require("../proto/gameboxapi_grpc_web_pb.js");
const client = new GameboxApiPromiseClient(
    process.env.REACT_APP_API_ENDPOINT,
    null,
    null
);
//
//      ADD NEW USER
//
export async function addUser(user) {
    const token = getToken();

    const request = new AddUserRequest();
    request.setIdToken(token);
    request.setUsername(user?.email);
    request.setEmail(user?.email);
    request.setNickname(user?.displayName);
    request.setFirstname(user?.firstName);
    request.setLastname(user?.lastName);
    request.setAvatarUrl(user?.imageUrl);
    // request.setPhone("");
    // request.setSocialLinkFb("");
    // request.setSocialLinkGoogle("");

    const response = await client.addUser(request, {
        authorization: `Bearer ${token}`,
    });
    const id = response.getResult();
    return id;
}

//
//      USER SIGN IN
//
export async function userSignIn() {
    const token = getToken();

    const request = new SignInRequest();
    request.setIdToken(token);

    const response = await client.signIn(request, {
        authorization: `Bearer ${token}`,
    });
    const signInResult = response.getResult();
    let user = {
        id: null,
        phone: "",
        email: "",
        username: "",
        picture: "",
        isNotifyAllowed: true,
        gems: 0,
        exp: 0,
        status: null,
        walletAddress: null,
        tokenBalance: null,
        tokenSymbol: null,
        network: null,
    };
    if (signInResult) {
        Object.assign(user, {
            id: signInResult.getId(),
            phone: signInResult.getPhone(),
            email: signInResult.getEmail(),
            username: signInResult.getNickName() || signInResult.getFirstname(),
            picture: signInResult.getAvatarUrl(),
            firstName: signInResult.getFirstname(),
            lastName: signInResult.getLastname(),
            isNotifyAllowed: signInResult.getIsNotifyAllowed(),
            gems: signInResult.getGemBalance(),
            exp: signInResult.getExp(),
            status: "active",
        });
    }
    return user;
}

//
//      FROYO API - TO GET USER INFO
//
export async function loginUser(payload) {
    const { data } = await axios.post(
        `${process.env.REACT_APP_FROYO_API_ENDPOINT}authenticate`,
        {
            username: payload.username,
            password: payload.password,
        }
    );
    return data;
}

//
//      FROYO API - TO GET USER INFO
//
export async function getUserAccountInfoFroyo() {
    const token = getToken();

    const { data } = await axios.get(
        `${process.env.REACT_APP_FROYO_API_ENDPOINT}account`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return data;
}

//
//      COMPARE FROYO USER DETAILS WITH USER DETAILS IN DATABASAE
//
export async function compareUserDetails(user, _user) {
    if (
        user.username !== _user.displayName ||
        user.firstName !== _user.firstName ||
        user.lastName !== _user.lastName ||
        user.picture !== (_user.imageUrl ?? "")
    ) {
        return updateUserSettings(
            user,
            _user.displayName,
            _user.imageUrl ?? "",
            _user.firstName,
            _user.lastName
        );
    }
    return user;
}

//
//      NEW USER INVITATION
//
export async function newUserInvitation(user, inviteCode) {
    const token = getToken();
    const request = new AddInviteRequest();
    request.setUserId(user.id);
    request.setInvitedBy(inviteCode);
    const response = await client.addInvite(request, {
        authorization: `Bearer ${token}`,
    });
    if (response.getResult() > 0) {
        localStorage.removeItem("inviteCode");
    }
}

//
//      USER DETAILS - GEMS & EXP
//
export async function getUserDetails(user) {
    const token = getToken();
    const request = new SignInRequest();
    request.setIdToken(token);
    request.setUsername(user.providerUID);

    const response = await client.signIn(request, {
        authorization: `Bearer ${token}`,
    });
    const userInfo = response.getResult();
    const gems = userInfo.getGemBalance();
    const exp = userInfo.getExp();
    const username = userInfo.getNickName();
    const picture = userInfo.getAvatarUrl();
    const isNotifyAllowed = userInfo.getIsNotifyAllowed();
    return {
        ...user,
        gems,
        exp,
        username,
        picture,
        isNotifyAllowed,
    };
}

//
//     GET RANKS
//
export async function getRanks() {
    const token = getToken();
    const request = new ListRankRequest();
    const response = await client.listRank(request, {
        authorization: `Bearer ${token}`,
    });
    const rankResultList = response.getResultList();
    const ranks = [];
    rankResultList.forEach((e) => {
        ranks.push({
            title: e.getTitle(),
            exp: e.getExp(),
            gems: e.getGem(),
            multiplier: e.getMultiplier(),
        });
    });
    return ranks;
}

//
//  GET GAMES BASIC DETAILS FOR STAY TUNED COMPONENT
//
export async function getGamesList() {
    const token = getToken();
    const request = new ListGameRequest();
    request.setLimit(100);
    request.setOffset(0);
    request.setStatus(2);
    const response = await client.listGame(request, {
        authorization: `Bearer ${token}`,
    });
    const data = response.getResultList();
    let gamesList = [];
    data.forEach((e) => {
        gamesList.push({
            gameId: e.getId(),
            gameTitle: e.getTitle(),
            gameIcon: e.getImgUrl(),
        });
    });
    return gamesList;
}

//
//     GET PRIZES
//
export async function getPrizes() {
    const token = getToken();
    const request = new ListPrizeRequest();
    const response = await client.listPrize(request, {
        authorization: `Bearer ${token}`,
    });
    const prizeList = response.getResultList();

    let prizes = {
        featuredData: [],
        premiumData: [],
        dailyData: [],
        automatedEntryData: [],
    };
    let _featuredData = [];
    let _premiumData = [];
    let _dailyData = [];
    let gameRulesList = [];

    let prizeDetailList =
        JSON.parse(sessionStorage.getItem("prizeDetailList")) || [];

    let availablePrizeList = [];

    for (let i = 0; i < prizeList.length; i++) {
        let p = prizeList[i];

        // GAME RULES LIST
        gameRulesList.push({
            gameId: p.getGameId(),
            score: p.getScoreRule(),
            watchAdTickets: p.getWatchAdGetTickets(),
            watchAdExp: p.getWatchAdGetExp(),
            useGemTickets: p.getUseGemGetTickets(),
            useGemExp: p.getUseGemGetExp(),
            useHowManyGems: p.getUseHowManyGems(),
        });

        // ADDING PRIZE LIST TO SESSION STORAGE
        if (p.getTypeId() === 1 || p.getTypeId() === 2 || p.getTypeId() === 3) {
            // PRIZE DETAILS LIST

            let index = prizeDetailList.findIndex(
                (e) => e.prizeId === p.getPrizeId()
            );
            if (index === -1) {
                prizeDetailList.push({
                    groupId: p.getGroupId(),
                    prizeId: p.getPrizeId(),
                    prizeTitle: p.getPrizeTitle(),
                    prizeSubtitle: p.getPrizeSubtitle(),
                    prizeBG: p.getPrizeImgUrl(),
                    prizeBG2: p.getPrizeImgUrl2(),
                    prizeContent: p.getPrizeContent(),
                    prizeProgress: p.getStatusProgress(),
                    ticketsRequired: p.getTicketsRequired(),
                    type: p.getTypeId(),
                    status: p.getStatus(),
                    statusProgress: p.getStatusProgress(),
                    timeZone: p.getTimezone(),
                    scheduledOn: p.getScheduledOn(),
                    scheduledOff: p.getScheduledOff(),
                    gameInfo: [
                        {
                            gameTitle: p.getGameTitle(),
                            gameSubtitle: p.getGameSubtitle(),
                            gameIcon: p.getGameImgUrl(),
                            gameId: p.getGameId(),
                            days: p.getGameDurationDays(),
                            hours: p.getGameDurationHours(),
                            minutes: p.getGameDurationMinutes(),
                            startTimeStamp: p.getStartTimestamp(),
                            endTimeStamp: p.getEndTimestamp(),
                            score: p.getScoreRule(),
                            watchAdTickets: p.getWatchAdGetTickets(),
                            watchAdExp: p.getWatchAdGetExp(),
                            useGemTickets: p.getUseGemGetTickets(),
                            useGemExp: p.getUseGemGetExp(),
                            useHowManyGems: p.getUseHowManyGems(),
                        },
                    ],
                    repeatedOn: p.getRepeatedOnList(),
                    prizeDuration: {
                        days: p.getPrizeDurationDays(),
                        hours: p.getPrizeDurationHours(),
                    },
                    overTime: p.getOvertime(),
                    blockchainNetwork: p.getBlockchainNetwork(),
                    seen: false,
                    completed: false,
                    nftContractAddress: p.getNftContractAddress(),
                    nftTokenId: p.getNftTokenId(),
                    infoUrl: p.getInfoUrl(),
                    cgId: p.getTsgId(),
                });
                sessionStorage.setItem(
                    "prizeDetailList",
                    JSON.stringify(prizeDetailList)
                );
            } else {
                prizeDetailList[index].overTime = p.getOvertime();
                prizeDetailList[index].gameInfo.splice(0, 1);
                prizeDetailList[index].gameInfo.push({
                    gameTitle: p.getGameTitle(),
                    gameSubtitle: p.getGameSubtitle(),
                    gameIcon: p.getGameImgUrl(),
                    gameId: p.getGameId(),
                    days: p.getGameDurationDays(),
                    hours: p.getGameDurationHours(),
                    minutes: p.getGameDurationMinutes(),
                    startTimeStamp: p.getStartTimestamp(),
                    endTimeStamp: p.getEndTimestamp(),
                    score: p.getScoreRule(),
                    watchAdTickets: p.getWatchAdGetTickets(),
                    watchAdExp: p.getWatchAdGetExp(),
                    useGemTickets: p.getUseGemGetTickets(),
                    useGemExp: p.getUseGemGetExp(),
                    useHowManyGems: p.getUseHowManyGems(),
                });
                prizeDetailList[index] = {
                    ...prizeDetailList[index],
                    seen: prizeDetailList[index].seen,
                    completed: prizeDetailList[index].completed,
                };
                sessionStorage.setItem(
                    "prizeDetailList",
                    JSON.stringify(prizeDetailList)
                );
            }

            availablePrizeList.push(p.getPrizeId());
        }

        // FEATURE DATA
        if (p.getTypeId() === 1) {
            let featuredIndex = _featuredData.findIndex(
                (e) =>
                    e.prizeId === p.getPrizeId() &&
                    p.getEndTimestamp() ===
                        e.gameInfo.find(
                            (el) => el.endTimeStamp === p.getEndTimestamp()
                        )?.endTimeStamp
            );
            if (featuredIndex === -1) {
                _featuredData.push({
                    groupId: p.getGroupId(),
                    prizeId: p.getPrizeId(),
                    prizeTitle: p.getPrizeTitle(),
                    prizeSubtitle: p.getPrizeSubtitle(),
                    prizeBG: p.getPrizeImgUrl(),
                    prizeBG2: p.getPrizeImgUrl2(),
                    prizeContent: p.getPrizeContent(),
                    prizeProgress: p.getStatusProgress(),
                    ticketsRequired: p.getTicketsRequired(),
                    type_id: p.getTypeId(),
                    status: p.getStatus(),
                    statusProgress: p.getStatusProgress(),
                    timeZone: p.getTimezone(),
                    scheduledOn: p.getScheduledOn(),
                    scheduledOff: p.getScheduledOff(),
                    gameInfo: [
                        {
                            gameTitle: p.getGameTitle(),
                            gameSubtitle: p.getGameSubtitle(),
                            gameIcon: p.getGameImgUrl(),
                            gameId: p.getGameId(),
                            days: p.getGameDurationDays(),
                            hours: p.getGameDurationHours(),
                            minutes: p.getGameDurationMinutes(),
                            startTimeStamp: p.getStartTimestamp(),
                            endTimeStamp: p.getEndTimestamp(),
                            score: p.getScoreRule(),
                            watchAdTickets: p.getWatchAdGetTickets(),
                            watchAdExp: p.getWatchAdGetExp(),
                            useGemTickets: p.getUseGemGetTickets(),
                            useGemExp: p.getUseGemGetExp(),
                            useHowManyGems: p.getUseHowManyGems(),
                        },
                    ],
                    repeatedOn: p.getRepeatedOnList(),
                    prizeDuration: {
                        days: p.getPrizeDurationDays(),
                        hours: p.getPrizeDurationHours(),
                    },
                    overTime: p.getOvertime(),
                    blockchainNetwork: p.getBlockchainNetwork(),
                    nftContractAddress: p.getNftContractAddress(),
                    nftTokenId: p.getNftTokenId(),
                    infoUrl: p.getInfoUrl(),
                    cgId: p.getTsgId(),
                });
            } else {
                _featuredData[featuredIndex].gameInfo.push({
                    gameTitle: p.getGameTitle(),
                    gameSubtitle: p.getGameSubtitle(),
                    gameIcon: p.getGameImgUrl(),
                    gameId: p.getGameId(),
                    days: p.getGameDurationDays(),
                    hours: p.getGameDurationHours(),
                    minutes: p.getGameDurationMinutes(),
                    startTimeStamp: p.getStartTimestamp(),
                    endTimeStamp: p.getEndTimestamp(),
                    score: p.getScoreRule(),
                    watchAdTickets: p.getWatchAdGetTickets(),
                    watchAdExp: p.getWatchAdGetExp(),
                    useGemTickets: p.getUseGemGetTickets(),
                    useGemExp: p.getUseGemGetExp(),
                    useHowManyGems: p.getUseHowManyGems(),
                });
            }
        }
        // PREMIUM DATA
        else if (p.getTypeId() === 2) {
            let premiumIndex = _premiumData.findIndex(
                (e) =>
                    e.prizeId === p.getPrizeId() &&
                    p.getEndTimestamp() ===
                        e.gameInfo.find(
                            (el) => el.endTimeStamp === p.getEndTimestamp()
                        )?.endTimeStamp
            );
            if (premiumIndex === -1) {
                _premiumData.push({
                    groupId: p.getGroupId(),
                    prizeId: p.getPrizeId(),
                    prizeTitle: p.getPrizeTitle(),
                    prizeSubtitle: p.getPrizeSubtitle(),
                    prizeBG: p.getPrizeImgUrl(),
                    prizeBG2: p.getPrizeImgUrl2(),
                    prizeContent: p.getPrizeContent(),
                    prizeProgress: p.getStatusProgress(),
                    timeZone: p.getTimezone(),
                    scheduledOn: p.getScheduledOn(),
                    scheduledOff: p.getScheduledOff(),
                    ticketsRequired: p.getTicketsRequired(),
                    type_id: p.getTypeId(),
                    status: p.getStatus(),
                    statusProgress: p.getStatusProgress(),
                    gameInfo: [
                        {
                            gameTitle: p.getGameTitle(),
                            gameSubtitle: p.getGameSubtitle(),
                            gameIcon: p.getGameImgUrl(),
                            gameId: p.getGameId(),
                            days: p.getGameDurationDays(),
                            hours: p.getGameDurationHours(),
                            minutes: p.getGameDurationMinutes(),
                            startTimeStamp: p.getStartTimestamp(),
                            endTimeStamp: p.getEndTimestamp(),
                            score: p.getScoreRule(),
                            watchAdTickets: p.getWatchAdGetTickets(),
                            watchAdExp: p.getWatchAdGetExp(),
                            useGemTickets: p.getUseGemGetTickets(),
                            useGemExp: p.getUseGemGetExp(),
                            useHowManyGems: p.getUseHowManyGems(),
                        },
                    ],
                    repeatedOn: p.getRepeatedOnList(),
                    prizeDuration: {
                        days: p.getPrizeDurationDays(),
                        hours: p.getPrizeDurationHours(),
                    },
                    overTime: p.getOvertime(),
                    blockchainNetwork: p.getBlockchainNetwork(),
                    nftContractAddress: p.getNftContractAddress(),
                    nftTokenId: p.getNftTokenId(),
                    infoUrl: p.getInfoUrl(),
                    cgId: p.getTsgId(),
                });
            } else {
                _premiumData[premiumIndex].gameInfo.push({
                    gameTitle: p.getGameTitle(),
                    gameSubtitle: p.getGameSubtitle(),
                    gameIcon: p.getGameImgUrl(),
                    gameId: p.getGameId(),
                    days: p.getGameDurationDays(),
                    hours: p.getGameDurationHours(),
                    minutes: p.getGameDurationMinutes(),
                    startTimeStamp: p.getStartTimestamp(),
                    endTimeStamp: p.getEndTimestamp(),
                    score: p.getScoreRule(),
                    watchAdTickets: p.getWatchAdGetTickets(),
                    watchAdExp: p.getWatchAdGetExp(),
                    useGemTickets: p.getUseGemGetTickets(),
                    useGemExp: p.getUseGemGetExp(),
                    useHowManyGems: p.getUseHowManyGems(),
                });
            }
        }
        // TIME SENSITIVE DATA
        else if (p.getTypeId() === 3) {
            let dailyIndex = _dailyData.findIndex(
                (e) =>
                    e.prizeId === p.getPrizeId() &&
                    p.getEndTimestamp() ===
                        e.gameInfo.find(
                            (el) => el.endTimeStamp === p.getEndTimestamp()
                        )?.endTimeStamp
            );
            if (dailyIndex === -1) {
                _dailyData.push({
                    groupId: p.getGroupId(),
                    prizeId: p.getPrizeId(),
                    prizeTitle: p.getPrizeTitle(),
                    prizeSubtitle: p.getPrizeSubtitle(),
                    prizeBG: p.getPrizeImgUrl(),
                    prizeBG2: p.getPrizeImgUrl2(),
                    prizeContent: p.getPrizeContent(),
                    prizeProgress: p.getStatusProgress(),
                    timeZone: p.getTimezone(),
                    scheduledOn: p.getScheduledOn(),
                    scheduledOff: p.getScheduledOff(),
                    type_id: p.getTypeId(),
                    status: p.getStatus(),
                    statusProgress: p.getStatusProgress(),
                    gameInfo: [
                        {
                            gameTitle: p.getGameTitle(),
                            gameSubtitle: p.getGameSubtitle(),
                            gameIcon: p.getGameImgUrl(),
                            gameId: p.getGameId(),
                            days: p.getGameDurationDays(),
                            hours: p.getGameDurationHours(),
                            minutes: p.getGameDurationMinutes(),
                            startTimeStamp: p.getStartTimestamp(),
                            endTimeStamp: p.getEndTimestamp(),
                            score: p.getScoreRule(),
                            watchAdTickets: p.getWatchAdGetTickets(),
                            watchAdExp: p.getWatchAdGetExp(),
                            useGemTickets: p.getUseGemGetTickets(),
                            useGemExp: p.getUseGemGetExp(),
                            useHowManyGems: p.getUseHowManyGems(),
                        },
                    ],
                    repeatedOn: p.getRepeatedOnList(),
                    prizeDuration: {
                        days: p.getPrizeDurationDays(),
                        hours: p.getPrizeDurationHours(),
                    },
                    overTime: p.getOvertime(),
                    blockchainNetwork: p.getBlockchainNetwork(),
                    nftContractAddress: p.getNftContractAddress(),
                    nftTokenId: p.getNftTokenId(),
                    infoUrl: p.getInfoUrl(),
                    cgId: p.getTsgId(),
                });
            } else {
                _dailyData[dailyIndex].gameInfo.push({
                    gameTitle: p.getGameTitle(),
                    gameSubtitle: p.getGameSubtitle(),
                    gameIcon: p.getGameImgUrl(),
                    gameId: p.getGameId(),
                    days: p.getGameDurationDays(),
                    hours: p.getGameDurationHours(),
                    minutes: p.getGameDurationMinutes(),
                    startTimeStamp: p.getStartTimestamp(),
                    endTimeStamp: p.getEndTimestamp(),
                    score: p.getScoreRule(),
                    watchAdTickets: p.getWatchAdGetTickets(),
                    watchAdExp: p.getWatchAdGetExp(),
                    useGemTickets: p.getUseGemGetTickets(),
                    useGemExp: p.getUseGemGetExp(),
                    useHowManyGems: p.getUseHowManyGems(),
                });
            }
        }
        // AUTOMATED ENTRY DATA
        else if (p.getTypeId() === 4) {
            prizes.automatedEntryData.push({
                prizeId: p.getPrizeId(),
                prizeTitle: p.getPrizeTitle(),
                prizeSubtitle: p.getPrizeSubtitle(),
                prizeBG: p.getPrizeImgUrl(),
                prizeBG2: p.getPrizeImgUrl2(),
                prizeContent: p.getPrizeContent(),
                prizeProgress: p.getStatusProgress(),
                timeZone: p.getTimezone(),
                scheduledOn: p.getScheduledOn(),
                scheduledOff: p.getScheduledOff(),
                type_id: p.getTypeId(),
                status: p.getStatus(),
                statusProgress: p.getStatusProgress(),
                repeatedOn: p.getRepeatedOnList(),
                prizeDuration: {
                    days: p.getPrizeDurationDays(),
                    hours: p.getPrizeDurationHours(),
                },
                blockchainNetwork: p.getBlockchainNetwork(),
                nftContractAddress: p.getNftContractAddress(),
                nftTokenId: p.getNftTokenId(),
                infoUrl: p.getInfoUrl(),
            });
        }
    }

    // REMOVE ANY PRIZE FROM THE LOCAL LIST WHICH IS ALREADY FINISHED
    let plList = JSON.parse(sessionStorage.getItem("prizeDetailList")) || [];
    let _tempArr = [...plList];
    plList.forEach((p) => {
        if (
            !availablePrizeList.includes(p?.prizeId) &&
            !p.completed &&
            !p.seen
        ) {
            const idx = _tempArr.findIndex((t) => t?.prizeId === p?.prizeId);
            if (idx > -1) {
                _tempArr[idx].completed = true;
                sessionStorage.setItem(
                    "prizeDetailList",
                    JSON.stringify(_tempArr)
                );
            }
        }
    });

    // REMOVING ANY DUPLICATE PRIZES
    prizes.featuredData = _.uniqBy(_featuredData, "prizeId");
    prizes.premiumData = _.uniqBy(
        _.orderBy(_premiumData, ["prizeContent"], ["asc"]),
        "prizeId"
    );
    prizes.dailyData = _.uniqBy(_dailyData, "prizeId");
    return { prizes, gameRulesList };
}

//
//  GET BLOCK CHAIN NETWORK
//
export async function getBlockchainNetworks() {
    const token = getToken();
    const request = new ListBlockchainNetworksRequest();

    const response = await client.listBlockchainNetworks(request, {
        authorization: `Bearer ${token}`,
    });
    const data = response.getResultList();
    let blockchainNetworks = [];
    data.forEach((e) => {
        blockchainNetworks.push({
            id: e.getId(),
            networkName: e.getNetworkName(),
            rpcUrl: e.getRpcUrl(),
            chainId: e.getChainId(),
            currencySymbol: e.getCurrencySymbol(),
            blockExplorerUrl: e.getBlockExplorerUrl(),
            prizeDistributorAddress: e.getPrizeDistributorAddress(),
            systemTokenAddress: e.getSystemTokenAddress(),
        });
    });
    return blockchainNetworks;
}

//
//  GET PRIZE LATEST TICKETS COLLECTED
//
export async function getPrizeLatestTicketsCollected(
    prizeId,
    ignoreChecking,
    prizeTicketCollection
) {
    const token = getToken();

    if (!ignoreChecking) {
        const existingIndex = prizeTicketCollection.findIndex(
            (e) => e.prizeId === prizeId
        );
        if (existingIndex > -1) {
            //check if got existing data that's retrieved within last 5 seconds, as we don't allow spam to server

            // lastChecked timestamp
            //console.log(poolTickets[existingIndex].lastChecked);
            let diff =
                (Date.now() -
                    prizeTicketCollection[existingIndex].lastChecked) /
                1000;
            if (diff < 5) {
                //if smaller than 5 seconds, then do nothing and skip this api
                //console.log("skip");
                return prizeTicketCollection[existingIndex];
            }
        } else {
            // setting this tempData immediately so that a very fast scrolling doesn't spam at the very first time visitng the page
            return {
                prizeId,
                tickets: 0,
                lastChecked: Date.now(),
            };
        }
    }

    const request = new GetPrizeTicketsCollectedRequest();
    request.setPrizeId(prizeId);
    const response = await client.getPrizeTicketsCollected(request, {
        authorization: `Bearer ${token}`,
    });
    const tickets = response.getTickets();
    return { prizeId, tickets, lastChecked: Date.now() };
}

//
//     GET POOL TICKETS
//
export async function getPoolTickets(
    prizeId,
    ignoreChecking,
    user,
    poolTickets
) {
    const token = getToken();

    if (!ignoreChecking) {
        const existingIndex = poolTickets.findIndex(
            (e) => e.prizeId === prizeId
        );
        if (existingIndex > -1) {
            //check if got existing data that's retrieved within last 5 seconds, as we don't allow spam to server

            // lastChecked timestamp
            //console.log(esmData.poolTickets[existingIndex].lastChecked);
            let diff =
                (Date.now() - poolTickets[existingIndex].lastChecked) / 1000;
            if (diff < 5) {
                //if smaller than 5 seconds, then do nothing and skip this api
                // console.log("skip");
                return poolTickets[existingIndex];
            }
        } else {
            // setting this tempData immediately so that a very fast scrolling doesn't spam at the very first time visitng the page
            return { prizeId, tickets: 0, lastChecked: Date.now() };
        }
    }

    const request = new GetPrizeTicketPoolRequest();
    request.setUserId(user.id);
    request.setPrizeId(prizeId);

    const response = await client.getPrizeTicketPool(request, {
        authorization: `Bearer ${token}`,
    });
    const tickets = response.getTickets();
    return { prizeId, tickets, lastChecked: Date.now() };
}

//
// GET AUTOMATED ENTRY TICKETS
//
export async function getTotalTickets(scheduledOn, prizeId, user) {
    const token = getToken();

    const request = new GetTotalTicketsSinceRequest();
    request.setUserId(user?.id);
    request.setScheduledOn(scheduledOn);

    const response = await client.getTotalTicketsSince(request, {
        authorization: `Bearer ${token}`,
        uid: user?.providerUID,
    });
    const automatedEntryTicket = [];
    automatedEntryTicket.push({
        prizeId: prizeId,
        ticket: response.getTickets(),
    });
    return automatedEntryTicket;
}

//
//     GET LOG GLIST
//
export async function getLogGList(user, prizes) {
    const token = getToken();
    const request = new ListLogPrizePoolRequest();
    request.setUserId(user.id);

    const response = await client.listLogPrizePool(request, {
        authorization: `Bearer ${token}`,
    });

    const activity = [];
    const logGList = response.getResultList();
    logGList.forEach((e) => {
        let prizeList = prizes[PRIZE_CATEGORY_NAME[e.getPrizeTypeId()]];
        let idx = prizeList.findIndex(
            (prize) => e.getPrizeId() === prize.prizeId
        );
        if (idx > -1) {
            activity.push({
                prizeId: e.getPrizeId(),
                prizeType: e.getPrizeTypeId(),
                prizeContent: e.getPrizeContent(),
                prizeTitle: e.getPrizeTitle(),
                prizeSubtitle: e.getPrizeSubtitle(),
                prizeImage: e.getPrizeImgUrl(),
                ticketsRequired: e.getPrizeTicketsRequired(),
            });
        }
    });
    return activity;
}

//
//     LOG ENTER
//
export async function logEnter(
    user,
    currentGameInfo,
    prizeId,
    gameId,
    isAdWatched,
    isGemUsed
) {
    const token = getToken();
    const request = new LogGEnterRequest();
    request.setSecret("");
    request.setUserId(user.id);
    request.setPrizeId(prizeId);
    request.setGameId(gameId);
    request.setIsWatchedAd(isAdWatched);
    request.setIsUsedGem(isGemUsed);

    const response = await client.logGEnter(request, {
        authorization: `Bearer ${token}`,
    });

    const result = response.getResult();
    if (result > 0)
        currentGameInfo = { ...currentGameInfo, playerEnterGameId: result };
    return currentGameInfo;
}

//
//     LOG LEAVE
//
export async function logLeave(user, currentGameInfo, gameScore, extraEarning) {
    const token = getToken();
    const enterId = currentGameInfo.playerEnterGameId;
    const request = new LogGLeaveRequest();
    request.setSecret("");
    if (enterId) request.setId(enterId);
    request.setUserId(user.id);
    request.setGameScore(gameScore);

    const response = await client.logGLeave(request, {
        authorization: `Bearer ${token}`,
    });

    extraEarning = {
        ...extraEarning,
        leaveId: response.getResult(),
        experience: response.getExp(),
        ticket: response.getTickets(),
    };
    return extraEarning;
}

//
//      GET LEADERBOARD
//
export async function getLeaderboardResult(prizeId, gameId) {
    const token = getToken();
    const request = new ListLeaderboardRequest();

    request.setGameId(gameId);
    request.setPrizeId(prizeId);
    request.setLimit(100);
    request.setOffset(0);

    const response = await client.listLeaderboard(request, {
        authorization: `Bearer ${token}`,
    });
    const resultList = response.getResultList();
    let leaderboard = [];
    resultList.forEach((e) => {
        leaderboard.push({
            prizeId: prizeId,
            userId: e.getUserId(),
            nickName: e.getNickName(),
            avatarUrl: e.getAvatarUrl(),
            exp: e.getExp(),
            gameScore: e.getGameScore(),
            leaveTimeStamp: e.getLeaveTimestamp(),
        });
    });
    return leaderboard;
}

//
//  GET CURRENT USER RANK
//
export async function getCurrentUserRank(
    user,
    gameId,
    prizeId,
    currentUserRank
) {
    const token = getToken();
    const request = new GetCurrentPlayerRankRequest();
    request.setGameId(gameId);
    request.setPrizeId(prizeId);
    request.setUserId(user.id);

    const response = await client.getCurrentPlayerRank(request, {
        authorization: `Bearer ${token}`,
    });
    const result = response.getResult();
    currentUserRank = { ...currentUserRank, rank: result ? result : "-" };
    return currentUserRank;
}

//
//  GET WINNERS LIST
//
export async function getWinnersList() {
    const token = getToken();
    const request = new ListWinnerRequest();
    request.setLimit(20);
    request.setOffset(0);

    const response = await client.listWinner(request, {
        authorization: `Bearer ${token}`,
    });
    const winnerResultList = response.getResultList();

    let _monthYear = "";
    const winners = [];
    winnerResultList.forEach((e) => {
        _monthYear = `${
            monthYearDict[new Date(e.getCreatedOn() * 1000).getMonth()]
        } ${new Date(e.getCreatedOn() * 1000).getFullYear()}`;

        if (winners.length === 0) {
            winners.push({
                monthYear: _monthYear,
                list: [
                    {
                        id: e.getId(),
                        prizeId: e.getPrizeId(),
                        prizeTitle: e.getPrizeTitle(),
                        prizeSubtitle: e.getPrizeSubtitle(),
                        prizeType: e.getPrizeTypeId(),
                        prizeImageUrl: e.getPrizeImgUrl(),
                        userNickName: e.getUserNickName(),
                        userAvatarUrl: e.getUserAvatarUrl(),
                        userId: e.getUserId(),
                        createdOn: e.getCreatedOn(),
                        claimedOn: e.getClaimedOn(),
                        status: e.getStatus(),
                        totalPlayers: e.getTotalPlayer(),
                    },
                ],
            });
        } else {
            let idx = winners.findIndex(
                (winner) => winner.monthYear === _monthYear
            );
            if (idx > -1) {
                winners[idx].list.push({
                    id: e.getId(),
                    prizeId: e.getPrizeId(),
                    prizeTitle: e.getPrizeTitle(),
                    prizeType: e.getPrizeTypeId(),
                    prizeImageUrl: e.getPrizeImgUrl(),
                    userNickName: e.getUserNickName(),
                    userAvatarUrl: e.getUserAvatarUrl(),
                    userId: e.getUserId(),
                    createdOn: e.getCreatedOn(),
                    claimedOn: e.getClaimedOn(),
                    status: e.getStatus(),
                    totalPlayers: e.getTotalPlayer(),
                });
            } else {
                winners.push({
                    monthYear: _monthYear,
                    list: [
                        {
                            id: e.getId(),
                            prizeId: e.getPrizeId(),
                            prizeTitle: e.getPrizeTitle(),
                            prizeType: e.getPrizeTypeId(),
                            prizeImageUrl: e.getPrizeImgUrl(),
                            userNickName: e.getUserNickName(),
                            userAvatarUrl: e.getUserAvatarUrl(),
                            userId: e.getUserId(),
                            createdOn: e.getCreatedOn(),
                            claimedOn: e.getClaimedOn(),
                            status: e.getStatus(),
                            totalPlayers: e.getTotalPlayer(),
                        },
                    ],
                });
            }
        }
    });
    return winners;
}

//
//     GET HIGHSCORE
//
export async function getHighScore(user) {
    const token = getToken();
    const request = new ListPlayerHighscoreRequest();
    request.setPlayerId(user.id);

    const response = await client.listPlayerHighscore(request, {
        authorization: `Bearer ${token}`,
    });
    const highScoreList = response.getResultList();
    const highScore = [];
    highScoreList.forEach((e) => {
        highScore.push({
            gameId: e.getGameId(),
            gameTitle: e.getGameTitle(),
            gameImageUrl: e.getGameImgUrl(),
            gameScore: e.getGameScore(),
            scoreTimestamp: e.getScoreTimestamp(),
        });
    });
    return highScore;
}

//
//     GET GEMS LIST
//
export async function getGemsList() {
    const token = getToken();
    const request = new ListItemRequest();
    request.setLimit(20);
    request.setOffset(0);

    const response = await client.listItem(request, {
        authorization: `Bearer ${token}`,
    });
    const itemResultList = response.getResultList();
    const gemsList = [];
    itemResultList.forEach((e) => {
        gemsList.push({
            id: e.getId(),
            title: e.getTitle(),
            subtitle: e.getSubtitle(),
            content: e.getContent(),
            ImageUrl: e.getImgUrl(),
            typeId: e.getTypeId(),
            price: e.getPrice(),
            quantity: e.getQuantity(),
            status: e.getStatus(),
            paymentTypeId: e.getPaymentTypeId(),
        });
    });
    return gemsList;
}

//
//  GET STRIPE CLIENT SECRET - CREATE PAYMENT INTENT
//
export async function getPaymentIntent(price) {
    const token = getToken();
    const request = new CreateIntentRequest();
    request.setTotal(price);

    const response = await client.createIntent(request, {
        authorization: `Bearer ${token}`,
    });
    return response.getClientSecret();
}

//
//  GET EXCHANGE RATE
//
export async function getExchangeRate() {
    let exchangeRate = {};
    let ipInfo = {};

    let fx = getCookie("fx") ? JSON.parse(getCookie("fx")) : "";
    let ipDetails = getCookie("ipInfo") ? JSON.parse(getCookie("ipInfo")) : "";

    let date = new Date();
    const CETTimeZoneHour = new Date()
        .toLocaleTimeString("en-US", {
            timeZone: "CET",
            hour12: false,
        })
        ?.split(":")?.[0];

    // IP INFO API
    if (ipDetails?.country_name) {
        Object.assign(ipInfo, ipDetails);
    } else {
        const { data: ipAddress } = await axios.get(
            `https://www.cloudflare.com/cdn-cgi/trace`
        );
        const ip = ipAddress?.split("\n")?.filter((v) => v.includes("ip="))[0];
        const { data: ipData } = await axios.get(
            `${process.env.REACT_APP_IP_INFO_API}${ip?.split("=")?.[1]}/json`
        );
        if (ipData?.currency === undefined || ipData?.currency === null) return;
        Object.assign(ipInfo, ipData);

        saveCookie(
            "ipInfo",
            `${JSON.stringify(ipData)}; expires=${new Date(
                "Fri Dec 31 9999 23:59:59 GMT+0800 (Malaysia Time)"
            )}`
        );
    }

    // FX API
    if (
        !fx ||
        (CETTimeZoneHour > 15 &&
            CETTimeZoneHour < 18 &&
            (date.getDay() !== 6 || date.getDate() !== 7))
    ) {
        const { data: rates } = await axios.get(
            `${process.env.REACT_APP_EXCHANGE_API}?from=SGD`
        );
        Object.assign(exchangeRate, rates);
        saveCookie(
            "fx",
            `${JSON.stringify(rates)}; expires=${new Date(
                "Fri Dec 31 9999 23:59:59 GMT+0800 (Malaysia Time)"
            )}`
        );
    }
    Object.assign(exchangeRate, fx);
    return { exchangeRate, ipInfo };
}

//
//     GET SPINNER RULES
//
export async function getSpinnerRules() {
    const token = getToken();
    const request = new ListSpinnerRuleRequest();
    const response = await client.listSpinnerRule(request, {
        authorization: `Bearer ${token}`,
    });
    const spinnerRuleResultList = response.getResultList();
    const spinnerRules = [];
    spinnerRuleResultList.forEach((e) => {
        spinnerRules.push({
            probability: e.getProbability(),
            tickets: e.getWin(),
        });
    });
    return spinnerRules;
}

//
//     GET LEADERBOARD RANK
//
export async function getLeaderboardRank(gameId, leaderRuleRanks) {
    const token = getToken();
    const request = new ListGameLeaderRuleRequest();
    request.setGameId(gameId);

    const response = await client.listGameLeaderRule(request, {
        authorization: `Bearer ${token}`,
    });
    const leaderRuleResultList = response.getResultList();
    leaderRuleResultList.forEach((rank) => {
        const idx = leaderRuleRanks.findIndex(
            (e) =>
                e?.exp === rank.getExp() &&
                e?.gameId === rank.getGameId() &&
                e?.rankFrom === rank.getRankFrom() &&
                e?.rankTo === rank.getRankTo() &&
                e?.ticket === rank.getTickets()
        );
        if (idx === -1)
            leaderRuleRanks.push({
                gameId: rank.getGameId(),
                rankFrom: rank.getRankFrom(),
                rankTo: rank.getRankTo(),
                tickets: rank.getTickets(),
                exp: rank.getExp(),
            });
    });

    return leaderRuleRanks;
}

//
//     UPDATE USER SETTINGS
//
export async function updateUserSettings(
    user,
    username,
    picture,
    firstname,
    lastname,
    isNotifyAllowed
) {
    const token = getToken();
    const request = new UpdateUserSettingsRequest();
    request.setId(user.id);
    request.setIsNotifyAllowed(isNotifyAllowed);
    request.setIsNotifyNewReward(isNotifyAllowed);
    request.setIsNotifyNewTournament(isNotifyAllowed);
    request.setIsNotifyTourEnding(isNotifyAllowed);
    request.setAvatarUrl(picture);
    request.setNickName(username);
    request.setFirstName(firstname);
    request.setLastName(lastname);

    await client.updateUserSettings(request, {
        authorization: `Bearer ${token}`,
    });
    return {
        ...user,
        username,
        picture,
        firstname,
        lastname,
        isNotifyAllowed,
    };
}

//
//  GET NFT INFO FOR CLAIMING
//
export async function getNFTClaim(winnerId, userId, claimerAddress) {
    const token = getToken();
    const request = new ClaimPrizeRequest();
    request.setWinnerId(winnerId);
    request.setUserId(userId);
    request.setClaimerAddress(claimerAddress);

    const response = await client.claimPrize(request, {
        authorization: `Bearer ${token}`,
    });
    const nftInfo = {
        address: response.getAddress(),
        tokenId: response.getPrizeIdAmt(),
        amount: response.getAmount(),
        nonce: response.getNonce(),
        signature: response.getSignature(),
    };
    return nftInfo;
}

//
//     GET UNCLAIMED PRIZES LIST
//
export async function getUnclaimedPrizesList(user) {
    const token = getToken();
    const request = new ListWinnerUnclaimedRequest();
    request.setUserId(user.id);

    const response = await client.listWinnerUnclaimed(request, {
        authorization: `Bearer ${token}`,
    });
    const unclaimedWinnerResultList = response.getResultList();
    const unClaimedPrizes = [];
    unclaimedWinnerResultList.forEach((e) => {
        unClaimedPrizes.push({
            id: e.getId(),
            prizeId: e.getPrizeId(),
            prizeTitle: e.getPrizeTitle(),
            prizeType: e.getPrizeTypeId(),
            prizeContent: e?.getPrizeContent(),
            prizeImageUrl: e.getPrizeImgUrl(),
            userNickName: e.getUserNickName(),
            userAvatarUrl: e.getUserAvatarUrl(),
            createdOn: e.getCreatedOn(),
            status: e.getStatus(),
            prizeCanClaimDate: e.getPrizeCanClaimDate(),
            prizeBlockchainNetwork: e.getPrizeBlockchainNetwork(),
            prizeContractType: e.getPrizeContractType(),
        });
    });
    return unClaimedPrizes;
}

//
//     GET CLAIMED PRIZES LIST
//
export async function getClaimedPrizesList(userId) {
    const token = getToken();
    const request = new ListWinnerClaimedRequest();
    request.setUserId(userId);

    const response = await client.listWinnerClaimed(request, {
        authorization: `Bearer ${token}`,
    });
    const claimedWinnerResultList = response.getResultList();
    const claimedPrizes = [];
    claimedWinnerResultList.forEach((e) => {
        if (e.getStatus() > 1)
            claimedPrizes.push({
                id: e.getId(),
                prizeId: e.getPrizeId(),
                prizeTitle: e.getPrizeTitle(),
                prizeSubtitle: e.getPrizeSubtitle(),
                prizeType: e.getPrizeTypeId(),
                prizeContent: e?.getPrizeContent(),
                prizeImageUrl: e.getPrizeImgUrl(),
                userNickName: e.getUserNickName(),
                userAvatarUrl: e.getUserAvatarUrl(),
                userId: e.getUserId(),
                userEmail: e.getUserEmail(),
                userPhone: e.getUserPhone(),
                userAddress: e.getUserAddress(),
                userCity: e.getUserCity(),
                userState: e.getUserState(),
                userZipcode: e.getUserZipcode(),
                userCountry: e.getUserCountry(),
                shipTracking: e.getShipTracking(),
                deliveryCompany: e.getDeliveryCompany(),
                createdOn: e.getCreatedOn(),
                claimedOn: e.getClaimedOn(),
                status: e.getStatus(),
            });
    });
    return claimedPrizes;
}

//
//     PROCESS CLAIM
//
export async function processClaim(winnerId, userId, hash) {
    const token = getToken();
    const request = new ClaimWinnerRequest();
    request.setId(winnerId);
    request.setUserId(userId);
    request.setTransactionHash(hash);

    // request.setId(id);
    // request.setUserId(user.id);
    // request.setEmail(claim.email);
    // request.setFullName(claim.fullName);
    // request.setCountryCode(claim.countryCode);
    // request.setPhone(claim.phone);
    // request.setAddress(claim.address);
    // request.setCity(claim.city);
    // request.setState(claim.region);
    // request.setZipCode(claim.zipcode);
    // request.setCountry(claim.country);

    const res = await client.claimWinner(request, {
        authorization: `Bearer ${token}`,
    });
    return res.getResult();
}

//
//     GET CONFIG
//
export async function getConfig() {
    const token = getToken();
    const request = new GetConfigRequest();
    const response = await client.getConfig(request, {
        authorization: `Bearer ${token}`,
    });
    const configResult = response.getResult();
    const config = {};
    Object.assign(config, {
        gemsPerInvite: configResult.getInvites(),
        adsPerGame: configResult.getGamesPerAd(),
        daysToClaimPrize: configResult.getDaysToClaim(),
        freeSpinPerDay: configResult.getFreespinPerDay(),
        useGems: configResult.getGemsPerSpins1(),
        watchAds: configResult.getAdsPerSpins1(),
        useGemsSpin: configResult.getGemsPerSpins2(),
        watchAdsSpin: configResult.getAdsPerSpins2(),
        rewardInvitesRank: configResult.getRewardInvitesRank(),
    });
    return config;
}

//
//     PURCHASE GEMS PROCESS
//
export async function purchaseProcess(
    user,
    itemTypeId,
    itemId,
    paymentId,
    price,
    networkId
) {
    const token = getToken();
    const request = new BuyRequest();
    // request.setSecret(secret);
    // request.setSubId(subId);
    request.setUserId(user.id);
    request.setItemTypeId(itemTypeId);
    request.setItemId(itemId);
    request.setPaymentId(paymentId);
    request.setPrice(price);
    request.setBlockchainNetwork(networkId);

    const response = await client.buy(request, {
        authorization: `Bearer ${token}`,
    });
    const result = response.getResult();
    return result;
}

//
//     GET SPIN AVAILABLE
//
export async function getSpinAvailable(user, spinner) {
    const token = getToken();
    const request = new GetSpinAvailableRequest();
    request.setUserId(user.id);

    const response = await client.getSpinAvailable(request, {
        authorization: `Bearer ${token}`,
    });
    const spinAvailableResult = response.getResult();
    if (spinAvailableResult)
        spinner = { ...spinner, freeSpins: spinAvailableResult };
    return spinner;
}

//
//     PLAYER LOG SPINNER ENTER
//
export async function logSEnter(user, prizeId, spinner) {
    const token = getToken();
    const request = new LogSEnterRequest();
    request.setUserId(user.id);
    request.setPrizeId(prizeId);

    const response = await client.logSEnter(request, {
        authorization: `Bearer ${token}`,
    });
    const result = response.getResult();
    if (result) {
        spinner = {
            ...spinner,
            enterId: result,
            freeSpins:
                spinner.freeSpins > 0
                    ? spinner.freeSpins - 1
                    : spinner.freeSpins,
            winType: response.getWinType(),
            winAmount: response.getWinAmount(),
        };
    }
    return spinner;
}

//
//     PLAYER LOG SPINNER LEAVE
//
export async function logSLeave(user, enterId, spinner) {
    const token = getToken();
    const request = new LogSLeaveRequest();
    request.setId(enterId);
    request.setUserId(user.id);

    const response = await client.logSLeave(request, {
        authorization: `Bearer ${token}`,
    });
    if (response.getWinAmount() > 0) {
        spinner = {
            ...spinner,
            enterId,
            freeSpins:
                spinner.freeSpins > 0
                    ? spinner.freeSpins - 1
                    : spinner.freeSpins,
            winType: response.getWinType(),
            winAmount: response.getWinAmount(),
        };
    } else {
        console.log("Spinner failed! Please reload and try again.");
    }
    return spinner;
}

//
//     PLAYER LOG SPINNER EXTRA
//
export async function logSExtra(user, spinner, isTypeGems) {
    const token = getToken();
    const request = new LogSExtraRequest();
    request.setUserId(user.id);
    request.setIsGemOrAd(isTypeGems);
    const response = await client.logSExtra(request, {
        authorization: `Bearer ${token}`,
    });
    const result = response.getResult();
    if (result > 0) {
        spinner = {
            ...spinner,
            enterId: spinner.enterId,
            freeSpins: spinner.freeSpins + result,
        };
    }
    return spinner;
}

//
//     UPDATE PUSH NOTIFICATION
//
export async function updatePushNotification(user, fcmToken) {
    const token = getToken();
    const request = new UpdateMsgTokenRequest();
    request.setId(user.id);
    request.setToken(fcmToken);

    const response = await client.updateMsgToken(request, {
        authorization: `Bearer ${token}`,
    });
    console.log(`UPDATE_PUSH_NOTIFICATION Success=${response.getResult()}`);
    return response.getResult();
}

//
// OTHER PLAYERS DETAIL
//
export async function getPlayerDetails(playerId) {
    const token = getToken();
    const request = new GetPlayerRequest();
    request.setId(playerId);

    const response = await client.getPlayer(request, {
        authorization: `Bearer ${token}`,
    });
    const playerDetails = {};
    if (!response.getResult()) {
        console.log(response.getResult());
    } else {
        const data = response.getResult();
        Object.assign(playerDetails, {
            id: data.getId(),
            name: data.getNickName(),
            picture: data.getAvatarUrl(),
            exp: data.getExp(),
        });
    }
    return playerDetails;
}

//
// OTHER PLAYERS HIGHSCORE
//
export async function getPlayerHighScore(playerId) {
    const token = getToken();
    const request = new ListPlayerHighscoreRequest();
    request.setPlayerId(playerId);

    const response = await client.listPlayerHighscore(request, {
        authorization: `Bearer ${token}`,
    });
    const playersHighScore = [];
    if (!response.getResultList()) {
        console.log(response.getResultList());
    } else {
        const data = response.getResultList();
        data.forEach((e) => {
            playersHighScore.push({
                gameId: e.getGameId(),
                gameTitle: e.getGameTitle(),
                gameImageUrl: e.getGameImgUrl(),
                gameScore: e.getGameScore(),
                scoreTimestamp: e.getScoreTimestamp(),
            });
        });
    }
    return playersHighScore;
}

// GET LEADERBOARD HISTORY
export async function getLeaderboardHistory(cgId) {
    const token = getToken();
    const request = new ListLeaderboardHistoryRequest();
    request.setCgId(cgId);
    request.setLimit(100);
    request.setOffset(0);

    const response = await client.listLeaderboardHistory(request, {
        authorization: `Bearer ${token}`,
    });
    const userNotifications = [];
    if (!response.getResultList()) {
        console.log("NO INFO AVAILABLE");
    } else {
        const data = response.getResultList();
        if (data.length > 0) {
            data.forEach((e) => {
                userNotifications.push({
                    cgId: e.getCgId(),
                    rank: e.getRank(),
                    prizeId: e.getPrizeId(),
                    gameId: e.getGameId(),
                    userId: e.getUserId(),
                    nickName: e.getNickName(),
                    avatarUrl: e.getAvatarUrl(),
                    gameScore: e.getGameScore(),
                    rewardExp: e.getRewardExp(),
                    tickets: e.getTickets(),
                    rankMultiplier: e.getRankMultiplier(),
                    vipMultiplier: e.getVipMultiplier(),
                    totalTickets: e.getTotalTickets(),
                    createdOn: e.getCreatedOn(),
                });
            });
        }
    }
    return userNotifications;
}

// GET NOTIFICATION NUMBER
export async function getNotificationNumber(user, notificationNumber) {
    const token = getToken();
    const request = new GetNotificationNoRequest();
    request.setUserId(user?.id);

    const response = await client.getNotificationNo(request, {
        authorization: `Bearer ${token}`,
    });
    if (!response.getResult()) {
        console.log("No new notification count available!");
    } else {
        console.log("NOTIFICATION COUNT:", response.getResult());
        notificationNumber.count = response.getResult();
        return notificationNumber;
    }
    return notificationNumber;
}

// LIST NOTIFICATION
export async function getNotifications(user, notiType) {
    const token = getToken();
    const request = new ListNotificationRequest();
    request.setUserId(user?.id);
    request.setNotiType(notiType);
    request.setLimit(100);
    request.setOffset(0);

    const response = await client.listNotification(request, {
        authorization: `Bearer ${token}`,
    });
    const data = response.getResultList();
    const notificationList = [];
    let _monthYear = "";
    data.forEach((e) => {
        _monthYear = `${
            monthYearDict[new Date(e.getCreatedOn() * 1000).getMonth()]
        } ${new Date(e.getCreatedOn() * 1000).getFullYear()}`;

        if (notificationList.length === 0) {
            notificationList.push({
                monthYear: _monthYear,
                list: [
                    {
                        id: e.getId(),
                        userId: e.getUserId(),
                        type: e.getNotiType(),
                        cgId: e.getCgId(),
                        inviteeId: e.getInviteeId(),
                        inviteeName: e.getInviteeName(),
                        prizeId: e.getPrizeId(),
                        gameId: e.getGameId(),
                        title: e.getTitle(),
                        description: e.getDescription(),
                        picture: e.getImgUrl(),
                        gem: e.getRewardGem(),
                        exp: e.getRewardExp(),
                        tickets: e.getRewardTickets(),
                        seen: e.getSeen(),
                        createdOn: e.getCreatedOn(),
                        winner: e.getWinnerNickname(),
                        winnerAvatarUrl: e.getWinnerAvatarUrl(),
                        nftContractAddress: e.getNftContractAddress(),
                        nftTokenId: e.getNftTokenId(),
                        canClaimDate: e.getCanClaimDate(),
                    },
                ],
            });
        } else {
            let idx = notificationList.findIndex(
                (n) => n.monthYear === _monthYear
            );
            if (idx > -1) {
                notificationList[idx].list.push({
                    id: e.getId(),
                    userId: e.getUserId(),
                    type: e.getNotiType(),
                    cgId: e.getCgId(),
                    inviteeId: e.getInviteeId(),
                    inviteeName: e.getInviteeName(),
                    prizeId: e.getPrizeId(),
                    gameId: e.getGameId(),
                    title: e.getTitle(),
                    description: e.getDescription(),
                    picture: e.getImgUrl(),
                    gem: e.getRewardGem(),
                    exp: e.getRewardExp(),
                    tickets: e.getRewardTickets(),
                    seen: e.getSeen(),
                    createdOn: e.getCreatedOn(),
                    winner: e.getWinnerNickname(),
                    winnerAvatarUrl: e.getWinnerAvatarUrl(),
                    nftContractAddress: e.getNftContractAddress(),
                    nftTokenId: e.getNftTokenId(),
                    canClaimDate: e.getCanClaimDate(),
                });
            } else {
                notificationList.push({
                    monthYear: _monthYear,
                    list: [
                        {
                            id: e.getId(),
                            userId: e.getUserId(),
                            type: e.getNotiType(),
                            cgId: e.getCgId(),
                            inviteeId: e.getInviteeId(),
                            inviteeName: e.getInviteeName(),
                            prizeId: e.getPrizeId(),
                            gameId: e.getGameId(),
                            title: e.getTitle(),
                            description: e.getDescription(),
                            picture: e.getImgUrl(),
                            gem: e.getRewardGem(),
                            exp: e.getRewardExp(),
                            tickets: e.getRewardTickets(),
                            seen: e.getSeen(),
                            createdOn: e.getCreatedOn(),
                            winner: e.getWinnerNickname(),
                            winnerAvatarUrl: e.getWinnerAvatarUrl(),
                            nftContractAddress: e.getNftContractAddress(),
                            nftTokenId: e.getNftTokenId(),
                            canClaimDate: e.getCanClaimDate(),
                        },
                    ],
                });
            }
        }
    });
    return notificationList;
}

// LIST WINNER ANNOUNCEMENT NOTIFICATION
export async function getWinnerAnnouncementNotifications(user, notiType) {
    const token = getToken();
    const request = new ListNotificationRequest();
    request.setUserId(user?.id);
    request.setNotiType(notiType);
    request.setLimit(100);
    request.setOffset(0);

    const response = await client.listNotification(request, {
        authorization: `Bearer ${token}`,
    });
    const data = response.getResultList();
    const winnerAnnouncementNotificationList = [];
    let _monthYear = "";
    data.forEach((e) => {
        _monthYear = `${
            monthYearDict[new Date(e.getCreatedOn() * 1000).getMonth()]
        } ${new Date(e.getCreatedOn() * 1000).getFullYear()}`;

        if (winnerAnnouncementNotificationList.length === 0) {
            winnerAnnouncementNotificationList.push({
                monthYear: _monthYear,
                list: [
                    {
                        id: e.getId(),
                        userId: e.getUserId(),
                        type: e.getNotiType(),
                        cgId: e.getCgId(),
                        inviteeId: e.getInviteeId(),
                        inviteeName: e.getInviteeName(),
                        prizeId: e.getPrizeId(),
                        gameId: e.getGameId(),
                        title: e.getTitle(),
                        description: e.getDescription(),
                        picture: e.getImgUrl(),
                        gem: e.getRewardGem(),
                        exp: e.getRewardExp(),
                        tickets: e.getRewardTickets(),
                        seen: e.getSeen(),
                        createdOn: e.getCreatedOn(),
                        winner: e.getWinnerNickname(),
                        winnerAvatarUrl: e.getWinnerAvatarUrl(),
                        nftContractAddress: e.getNftContractAddress(),
                        nftTokenId: e.getNftTokenId(),
                        canClaimDate: e.getCanClaimDate(),
                    },
                ],
            });
        } else {
            let idx = winnerAnnouncementNotificationList.findIndex(
                (n) => n.monthYear === _monthYear
            );
            if (idx > -1) {
                winnerAnnouncementNotificationList[idx].list.push({
                    id: e.getId(),
                    userId: e.getUserId(),
                    type: e.getNotiType(),
                    cgId: e.getCgId(),
                    inviteeId: e.getInviteeId(),
                    inviteeName: e.getInviteeName(),
                    prizeId: e.getPrizeId(),
                    gameId: e.getGameId(),
                    title: e.getTitle(),
                    description: e.getDescription(),
                    picture: e.getImgUrl(),
                    gem: e.getRewardGem(),
                    exp: e.getRewardExp(),
                    tickets: e.getRewardTickets(),
                    seen: e.getSeen(),
                    createdOn: e.getCreatedOn(),
                    winner: e.getWinnerNickname(),
                    winnerAvatarUrl: e.getWinnerAvatarUrl(),
                    nftContractAddress: e.getNftContractAddress(),
                    nftTokenId: e.getNftTokenId(),
                    canClaimDate: e.getCanClaimDate(),
                });
            } else {
                winnerAnnouncementNotificationList.push({
                    monthYear: _monthYear,
                    list: [
                        {
                            id: e.getId(),
                            userId: e.getUserId(),
                            type: e.getNotiType(),
                            cgId: e.getCgId(),
                            inviteeId: e.getInviteeId(),
                            inviteeName: e.getInviteeName(),
                            prizeId: e.getPrizeId(),
                            gameId: e.getGameId(),
                            title: e.getTitle(),
                            description: e.getDescription(),
                            picture: e.getImgUrl(),
                            gem: e.getRewardGem(),
                            exp: e.getRewardExp(),
                            tickets: e.getRewardTickets(),
                            seen: e.getSeen(),
                            createdOn: e.getCreatedOn(),
                            winner: e.getWinnerNickname(),
                            winnerAvatarUrl: e.getWinnerAvatarUrl(),
                            nftContractAddress: e.getNftContractAddress(),
                            nftTokenId: e.getNftTokenId(),
                            canClaimDate: e.getCanClaimDate(),
                        },
                    ],
                });
            }
        }
    });
    return winnerAnnouncementNotificationList;
}

export async function UpdateNotificationSeen(id, userId) {
    const token = getToken();
    const request = new UpdateNotificationSeenRequest();
    request.setId(id);
    request.setUserId(userId);

    const response = await client.updateNotificationSeen(request, {
        authorization: `Bearer ${token}`,
    });
    console.log(response.getResult());
    return response.getResult();
}

// FOR FUTURE PURPOSE
//
// GEMS PURCHASE
//
// export async function buyGems(
//     productType,
//     productName,
//     productPrice,
//     productCurrency,
//     productQuantity
// ) {
//     try {
//         const { data } = await axios.post(
//             `${process.env.REACT_APP_STRIPE_ENDPOINT}/create-checkout-session`,
//             {
//                 productType,
//                 productName,
//                 productPrice,
//                 productCurrency,
//                 productQuantity,
//             }
//         );
//         if (data?.status === 1) window.location.href = data.url;
//     } catch (error) {
//         console.log(error.message);
//     }
// }

//
//     GET BUY LIST
//
// export async function getBuyList(esmData, purchasedList) {
//     const token = localStorage.getItem("froyo-authenticationtoken")?.replaceAll('"', '');
//     let request = esmData.listBuyRequest;
//     request.setUserId(esmData.user.id);
//     request.setLimit(20);
//     request.setOffset(0);

//     try {
//         let response = await esmData.esmApiClient.listBuy(request, {
//             authorization: `Bearer ${token}`,
//             uid: esmData.user.providerUID,
//         });
//         let buyResultList = response.getResultList();

//         buyResultList.forEach((e) => {
//             purchasedList.push({
//                 id: e.getId(),
//                 itemTypeId: e.getItemTypeId(),
//                 itemId: e.getItemId(),
//                 itemTitle: e.getItemTitle(),
//                 paymentId: e.getPaymentId(),
//                 subId: e.getSubId(),
//                 price: e.getPrice(),
//                 createdOn: e.getCreatedOn(),
//             });
//         });
//     } catch (error) {
//         if (error.code === 7) {
//             console.log(error.message);
//         } else if (error.code === 13) console.log("BUY LIST: No Result found!");
//         else console.log(error);
//     }
// }
