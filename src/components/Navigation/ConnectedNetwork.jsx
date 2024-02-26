import { useContext } from "react";
import Web3Context from "../../context/Web3Context";

const ConnectedNetwork = () => {
  const { chainId } = useContext(Web3Context);
  if (chainId === null) {
    return <p className="network">Not connected</p>;
  } else if (Number(chainId) === 80001) {
    return <p className="network">Polygon Testnet</p>;
  } else {
    return <p className="network"> Network Not Detected</p>;
  }
};
export default ConnectedNetwork;
