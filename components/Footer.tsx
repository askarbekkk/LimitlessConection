import {Container, Typography, Link as MuiLink, Theme} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {Box} from "@mui/system";
import {FC, useMemo} from "react";
import {footerLinks, socials} from "../constants/main";
import {media} from "../utility/media";
import NextLink from 'next/link';


const containerPY = media(30, 45);


const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: "flex",
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap :"wrap",
        [theme.breakpoints.up('xs')]: {
            justifyContent: 'center',

        },
        [theme.breakpoints.up('md')]: {
            justifyContent: 'space-between',


        },
        [theme.breakpoints.up('lg')]: {
            justifyContent: 'space-between',


        },
        [theme.breakpoints.up('xl')]: {
            justifyContent: 'space-between',
        }
    },
    list: {},
    listItem: {
        fontSize: media(14, 17),
        fontWeight: '400',
        color: theme.palette.secondary.main,
    },
    socialsList: {

    },
    socialIconLink: {
        width: media(28, 32),
        height: media(28, 32),
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 10px',
    },
    socialIcon: {
        fontSize: media(17, 20),
        color: theme.palette.secondary.main,
    },
    footerTitle: {
        fontFamily: 'Raleway',
        fontWeight: "400",
        fontSize: "14px",
        color: "#DCDCDC",
        letterSpacing: "0.1em",
        padding: "20px 0",
    },
    media: {
        [theme.breakpoints.up('xs')]: {
            display: "none",

        },
        [theme.breakpoints.up('md')]: {
            display: "flex",
            justifyContent: "center",
            marginBottom: '20px'

        },
        [theme.breakpoints.up('lg')]: {
            display: "flex",
            justifyContent: "center",
            marginBottom: '20px'

        },
        [theme.breakpoints.up('xl')]: {
            display: "flex",
            justifyContent: "center"

        }
    }

}));


const Footer: FC = () => {
    const styles = useStyles();


    const outFooterLinks = useMemo(() => {
        return footerLinks.map((el, i) => {
            const propsToLink: any = {
                underline: 'none'
            }
            if (!el.isRelativePath) {
                propsToLink['href'] = el.link;
            }
            const link = (
                <>
                    <MuiLink key={i} {...propsToLink} className={styles.listItem}>
                        {el.title}
                    </MuiLink>
                    <br/>
                    <br/>
                </>
            )
            return el.isRelativePath ? (
                <>
                    <NextLink key={i} href={el.link}>
                        {link}
                    </NextLink>
                    <br/>
                </>
            ) : link;
        })
    }, []);
    return (
        <div style={{paddingTop: "40px", background: "#181818"}}>
            <Container maxWidth={false} disableGutters sx={{}}>
                <Container component="footer" maxWidth="lg" className={styles.container}>
                    <Typography fontSize={media(20, 24)} fontWeight="600" color="secondary" className={styles.media}>
                        <img src={require('../assets/images/OR.png')} alt={''}/>
                    </Typography>

                    <Box>
                        <Box className={styles.socialsList}>
                            {socials.map((elem, i) => (
                                <>
                                    <Box style={{display:'flex'}}>
                                        <MuiLink sx={{background: elem.color}} key={i} href={elem.link}
                                                 className={styles.socialIconLink}>
                                            <elem.icon className={styles.socialIcon}/>
                                        </MuiLink>
                                        <NextLink href={elem.link}>
                                            <span style={{color: "white", cursor: "pointer"}}>{elem.link}</span>

                                        </NextLink>
                                    </Box>
                                    <br/>
                                </>
                            ))}
                        </Box>
                    </Box>
                    {/*<Box className={styles.list}>*/}
                    {/*    <br/>*/}
                    {/*    {outFooterLinks}*/}
                    {/*</Box>*/}
                    <Typography className={styles.footerTitle}>
                        United Arab Emirates - Dubai
                        <br/>
                        2022
                    </Typography>
                </Container>
            </Container>
        </div>
    )
}

export default Footer;
