import {FC} from "react";
import {Box, Button, Container, Theme} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {media} from "../../../utility/media";
// import {howToUseSteps} from "../../../constants/main";

const containerPY = media(30, 45);

const useStyles = makeStyles((theme: Theme) => ({
    smartAnimate: {
        padding: ` 5px ${media(20, 50)}`,
        background: "linear-gradient(270deg, #675A37 -3.1%, rgba(107, 93, 58, 0.588329) 18.19%, rgba(242, 210, 124, 0.85) 47.68%, rgba(77, 69, 50, 0.78) 101.74%)",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: '8px',
        border: "none",
        color: "black",
        fontFamily: 'Raleway',
        fontStyle: "normal",
        fontWeight: '400',
        lineHeight: "23px",
        letterSpacing: "0.2em"
    },
    styleImage: {
        maxWidth: media(300, 450),
        width: "100%"
    },
    styleBtn: {
        background: "black",
        color: 'white',
        padding: "5px 20px",
        "&:hover": {
            background: "black",
        }
    },
    boxContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "start",
        flexWrap: "wrap",
        textAlign: 'center',
        [theme.breakpoints.up('xs')]: {
            // justifyContent: "center",
            justifyContent: "center"
        },
        [theme.breakpoints.up('md')]: {
            justifyContent: "space-around",

        },
        [theme.breakpoints.up('lg')]: {
            justifyContent: "space-between",

        },
        [theme.breakpoints.up('xl')]: {
            justifyContent: "space-between",
        },

    },
    media: {
        [theme.breakpoints.up('xs')]: {
            display: "none"
        },
        [theme.breakpoints.up('md')]: {
            display: "none",

        },
        [theme.breakpoints.up('lg')]: {
            display: "flex",

        },
        [theme.breakpoints.up('xl')]: {
            display: "flex",
        }
    }
}));

const Information: FC = () => {
    const styles = useStyles();
    return (
        <div style={{background: "#181818", padding: "80px 0"}}>
            <Container maxWidth="lg" className={styles.boxContainer}>
                <Box style={{marginTop: "30px"}}>
                    <button className={styles.smartAnimate}>FEATURES</button>
                    <ul>
                        <li style={{textAlign: "left", color: "white"}}>Eco-friendly</li>
                        <li style={{textAlign: "left", color: "white"}}>Convenient for all users</li>
                        <li style={{textAlign: "left", color: "white"}}>Great user interface</li>
                        <li style={{textAlign: "left", color: "white"}}>Elegant & luxury card</li>
                        <li style={{textAlign: "left", color: "white"}}>Safe and secure</li>
                        <li style={{textAlign: "left", color: "white"}}>No App required</li>
                        <li style={{textAlign: "left", color: "white"}}>Works with Apple and Android</li>
                        <li style={{textAlign: "left", color: "white"}}>Express same day delivery</li>
                    </ul>
                </Box>
                <Box style={{marginTop: "30px"}}>
                    <button className={styles.smartAnimate}>HOW IT WORKS</button>
                    <ol>
                        <li style={{textAlign: "left", color: "white"}}>Tap your card to the phone</li>
                        <li style={{textAlign: "left", color: "white"}}>Works with Apple and Android</li>
                        <li style={{textAlign: "left", color: "white"}}>Start add details</li>
                        <li style={{textAlign: "left", color: "white"}}>Save & Go share</li>
                    </ol>
                </Box>
                <Box style={{marginTop: "30px"}}>
                    <button className={styles.smartAnimate}>INTERFACE</button>
                    <Box style={{marginTop: "20px"}}>
                        <img src={require('../../../assets/images/OR.png')} className={styles.media} alt={""}/>
                    </Box>
                    <p style={{color: "white"}}>Scun to preview</p>
                </Box>
            </Container>
            <Box style={{textAlign: "center", marginTop: "20px"}}>
                <Button className={styles.styleBtn}>MORE INFORMATION</Button>
            </Box>
        </div>

    )
}


export default Information;
