// import { useRef } from "react";
import { Paper } from "@mui/material"

function TranslucentCard(props) {

    // const shadowDirection = useRef(null);
    // if (props.shadow)
    return (
        <>
            <Paper
                sx={theme => ({
                    ...props.sx,
                    minHeight: "100%",
                    px: props.px || 0,
                    py: props.py || 0,
                    backgroundColor: `rgba(255,255,255,0.3)`,
                    backdropFilter: 'blur(6px)',
                    boxShadow: `${props.shadow || '-10px 0px'} 20px rgba(200,200,200,0.3)`
                })}
                elevation={0}
            >{props.children}</Paper>
        </>
    );
}

export default TranslucentCard;