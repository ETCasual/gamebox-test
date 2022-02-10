import { monthYearDict } from 'Utils/Enums';

export default function getDateFormat(date) {
    const d = new Date(date);

    // Default format DD Month YYYY
    return d.getDate() + " " + monthYearDict[d.getMonth()] + " " + d.getFullYear();
}
