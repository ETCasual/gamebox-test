import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_USER_WALLET } from "redux/types";

// Utils
import {
    handleConnectWallet,
    disconnectWallet,
    handleMetamask,
    handleWalletConnect,
} from "Utils/ConnectWallet";

// Modal
import SelectWalletsModal from "Components/Modals/SelectWallets.modal";
import InvalidWalletModal from "Components/Modals/InvalidWallet.modal";

const ConnectWallet = ({
    selectWalletModalShown,
    setSelectWalletModalShown,
    invalidWalletModalShown,
    setInvalidWalletModalShown,
}) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.userData);

    const [invalidWalletAddress, setInvalidWalletAddress] = useState("");
    const handleConnectMetamask = async () => {
        try {
            await handleMetamask(dispatch);
            await handleConnectWallet(dispatch, user.bindWalletAddress);
        } catch (err) {
            if (err.code === 1001) {
                setInvalidWalletAddress(err.walletAddress);
                setInvalidWalletModalShown(true);

                await handleWalletDisconnect();
            }
        } finally {
            setSelectWalletModalShown(false);
        }
    };

    const handleConnectWalletConnect = async () => {
        try {
            await handleWalletConnect(dispatch);
            await handleConnectWallet(dispatch, user.bindWalletAddress);
        } catch (err) {
            if (err.code === 1001) {
                console.log(err.walletAddress);
                setInvalidWalletAddress(err.walletAddress);
                setInvalidWalletModalShown(true);

                await handleWalletDisconnect();
            }
            console.log(err);
        } finally {
            setSelectWalletModalShown(false);
        }
    };

    const handleWalletDisconnect = async () => {
        await disconnectWallet();
        dispatch({
            type: UPDATE_USER_WALLET,
            payload: {
                ...user,
                walletAddress: null,
                tokenBalance: null,
                tokenSymbol: null,
                network: null,
            },
        });
    };

    return (
        <>
            {selectWalletModalShown && (
                <SelectWalletsModal
                    handleInstructionsCloseBtn={() => {
                        setSelectWalletModalShown(false);
                    }}
                    handleConnectMetamask={handleConnectMetamask}
                    handleConnectWalletConnect={handleConnectWalletConnect}
                />
            )}
            {invalidWalletModalShown && (
                <InvalidWalletModal
                    handleCloseBtn={() => setInvalidWalletModalShown(false)}
                    walletAddress={invalidWalletAddress}
                    bindWalletAddress={user.bindWalletAddress}
                />
            )}
        </>
    );
};

export default ConnectWallet;
