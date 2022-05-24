const convertSecondsToHours = (timestamp) => {
    const date_future = new Date(timestamp * 1000);
    const date_now = new Date();

    let seconds = Math.floor((date_future - date_now) / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    hours = hours - days * 24;
    minutes = minutes - days * 24 * 60 - hours * 60;
    seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

    if (days < -3 || hours < -3 || minutes < -3 || seconds < -3)
        // window.location.reload(true);
        return "Ended";
    else if (days === 0 && hours === 0 && minutes === 0 && seconds === 0)
        return "Ended";
    else if (days < 0 || hours < 0 || minutes < 0 || seconds < 0)
        return "0d 0h 0m 0s";
    else {
        if (days >= 0 && hours >= 0 && minutes >= 0 && seconds >= 0)
            return `${days > 0 ? `${days}d` : ""} ${
                hours > 0 ? `${hours}h` : ""
            } ${minutes}m ${seconds}s`;
        else return "0d 0h 0m 0s";
    }
};

export default convertSecondsToHours;
