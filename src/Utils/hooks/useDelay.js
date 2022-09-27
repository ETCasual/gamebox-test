import _ from "lodash";

export class Timer {
    constructor(callback, delay) {
        var timerId,
            start,
            remaining = delay;

        this.pause = function () {
            clearTimeout(timerId);
            timerId = null;
            remaining -= Date.now() - start;
        };

        this.resume = function () {
            if (timerId) {
                return;
            }

            start = Date.now();
            timerId = _.delay(callback, remaining);
        };

        this.resume();
    }
}
