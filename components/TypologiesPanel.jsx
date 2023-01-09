import { Box, Button } from "@mui/material";
import { useState } from "react";
import style from "../styles/Typologies.module.css"
function TypologiesPanel(props) {
    const [currentDiagram, setCurrentDiagram] = useState(props.contents.diagram[0]);

    function handleSelection(index) {
        setCurrentDiagram(props.contents.diagram[index])
    }

    return (<>
        <Box
            width="100%"
            height="100%"
            sx={{ backgroundColor: "black", color: "secondary.main" }}
            className={style.diagramWrapper}>
            <img
                className={style.polarDiagram}
                src={`${process.env.NEXT_PUBLIC_BASE_PATH}/${currentDiagram.polar}`}
            /><img
                className={style.mapDiagram}
                src={`${process.env.NEXT_PUBLIC_BASE_PATH}/${currentDiagram.map}`}
            />

            <Box className={style.navPanel}
                sx={{
                    display: 'flex',
                    flexDirection: 'column'

                }}

            >
                {props.contents.diagram.map((element, index) =>
                    <Button
                        color='secondary'
                        variant={currentDiagram.label === element.label ? 'contained' : 'outlined'}
                        sx={{ my: 0.2 }}
                        size="small"
                        key={`nav-${index}`}
                        onClick={() => handleSelection(index)}
                    >{element.label} </Button>
                )}

            </Box>
            <Box className={style.diagramDetails}
                sx={{
                    typography: 'body',
                    fontWeight: "thin",
                }}>
                {currentDiagram.details}
            </Box>
        </Box>
    </>);
}


export default TypologiesPanel;


