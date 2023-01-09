

import { FormControl, InputLabel, Select, MenuItem, Box, Input } from "@mui/material";


const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 300,
            width: 250,
        },
    },
};


function Selector(props) {


    return (<>
        <FormControl
            // variant="standard"
            className="custom-selector"
            sx={{ ...props.sx, maxHeight: '300px', color: 'primary.main', minWidth: '12rem'}}
        >

            {props.label && <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>}

            <Select

                value={props.selectedOption}
                label={props.label}
                onChange={props.changeHandler}
                MenuProps={MenuProps}
                color='secondary'
               
            >



                {props.items ||
                    props.options.map((option, index) => <MenuItem value={option} key={`category-${index}`}>{option.label}</MenuItem>)
                }
            </Select>
        </FormControl>

    </>);
}


export default Selector;