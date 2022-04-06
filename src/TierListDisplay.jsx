import { Box, Grid, Typography } from "@mui/material";
import { Fragment } from "react";

const TierListDisplay = (props) => {
  const tierList = props.tierList;
  const handleClick = props.handleClick;
  const sortFnc = props.sortFnc;

  const getPercentage = (currTierList) => {
    let done = 0;
    let total = 0;

    for (const [k, v] of Object.entries(currTierList)) {
      v.forEach((song) => {
        total++;

        if (song.done) {
          done++;
        }
      })
    }

    return [done, total];
  }

  const percentage = getPercentage(tierList);
  const done = percentage[0];
  const total = percentage[1];

  return (
    <div>
      <Box sx={{ m: 2 }} />
      <Typography className="topText">{done} out of {total} ({(done / total * 100).toFixed(2)}%)</Typography>
      <Box sx={{ m: 1 }} />

      <Grid container spacing={1}>
        {Object.entries(tierList).sort(sortFnc).map((item) => {
          const tier = item[0];
          const songs = item[1];

          return (
            <Fragment key={tier + "fragment"}>
              <Grid item xs={12} key={tier} className="header">
                <Typography className="text">
                  {tier}
                </Typography>
              </Grid>

              {songs.map((song) => (
                <Grid item xs={3} key={song.name} onClick={() => handleClick(song, tierList)}
                      className={`song ${song.underlined ? "underlined" : ""} ${song.done ? "done" : ""}`}>
                  <Typography className="text">{song.name}</Typography>
                </Grid>)
              )}
            </Fragment>
          );
        })}
      </Grid>

      <Box sx={{ m: 4 }} />
    </div>
  );
}

export default TierListDisplay;
