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
            padding = "3%"
        >
                <Box paddingRight="4%"><PremierLeagueStandings results={props.results}/></Box>
                <Box paddingRight="4%"><PremierLeagueFixtures results={props.results}/></Box>
                <Box ><PremierLeagueResults results={props.results}/></Box>
            </Box>
        </> 
    )
}