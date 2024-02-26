import { useState, useEffect, useContext } from "react";
import Web3Context from "../../context/Web3Context";
import StakingContext from "../../context/StakingContext";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
// import JSBI from "jsbi";
import "./DisplayPannel.css";

const StakedAmount = () => {
  const { stakingContract, selectedAccount } = useContext(Web3Context);
  const { isReload } = useContext(StakingContext);
  const [stakedAmount, setStakedAmount] = useState("0");
  const [claimed, setClaimed] = useState("0");
  const [unClaimed, setUnClaimed] = useState("0");
  const [getInfo, setGetInfo] = useState({});

  useEffect(() => {
    const fetchStakedBalance = async () => {
      try {
        const amountStakedWei = await stakingContract.getStakerInfo(
          selectedAccount
        );
        const getInformation = await stakingContract.getDetails();
        setGetInfo(getInformation);
        const stakeAmount = amountStakedWei[1];
        const claimed = amountStakedWei[2];
        const UnClaimed = amountStakedWei[3];
        const amountStakedPoly = ethers.formatUnits(stakeAmount.toString(), 6);
        const amountClaimedPoly = ethers.formatUnits(claimed.toString(), 6);
        const amountUnClaimedPoly = ethers.formatUnits(UnClaimed.toString(), 6);
        setUnClaimed(amountUnClaimedPoly);
        setStakedAmount(amountStakedPoly);
        setClaimed(amountClaimedPoly);
      } catch (error) {
        //   toast.error("Error fetching staked amount");
        console.error(error.message);
      }
    };
    stakingContract && fetchStakedBalance();
  }, [stakingContract, selectedAccount, isReload]);

  const totalReward =
    isNaN(Number(claimed)) || isNaN(Number(unClaimed))
      ? 0
      : Number(claimed) + Number(unClaimed);

  const propertyDescriptions = [
    "isPaused",
    "resetClaimDelay",
    "stakeToken",
    "rewardToken",
    "startBlock",
    "endBlock",
    "claimDelay",
    "totalRewards",
    "totalFundsStaked",
    "totalRewardsDistributed",
  ];
  return (
    <div
      className="staked-amount"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "scroll",
        maxHeight: "200px",
      }}
    >
      <div className="data-pair">
        <p>Staked Amount:</p> <span>{stakedAmount}</span>
      </div>
      <div className="data-pair">
        <p>UnClaimed Reward:</p> <span>{claimed}</span>
      </div>
      <div className="data-pair">
        <p>Total Claimed Reward:</p> <span>{unClaimed}</span>
      </div>
      <div className="data-pair">
        <p>Total Earned Reward:</p> <span>{totalReward}</span>
      </div>
      <div>
        {Object.keys(getInfo)
          .filter((key) => ![0, 1, 4, 5].includes(Number(key)))
          .map((key) => {
            const value = getInfo[key].toString();
            return (
              <div className="data-pair" key={key}>
                <p>{propertyDescriptions[Number(key)]}:</p> <span>{value}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default StakedAmount;
