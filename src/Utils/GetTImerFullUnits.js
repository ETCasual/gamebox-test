const getTimerFullUnits = (timer) => {
    const splitTIme = timer?.split(" ");

    const daysIdx = splitTIme.findIndex((s) => s.includes("d"));
    const hoursIdx = splitTIme.findIndex((s) => s.includes("h"));
    const minutesIdx = splitTIme.findIndex((s) => s.includes("m"));
    const secondsIdx = splitTIme.findIndex((s) => s.includes("s"));

    const daysIncludeS =
        daysIdx > -1
            ? parseInt(splitTIme[daysIdx].split("d")[0]) > 1
                ? " days"
                : " day"
            : "";
    const hoursIncludeS =
        hoursIdx > -1
            ? parseInt(splitTIme[hoursIdx].split("h")[0]) > 1
                ? " hours"
                : " hour"
            : "";
    const minutesIncludeS =
        minutesIdx > -1
            ? parseInt(splitTIme[minutesIdx].split("m")[0]) > 1
                ? " minutes"
                : " minute"
            : "";
    const secondsIncludeS =
        secondsIdx > -1
            ? parseInt(splitTIme[secondsIdx].split("s")[0]) > 1
                ? " seconds"
                : " second"
            : "";

    let replacedTimeUnits =  '';
    
    if (daysIdx > -1) {
        replacedTimeUnits += `${splitTIme[daysIdx]?.replaceAll("d", daysIncludeS)} `;
    }

    if (hoursIdx > -1) {
        replacedTimeUnits += `${splitTIme[hoursIdx]?.replace("h", hoursIncludeS)} `;
    }
    
    if (minutesIdx > -1) {
        replacedTimeUnits += `${splitTIme[minutesIdx]?.replace("m", minutesIncludeS)} `;
    }
    
    if (secondsIdx > -1) {
        replacedTimeUnits += `${splitTIme[secondsIdx]?.replace("s", secondsIncludeS)} `;
    }

    return replacedTimeUnits;
};

export default getTimerFullUnits;
