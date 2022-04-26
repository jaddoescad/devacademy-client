// @ts-check

import { ReactNode } from "react";
import Header from "../components/FrontPage/Header";
import SplitScreen from "../components/FrontPage/SplitScreenFrontPage";
import { Box, Center } from "@chakra-ui/react";
import StepsComponent from "../components/FrontPage/StepsComponents";
import DevProtocolOverview from "../components/FrontPage/DevProtocolOverview";
import FeaturedCourses from "../components/FrontPage/FeaturedCourses";
import AvailableOnL2 from "../components/FrontPage/AvailableOnL2";
import Footer from "../components/FrontPage/Footer";
import Head from "next/head";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Dev Academy</title>
        <link rel="shortcut icon" href="/favicon.png" />
        <meta property="og:title" content="Dev Academy" key="title" />
        <meta property="og:image" content="/logo-black-background.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="og:description" content="Dev Academy is an online education platform economically powered by Dev Protocol. Stake the DEV token on our platform and get full access to various courses from top instructors from all over the world, including an APY on your staked contribution."/>
      </Head>
      <Box h="100%" backgroundColor="rgb(13,15,31, 1)">
        <Box
          w="100%"
          h="100%"
          bgGradient="linear(to-b, rgba(200, 200, 200,0.1),rgba(100, 100, 0, 0))"
        >
          <Header />
          <Center>
            <Box maxWidth={"1200px"} height={"100%"}>
              <SplitScreen />
              <StepsComponent />
              <DevProtocolOverview />
              <FeaturedCourses />
              <AvailableOnL2 />
            </Box>
          </Center>
          <Footer />
        </Box>
      </Box>
    </>
  );
}
