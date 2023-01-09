import { ButtonBase } from "@mui/material"

function Ripple(props) {
    return (<>
        <ButtonBase sx={theme => ({
            "& .MuiTouchRipple-root span": {
                backgroundColor: `${theme.palette.secondary.main}!important`,
                opacity: .3,
            }
        })}>
            {props.children}
        </ButtonBase>
    </>);
}

export default Ripple;