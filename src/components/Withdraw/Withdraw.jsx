import { useContext, useRef } from "react";
import { ethers } from "ethers";
import Web3Context from "../../context/Web3Context";
import StakingContext from "../../context/StakingContext";
import Button from "../Button/Button";
import { toast } from "react-hot-toast";
import "./Withdraw.css";

const WithdrawStakeAmount = () => {
  const { stakingContract } = useContext(Web3Context);

  const withdrawStakeToken = async (e) => {
    e.preventDefault();
    try {
      const transaction = await stakingContract.unstake();
      await toast.promise(transaction.wait(), {
        loading: "Transaction is pending...",
        success: "Transaction successful 👌",
        error: "Transaction failed 🤯",
      });
    } catch (error) {
      toast.error("Withdraw Failed");
      console.error(error.message);
    }
  };
  return (
    <form className="withdraw-form" onSubmit={withdrawStakeToken}>
      <Button
        onClick={withdrawStakeToken}
        type="submit"
        label="Withdraw Staked Token"
      />
    </form>
  );
};
export default WithdrawStakeAmount;
