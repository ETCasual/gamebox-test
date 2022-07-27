import { monthYearDict } from "Utils/Enums";

function getDateFormat(date) {
    const d = new Date(date);

    // Default format DD Month YYYY
    return (
        d.getDate() + " " + monthYearDict[d.getMonth()] + " " + d.getFullYear()
    );
}

function getDateOrdinalFormat(date) {
    const getOrdinalNum = (n) => {
        return (
            n +
            (n > 0
                ? ["th", "st", "nd", "rd"][
                      (n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10
                  ]
                : "")
        );
    };
    const d = new Date(date);

    // Default format DD Month YYYY
    return (
        getOrdinalNum(d.getDate()) +
        " of " +
        monthYearDict[d.getMonth()] +
        " " +
        d.getFullYear()
    );
}

export { getDateFormat, getDateOrdinalFormat };
