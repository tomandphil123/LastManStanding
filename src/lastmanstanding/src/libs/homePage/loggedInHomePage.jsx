import React from "react";
import PremierLeagueStandings from "./premierLeagueStandings";
import Box from '@material-ui/core/Box';

export default function LoggedInHomePage(props) {
    return (
        <Box
        display="flex"
        flexWrap="nowrap"
        p={1}
        m={1}
        bgcolor="background.paper"
        css={{ maxWidth: 300 }}
      >
        <Box p={1} bgcolor="grey.300">
            <PremierLeagueStandings/>
        </Box>
      </Box>
    )
}