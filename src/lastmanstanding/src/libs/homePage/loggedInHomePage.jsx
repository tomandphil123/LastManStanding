import React from "react";
import PremierLeagueStandings from "./premierLeagueStandings";
import PremierLeagueFixtures from "./premierLeagueFixtures";
import PremierLeagueResults from "./premierLeagueResults";
import Box from '@material-ui/core/Box';

const styles = {
    homePage : {
        backgroundImage: `url("https://cdn.wallpapersafari.com/43/53/vsk4GN.jpg")`,
        height: 900
    }
}

export default function LoggedInHomePage(props) {
    return ( 
        <>
            <Box
            display="flex"
            flexWrap="nowrap"
            p={1}
            m={1}
            padding = "3%"
            style={styles.homePage}
            css={{maxWidth:"100%"}}
        >
                <Box paddingRight="4%"><PremierLeagueStandings/></Box>
                <Box paddingRight="4%"><PremierLeagueFixtures/></Box>
                <Box ><PremierLeagueResults/></Box>
            </Box>
        </> 
    )
}