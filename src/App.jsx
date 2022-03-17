import "./App.css";

import tierList from "./data/tierList";
import { Box, Container, Grid, Link, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";


const App = () => {
  const [currTierList, setCurrTierlist] = useState(tierList);

  useEffect(() => {
    if (localStorage.getItem("currTierList") !== null) {
      const newTierList = JSON.parse(localStorage.getItem("currTierList"));
      setCurrTierlist(newTierList);
    }

    getPercentage(currTierList);
  }, []);

  const handleClick = (song, currTierList) => {
    song.done = !song.done;

    const json = JSON.stringify(currTierList);
    localStorage.setItem("currTierList", json);

    const newTierList = JSON.parse(json);
    setCurrTierlist(newTierList);
  }

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

  const percentage = getPercentage(currTierList);
  const done = percentage[0];
  const total = percentage[1];

  return (
    <div>
      <Container>

        <Box sx={{ m: 2 }} />
        <Typography className="topText">{done} out of {total} ({(done / total * 100).toFixed(2)}%)</Typography>
        <Box sx={{ m: 1 }} />

        <Grid container spacing={1}>
          {Object.entries(currTierList).map((item) => {

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
                  <Grid item xs={3} key={song.name} onClick={() => handleClick(song, currTierList)}
                        className={`song ${song.underlined ? "underlined" : ""} ${song.done ? "done" : ""}`}>
                    <Typography className="text">{song.name}</Typography>
                  </Grid>)
                )}
              </Fragment>
            );
          })}
        </Grid>

        <Box sx={{ m: 8 }} />
        <Typography>Original tier list from&nbsp;
          <Link href="https://note.com/rice_place/n/n336a8c17b43d">https://note.com/rice_place/n/n336a8c17b43d</Link>
        </Typography>
      </Container>
    </div>
  );
};

export default App;
