import {FC} from "react";
import {Box, Container, Paper, Typography, Theme} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {media} from "../../../utility/media";
// import bg from "../../../assets/images/lcBG.png"


const containerPY = media(30, 45);

const useStyles = makeStyles( (theme:Theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom: containerPY,
    },
    cardImg: {
        maxWidth: media(200, 370),
        marginRight: media(50, 100),
        width: '100%',
    },
    phoneBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    phoneImg: {
        maxWidth: media(200, 370),
        width: '100%',
    },
    boxAbsolute: {
        position: 'absolute'
    },
    boxTypogrif: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    bannerLcT: {
        fontFamily: "sans-serif",
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: "20px",
        lineHeight: "24px",
        letterSpacing: "0.1em",
        color: "#FFFFFF"
    },
    bannerLcT1: {
        fontFamily: "sans-serif",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "17px",
        letterSpacing: "0.1em",
        color: "#FFFFFF",
        marginTop: "20px"
    },
    bannerLcT2: {
        fontFamily: "sans-serif",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "16px",
        letterSpacing: "0.13em",
        color: "#979797",
        marginTop: "20px"

    },
    "@keyframes myEffect": {
        "0%": {
            transform: "translateX(-200%)"
        },
        "100%": {
            transform: "translateX(0)"
        }
    },
    "@keyframes myEffectOn": {
        "0%": {
            opacity: "0"
        },
        "99%": {
            opacity: "0"
        },
        "100%": {
            opacity: "1"

        }
    },
    imageAbsolute: {
        position: "absolute",
        padding: media(15, 25)

    },
    imageAbsoluteImg: {
        width: media(200, 370),
        animation: `$myEffectOn 3000ms ${theme.transitions.easing.easeInOut}`,
        marginTop : media(10, 20),
        marginLeft :media(15, 25)
    },
    imageCardAbsolute: {
        position: "absolute",
        width: media(200, 400),
        marginTop: media(-40, -95),
        marginLeft: "-80px",
        animation: `$myEffect 3000ms ${theme.transitions.easing.easeInOut}`,
    }
}));

const Banner: FC = () => {
    const styles = useStyles();
    return (
        <Paper style={{background: "#000"}}>
            <Paper style={{
                minHeight: "100vh",
                background: `url(${require("../../../assets/images/lcBG.png")}) no-repeat center/cover`,
                paddingBottom: media(20, 50),
                boxShadow: "inset 0em -1em 1em black"
            }}>
                <Container maxWidth="xl">
                    <Box style={{minHeight: "100vh",display: "flex", justifyContent: "space-around", alignItems: "center", flexWrap: "wrap-reverse"}}>
                        <Box/>
                        <Box style={{width: "300px", height: "300px", marginTop: media(45, 0)}}>
                            <img className={styles.imageCardAbsolute} src={require("../../../assets/images/goldLC.png")} alt="" />
                            <Paper className={styles.imageAbsolute} style={{background: `url(${require("../../../assets/images/phonesBGLC.png")}) no-repeat center/cover`}}>
                                <img src={require("../../../assets/images/limitlesss 1.png")} className={styles.imageAbsoluteImg} alt=""/>
                            </Paper>
                        </Box>
                        <Box style={{textAlign: "center", marginTop: media(100, 0)}}>
                            <Typography className={styles.bannerLcT}>SMART METAL CARD</Typography>
                            <Typography className={styles.bannerLcT1}>Stand out and make a good impression </Typography>
                            <Typography className={styles.bannerLcT2}>Have them remember you long after <br/> the meeting is over.</Typography>
                        </Box>
                    </Box>
                </Container>
            </Paper>
        </Paper>

    )
}


export default Banner;
