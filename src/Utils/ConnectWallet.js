import networks from "Utils/Networks";

export async function handleConnectWallet() {
    if (!window.ethereum) {
        alert("Install Metamask!");
        return;
    }

    try {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
            params: [
                {
                    ...networks["bsc"],
                },
            ],
        });
        return accounts[0];
    } catch (error) {
        console.log(error.code);
        // 4001 = User rejected the connection request
        // -32002 = User needs to login into metamask plugin
        if (error.code === -32002) {
            alert("Please Login into MetaMask");
        }
    }
}
