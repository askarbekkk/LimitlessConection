import {FC} from "react";
import {Box, Container, Theme, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {media} from "../../../utility/media";
// import {howToUseSteps} from "../../../constants/main";

const containerPY = media(30, 45);

const useStyles = makeStyles((theme: Theme) => ({
    smartAnimate: {
        padding: ` 5px ${media(20, 110)}`,
        background: "linear-gradient(270deg, #675A37 -3.1%, rgba(107, 93, 58, 0.588329) 18.19%, rgba(242, 210, 124, 0.85) 47.68%, rgba(77, 69, 50, 0.78) 101.74%)",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: '8px',
        border: "none",
        color: "black",
        fontFamily: 'Raleway',
        fontStyle: "normal",
        fontWeight: '400',
        lineHeight: "23px",
        letterSpacing: "0.2em",
        marginBottom: "20px"
    },
    smartDesc: {},
    imagePhones: {
        maxWidth: media(300, 500),
        textAlign: "center",
        width: "100%",
        padding: "20px 0"
    },
    boxContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexWrap: "wrap-reverse",
        textAlign: "center",
        [theme.breakpoints.up('xs')]: {
            // justifyContent: "center",
            justifyContent: "center"
        },
        [theme.breakpoints.up('md')]: {
            justifyContent: "space-around",

        },
        [theme.breakpoints.up('lg')]: {
            justifyContent: "space-around",

        },
        [theme.breakpoints.up('xl')]: {
            justifyContent: "space-around",
        },
    }
}));

const EasyToUse: FC = () => {
    const styles = useStyles();
    return (
        <div style={{background: "#181818", paddingTop: "50px"}}>
            <Container maxWidth="xl" className={styles.boxContainer}>
                <img className={styles.imagePhones} src={require('../../../assets/images/iPhone 13 Pro.png')} alt={""}/>
                <Box style={{width: "530px"}}>
                    <button className={styles.smartAnimate}>SMART INTERFACE</button>
                    <Typography color="white">The shortest route to your customers is through their mobile phones.Express yourself
                        in ways never before possible with a Temir smart business card. You can showcase your work
                        by uploading rich content </Typography>
                </Box>
            </Container>
        </div>

    )
}


export default EasyToUse;
