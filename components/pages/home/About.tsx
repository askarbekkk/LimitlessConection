import {FC} from "react";
import {Container, Typography, Box, Theme} from "@mui/material";
import {media} from "../../../utility/media";
import {makeStyles} from "@mui/styles";


const containerPY = media(30, 45);

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: containerPY,
        paddingBottom: containerPY,
    },
    img: {
        maxWidth: media(300, 500),
        width: "100%",
        height: media(180, 480),
        objectFit: 'cover',
        margin: `${media(5, 10)} ${media(2, 5)}`,
    },
    smartAnimate: {
        padding: ` 5px ${media(20, 110)}`,
        background: "linear-gradient(270deg, #675A37 -3.1%, rgba(107, 93, 58, 0.588329) 18.19%, rgba(242, 210, 124, 0.85) 47.68%, rgba(77, 69, 50, 0.78) 101.74%)",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: '8px',
        border: "none",
        fontFamily: 'Raleway',
        color: "black",
        fontStyle: "normal",
        fontWeight: '400',
        lineHeight: "23px",
        letterSpacing: "0.2em",
        marginBottom: media(10, 50)
    },
    boxContainer: {
        display: "flex",
        flexWrap: "wrap",
        marginTop: "50px",
        justifyContent: "space-between",
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
            justifyContent: "space-between",
        }
    }
}));


const About: FC = () => {
    const styles = useStyles();
    return (
        <div style={{background: "#181818"}}>
            <Container maxWidth="lg" className={styles.container}>
                <Typography className={styles.smartAnimate}>
                    ABOUT US
                </Typography>
                <Typography color="secondary" textAlign="center" component="p" fontSize={media(16, 17)} fontWeight="400">
                    Temir card-new generation smart business card with more advanced options. You can add your contact
                    details, social media accounts, pictures and more other details and you can update at any time. No
                    more messing around with a paper business cards. One card for life time.
                </Typography>
                <Box className={styles.boxContainer}>
                    <img src={require('../../../assets/images/about.png')} className={styles.img} alt={""}/>
                    <img src={require('../../../assets/images/about2.png')} className={styles.img} alt={""}/>
                    <img src={require('../../../assets/images/about3.png')} className={styles.img} alt={""}/>
                    <img src={require('../../../assets/images/about4.png')} className={styles.img} alt={""}/>
                </Box>

            </Container>
        </div>

    )
}

export default About;
