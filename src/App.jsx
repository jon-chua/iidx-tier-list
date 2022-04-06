import "./App.css";

import tierList from "./data/tierList";
import tierList2 from "./data/tierList2";
import { Container, Link, Tab, Typography } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useEffect, useState } from "react";
import TierListDisplay from "./TierListDisplay.jsx";


const App = () => {
  const [currTierList, setCurrTierlist] = useState(tierList);
  const [currTierList2, setCurrTierlist2] = useState(tierList2);

  const sortFnc1 = (a, b) => a - b;
  const sortFnc2 = (a, b) => -(a - b);

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (localStorage.getItem("currTierList") !== null) {
      const newTierList = JSON.parse(localStorage.getItem("currTierList"));
      setCurrTierlist(newTierList);
    }

    if (localStorage.getItem("currTierList2") !== null) {
      const newTierList2 = JSON.parse(localStorage.getItem("currTierList2"));
      setCurrTierlist2(newTierList2);
    }
  }, []);

  const handleClick = (song, currTierList) => {
    song.done = !song.done;

    const json = JSON.stringify(currTierList);
    localStorage.setItem("currTierList", json);

    const newTierList = JSON.parse(json);
    setCurrTierlist(newTierList);
  }

  const handleClick2 = (song, currTierList) => {
    song.done = !song.done;

    const json2 = JSON.stringify(currTierList);
    localStorage.setItem("currTierList2", json2);

    const newTierList2 = JSON.parse(json2);
    setCurrTierlist2(newTierList2);
  }

  return (
    <div>
      <Container>
        <TabContext value={value}>
          <TabList onChange={handleChange}>
            <Tab label="Tier List 1" value="1" />
            <Tab label="Tier List 2" value="2" />
          </TabList>

          <TabPanel value="1">
            <TierListDisplay tierList={currTierList} handleClick={handleClick} sortFnc={sortFnc2} />
            <Typography>
              Original tier list from:&nbsp;
              <Link href="https://note.com/rice_place/n/n336a8c17b43d">
                https://note.com/rice_place/n/n336a8c17b43d
              </Link>
            </Typography>
          </TabPanel>

          <TabPanel value="2">
            <TierListDisplay tierList={currTierList2} handleClick={handleClick2} sortFnc={sortFnc1} />
            <Typography>
              Original tier list from:&nbsp;
              <Link href="https://docs.google.com/spreadsheets/d/e/2PACX-1vQSx2BAkTIKccQzn8aXtCNJR1TRPWCismRHDKQf30T3_sVWBmW4vLDd_DSx6UT98A/pubhtml?gid=1595792734&single=true">
                https://docs.google.com/spreadsheets/d/e/2PACX-1vQSx2BAkTIKccQzn8aXtCNJR1TRPWCismRHDKQf30T3_sVWBmW4vLDd_DSx6UT98A/pubhtml?gid=1595792734&single=true
              </Link>
            </Typography>
          </TabPanel>
        </TabContext>
      </Container>
    </div>
  );
};

export default App;
