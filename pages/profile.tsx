import AuthLayout from "../layouts/Auth";
import {Box, Container, Theme, Button} from "@mui/material";
import ModalWithForm from "../components/pages/profile/ModalWithForm";
import {NextPage} from "next";
import {SyntheticEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {
    setImageUploadModalActive,
    setImageUploadModalData,
    setModalWithFormActive,
    setModalWithFormData,
    setSelectedTab,
    setImageHiden, setProfile
} from "../store/reducers/auth";
import {makeStyles} from "@mui/styles";
import {media} from "../utility/media";
import Avatar from "../components/User/Avatar";
import {defaultAvatar, defaultBgImage} from "../constants/main";
import {selectAuth} from "../store/selector/auth";
import DarkButton from "../components/pages/profile/DarkButton";
import {UserTabs, TabContent} from "../components/User/Tabs";
import {profileTabContent} from "../constants/profile";
import {styles} from "../components/User/styles";
import Head from "next/head";
import {useProfileInfoActions} from "../hooks/profile";
import UploadPhotoModal from "../components/pages/profile/UploadPhotoModal";
import ImageResizeModal from "../components/pages/profile/ImageResizeModal";
import {useSelector} from "react-redux";
import api from "../http/api";
import axios from "axios";


const useStyles = makeStyles((theme: Theme) => ({
    containerFluid: {
        background: theme.palette.primary.main,
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topSideBox: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    bgBox: {
        width: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    },
    bgBox1: {
        width: '100%',
        padding: `${media(70, 100)}  ${media(18, 24)} 0 `,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    },
    avatarHolder: {
        margin: `${media(10, 15)} 0`,
    },
    editUserInfoBox: {
        padding: `${media(10, 12)} 0`
    },
    content: {
        ...styles.content,
    },
    box: {
        width: media(100, 130),
        height: media(100, 130),
        borderRadius: '50%',
        overflow: 'hidden',
        opacity: 0,
        margin: `${media(10, 15)} 0`,

    },
    checkBox: {
        width: "40px",
        height: "40px",
        marginLeft:"25px",
        marginBottom: "20px",
        cursor: "pointer"
    },
    bgButton: {
        width: "131px",
        height: "37px",
        borderRadius: "5px",
        background: "#EDEDED",
        border: "none",
        color: "#9A9A9A",
        fontSize: "12px",
        "&:hover": {
            background: "#dcd9d9",
        }
    }
}));


const Profile: NextPage = () => {
    const styles = useStyles();
    const dispatch = useAppDispatch();
    const authState = useAppSelector(selectAuth);
    const {INFO} = useProfileInfoActions();
    const [bool, setBool]: any = useState(authState.profile.avatarHidden)

    useEffect(() => {

        return () => {
            dispatch(setModalWithFormActive(false));
            dispatch(setModalWithFormData(null));
        }
    }, []);

    useEffect(() => {
        if (authState.authInfoLoaded) {
            if (authState.isAuth && !authState.profile.email) {
                dispatch(setModalWithFormData('PERSONAL_EMAIL'));
                dispatch(setModalWithFormActive(true));
            }
        }
    }, [authState.authInfoLoaded]);

    const outBg = () => {
        return authState.profile.bg ? authState.profile.bg : defaultBgImage;
    }

    const outAvatar = () => {
        return authState.profile.avatar ? authState.profile.avatar : defaultAvatar;
    }

    const handleTabChange = (e: SyntheticEvent<Element, Event>, newValue: any) => {
        dispatch(setSelectedTab(newValue));
    }

    const handleOpenBgUploadModal = () => {
        dispatch(setImageUploadModalData({key: 'BG', data: null}));
        dispatch(setImageUploadModalActive(true));
    }

    const handleOpenAvatarUploadModal = () => {
        dispatch(setImageUploadModalData({key: 'AVATAR_WITHOUT_LTRB', data: {avatar: null}}));
        dispatch(setImageUploadModalActive(true));
    }


    const btnStart = (e: any) => {
        setBool(e.target.checked);
    }

    useEffect(() => {
        console.log(bool)
        const formData = new FormData()
        formData.append("avatarHidden", bool)
        axios.patch(`https://api.temir.ae/api/v1/users/${authState.profile.uniqueId}/`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
            }
        })
            .then(({data}) => {
                console.log(data)
                dispatch(setProfile(data));
            })

    }, [bool])


    return (
        <Container maxWidth={false} disableGutters className={styles.containerFluid}>
            <Head>
                <title>Edit Profile</title>
                <meta name="title" content="Edit Profile"/>
            </Head>
            <ModalWithForm/>
            <UploadPhotoModal/>
            <ImageResizeModal/>
            <Container maxWidth="sm" disableGutters>
                <Box className={styles.topSideBox}>

                    <Box className={styles.bgBox} style={{backgroundImage: `url(${outBg()})`}}>
                        <Box className={styles.bgBox1}>
                            <Button className={styles.bgButton} onClick={handleOpenAvatarUploadModal}>Avatar</Button>

                            {
                                authState.profile.avatarHidden === true ?  <Box style={{padding: "32.5px 0"}}><Avatar img={outAvatar()}/></Box> : <><Box
                                    className={styles.avatarHolder}>
                                    <Box className={styles.box}/>
                                </Box></>
                            }
                            <Button className={styles.bgButton} onClick={handleOpenBgUploadModal}>Background</Button>
                        </Box>
                        <input className={styles.checkBox} onChange={btnStart} checked={bool} type="checkbox"/>

                    </Box>

                    <Box className={styles.editUserInfoBox}>
                        <DarkButton onClick={INFO.handleOpenModal}>Edit name and position</DarkButton>

                    </Box>
                </Box>
                <UserTabs value={authState.selectedTab} onChange={handleTabChange}/>
                <Box className={styles.content}>
                    {profileTabContent.map((elem, i) => (
                        <TabContent key={elem.id} id={elem.id} selectedTab={authState.selectedTab}>
                            <elem.content/>
                        </TabContent>
                    ))}
                </Box>
            </Container>
        </Container>
    )
}


const AuthRequired = () => {

    return (
        <AuthLayout Children={Profile}/>
    )
}

export default AuthRequired;