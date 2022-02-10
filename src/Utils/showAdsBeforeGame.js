export default function showAdsBeforeGame(config) {
    let gameCount = parseInt(localStorage.getItem("gameCount")) || 0;
    if (config.adsPerGame === gameCount) {
        localStorage.setItem("gameCount", 0);
        window.adBreak({
            type: "start", // The type of this placement (See below)
            name: "game_started", // A descriptive name for this placement
            beforeAd: () => {
                console.log("Before AD");
            }, // Prepare for the ad. Mute and pause the game flow
            afterAd: () => {
                console.log("After AD");
            },
            adBreakDone: ({ breakStatus }) => {
                if (breakStatus === "viewed")
                    console.log("1st Ad Done", breakStatus);
                else {
                    window.adBreak({
                        type: "start", // The type of this placement (See below)
                        name: "game_started", // A descriptive name for this placement
                        beforeAd: () => {
                            console.log("Before AD");
                        }, // Prepare for the ad. Mute and pause the game flow
                        afterAd: () => {
                            console.log("After AD");
                        },
                        adBreakDone: ({ breakStatus }) => {
                            console.log("2nd Ad Done", breakStatus);
                        },
                    });
                }
            },
        });
    }
}
