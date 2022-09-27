import i18next from "i18n";

export const useTime = (timer) => {
    if (timer === "Ended") {
        return i18next.t("timer_ends");
    } else return timer;
};
