import { Fragment, useState } from "react";
import { Box, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

import { styled } from '@mui/material/styles';
import style from "../styles/Test.module.scss";

const MyEl = styled('p')(
    ({ theme }) => `
    color: ${theme.palette.error.main};
    border:2px solid red;
  `,
);
function Test({ className = '' }) {

    const [age, setAge] = useState(10);
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (<div className={className}>
        <h1>test</h1>
        {/* <MyEl>ciao</MyEl>
        <Box sx={theme => { return { border: '2px solid green', color: `${theme.palette.error.main}` } }}>holllaa</Box> */}

        <Box
            className="test-class"
            sx={{
                "& .MuiSelect-select": {
                    border: "2px solid red",
                    backgroundColor: 'blue'
                },
                "& .MuiPopover-paper": {
                    border: "2px solid red",
                    backgroundColor: 'blue'
                }
            }}>

            <FormControl

                sx={{
                    width: 300,
                    // height: 40,
                    marginRight: 50,
                    border: "1px solid red",
                    color: "#f0f",
                    "& .MuiSvgIcon-root": {
                        color: "red",
                    },
                    "& .MuiPopover-paper": {
                        border: "2px solid red"
                    }
                }}
            // className={style.CertainLength}
            >
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                >
                    <Box sx={{ height: '30px' }}>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>

                    </Box>
                </Select>
            </FormControl>
        </Box>


        <div className={style.BlueInside}>
            <div>
                test
            </div>
            <p>test1</p>
            <p>test2</p>
        </div>
    </div>);
}

export default Test;