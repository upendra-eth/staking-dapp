import RewardRate from "./RewardRate";
import StakedAmount from "./StakedAmount";

const DisplayPannel = ()=>{
  return(   
  <div className="top-wrapper">
    <StakedAmount/>
    <RewardRate/>
  </div>
  )
}
export default DisplayPannel;