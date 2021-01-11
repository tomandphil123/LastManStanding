import React from "react";
import PremierLeagueStandings from "./premierLeagueStandings";
import PremierLeagueFixtures from "./premierLeagueFixtures";
import PremierLeagueResults from "./premierLeagueResults";
import Box from '@material-ui/core/Box';

export default function LoggedInHomePage(props) {
    return (
        <>
        <Box
        display="flex"
        flexWrap="nowrap"
        p={1}
        m={1}
        bgcolor="#775295"
        padding = "3%"
        css={{maxWidth:"100%"}}
      >
            <Box paddingRight="4%"><PremierLeagueStandings/></Box>
            <Box paddingRight="4%"><PremierLeagueFixtures/></Box>
            <Box ><PremierLeagueResults/></Box>
        </Box>
        </> 
    )
}