// @L2 optimized
import React, { useEffect } from "react";
import Error from "next/error";
import { useDetectChain } from "src/fixtures/wallet/hooks";
import { isDenyProperty } from "src/config/utils";
import { useMemo } from "react";
import {
  useGetSTokenPositions,
  useGetStokenRewards,
} from "src/fixtures/dev-kit/hooks";
import { toNaturalNumber } from "src/fixtures/utility";
import { useProvider } from "src/fixtures/wallet/hooks";
import { useDetectSTokens } from "src/fixtures/dev-kit/hooks";
import { Box } from "@chakra-ui/react";
import { getStokenPositions } from "src/fixtures/dev-kit/client";
type Props = {};

const PropertyAddressDetail = (_: Props) => {
  const propertyAddress = "0xfb049b86Da8D2F4e335eF2281537f5dddbE77393";

  const { accountAddress: loggedInWallet, ethersProvider } = useProvider();
  const { name: network } = useDetectChain(ethersProvider);
  const isDeny = isDenyProperty(network, propertyAddress);
  const { accountAddress } = useProvider();
  const { sTokens } = useDetectSTokens(propertyAddress, accountAddress);
  const [fullmembershipStake, setFullMembershipStake] = React.useState(0);
  

  useEffect(() => {
    setFullMembershipStake(0);

    if (!isDeny) {
      if (loggedInWallet && sTokens) {
        sTokens.forEach((sToken) => {
          const position = getStokenPositions(ethersProvider!, sToken).then(
            (position) => {
              const totalStake = parseFloat(
                toNaturalNumber(position?.amount).toFixed()
              );
              if (totalStake > 100) {
                setFullMembershipStake(totalStake);
              }
            }
          );
        });
      }
    }
  }, [isDeny, loggedInWallet, sTokens]);

  return (
    <Box color="white">
      <h1>Property Address Detail</h1>
      <h2>{fullmembershipStake}</h2>
    </Box>
  );
};

export default PropertyAddressDetail;

// interface PositionTextProps {
//   sTokenId: number;
// }

// export const PositionText = ({ sTokenId }: PositionTextProps) => {
//   const { positions } = useGetSTokenPositions(sTokenId);
//   const { rewards } = useGetStokenRewards(sTokenId);
//   const positionAmount = useMemo(
//     () => toNaturalNumber(positions?.amount).toFixed(),
//     [positions?.amount]
//   );
//   const rewardAmount = useMemo(
//     () => toNaturalNumber(rewards?.entireReward).dp(6).toFixed(),
//     [rewards?.entireReward]
//   );
//   const { nonConnectedEthersProvider, ethersProvider } = useProvider();

//   useEffect(() => {
//     const position = getStokenPositions(ethersProvider!, sTokenId).then(
//       (position) => {
//         console.log("position", position);
//       }
//     );
//   }, [positions, rewards]);
//   return (
//     <div>
//       <div>stokenid: {sTokenId}</div>
//       <div>staked: {positionAmount}</div>
//       <div> rewards: {rewardAmount.toString()}</div>
//     </div>
//   );
// };
