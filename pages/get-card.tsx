import {Box, Button, Container, IconButton, MenuItem, Select, Theme, Typography} from "@mui/material";
import {NextPage} from "next";
import {FC, useEffect, useRef, useState} from "react";
import {makeStyles} from "@mui/styles";
import clsx from 'clsx';
import {ArrowBackIos, ArrowForwardIos} from '@mui/icons-material';
import {Formik} from 'formik';
import * as yup from 'yup';
import MainLayout from "../layouts/Main";
import {media} from "../utility/media";
import {selectCardState} from "../store/selector/card";
import {buyCardCounts, currenciesTitle} from "../constants/main";
import CardSelectItem from "../components/pages/get-card/CardSelectItem";
import PreviewWithValue from "../components/pages/get-card/PreviewWithValue";
import BlueButton from "../components/BlueButton";
import PreviewWithValueInput from "../components/pages/get-card/PreviewWithValue/input";
import Loading from "../components/Form/Loading";
// @ts-ignore
import hex2rgba from "hex2rgba";
// @ts-ignore
import Slider from 'react-slick';
import {orderCard} from "../actions/card";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {selectAuth} from "../store/selector/auth";
import {setUploadCards} from "../store/reducers/auth";

import {useForm} from "react-hook-form";
import api from "../http/api";


const containerPY = media(15, 20);

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '100vh',
        paddingTop: containerPY,
        paddingBottom: containerPY,
    },
    sliderItemBox: {
        outline: 'none',
        border: 'none'
    },
    sliderImg: {
        width: '100%',
        height: media(240, 345),
        objectFit: 'contain'
    },
    sliderArrows: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 3,
    },
    sliderIcon: {
        color: "#726E6E",
        fontSize: media(20, 23)
    },
    prevArrow: {
        left: 0,
    },
    nextArrow: {
        right: 0,
    },
    form: {
        width: '100%',
        position: 'relative',
    },
    cardSelectHolder: {
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridColumnGap: media(10, 14),
        padding: `${media(10, 15)} 0`,
        '@media (max-width: 450px)': {
            gridTemplateColumns: '1fr 1fr',
            gridRowGap: media(10, 14),
        }
    },
    orderInfo: {
        marginTop: media(30, 70),
        display: 'block',
    },
    paymentTypeHolder: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${media(15, 20)} 0`,
    },
    userInfoForm: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridRowGap: media(13, 17),
        margin: `${media(10, 14)} 0`,
    },
    cardSelectItem: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: "10px"
    },
    cardSelectTop: {
        width: '20%',
        padding: `${media(3, 5)} 0`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        whiteSpace: 'nowrap'
    },
    selectBtn: {
        textAlign: "center",
        "& Button": {
            margin: '20px 0',
            padding: '5px 30px',
            background: 'linear-gradient(270deg, #675A37 -3.1%, rgba(28, 28, 28, 0.588329) 18.19%, rgba(242, 210, 124, 0.85) 47.68%, rgba(77, 69, 50, 0.78) 101.74%)'
        }
    },
    selectHolder: {
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: '1fr 1fr',
        width: "80px",
        background: theme.palette.primary.main,
        borderRadius: '3px',
        padding: 1,
    },
    selectBox: {
        height: '100%',
    },
    inputData: {
        width: "405px",
        textAlign: 'center',
        padding: "10px",
        color: '#8C8B8B',
        margin: "10px",
        fontWeight: '300',
        fontSize: "16px",
        fontFamily: "sans-serif",
        outline: 'red',
        resize: "vertical"
    },
    inputDataError: {
        width: "405px",
        textAlign: 'center',
        padding: "10px",
        color: 'red',
        margin: "10px",
        fontWeight: '300',
        fontSize: "16px",
        fontFamily: "sans-serif",
        outline: 'red',
        resize: "vertical",
        borderBottom: "2px solid red",
        boxShadow: "0px 0px 15px red"
    },
    inputDataBox: {
        textAlign: "center",
        display: "flex",
        flexWrap: "wrap",
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
    },
    inputDataTextarea: {
        width: "100%",
        textAlign: 'center',
        padding: "10px",
        color: '#8C8B8B',
        margin: "10px",
        fontWeight: '300',
        fontSize: "16px",
        fontFamily: "sans-serif",
        outline: 'red',
        resize: "vertical",
        [theme.breakpoints.up('xs')]: {
            // justifyContent: "center",
            width: "405px",

        },
        [theme.breakpoints.up('md')]: {
            width: "100%",


        },
        [theme.breakpoints.up('lg')]: {
            width: "100%",


        },
        [theme.breakpoints.up('xl')]: {
            width: "100%",

        }
    },
    inputDataTextareaError: {
        width: "100%",
        textAlign: 'center',
        padding: "10px",
        color: 'red',
        margin: "10px",
        fontWeight: '300',
        fontSize: "16px",
        fontFamily: "sans-serif",
        outline: 'red',
        resize: "vertical",
        borderBottom: "2px solid red",
        boxShadow: "0px 0px 15px red",
        [theme.breakpoints.up('xs')]: {
            // justifyContent: "center",
            width: "405px",

        },
        [theme.breakpoints.up('md')]: {
            width: "100%",


        },
        [theme.breakpoints.up('lg')]: {
            width: "100%",


        },
        [theme.breakpoints.up('xl')]: {
            width: "100%",

        }
    },

    inputBtn: {
        background: 'linear-gradient(270deg, #675A37 -3.1%, #463F2D 18.19%, rgba(242, 210, 124, 0.85) 47.68%, rgba(77, 69, 50, 0.78) 101.74%);\n' +
            'box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)',
        padding: "5px 50px",
        margin: '20px 0'
    },
    select: {
        width: '100%',
        background: 'white',
        height: media(23, 28),
        '& .MuiSvgIcon-root': {
            display: 'none',
        },
        '& .MuiSelect-select': {
            width: '100%',
            height: 'unset',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxSizing: 'border-box',
            padding: `${media(3, 5)} ${media(4, 6)}!important`,
            minHeight: 0,
        },
    },
    iconHolder: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButton: {
        padding: 0,
    },
    icon: {
        color: theme.palette.secondary.main,
        fontSize: media(24, 27),
        transform: 'rotate(0deg)',
        transition: '0.3s ease',
        '&.rotated': {
            transform: 'rotate(180deg)',
        }
    }
}));


const MessageText: FC = ({children, ...props}) => (
    <Typography fontSize={media(18, 20)} fontWeight="600" color="primary" {...props}>
        {children}
    </Typography>
);


const validationSchema = yup.object({
    location: yup.string()
        .required("This field is required"),
    phone: yup.string()
        .required("This field is required"),
    order: yup.array()
        .test(
            'is-not-empty',
            'Select an card',
            (value) => value.length > 0,
        )
});

type InitialValuesType = {
    order: { count: number; id: number }[],
    location: string;
    phone: string;
}

const initialValues: InitialValuesType = {
    order: [],
    location: "",
    phone: ""
}

const GetCard: NextPage = () => {
    const styles = useStyles();
    const dispatch = useAppDispatch();
    const [index, setIndex] = useState(0);
    const [isOrdered, setOrdered] = useState(false);
    const cardState = useAppSelector(selectCardState);
    const slider = useRef(null);

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const handleSlideChange = (i: number) => {
        setIndex(i);
    }

    const handleNextSlider = () => {
        slider.current.slickNext();
    }
    const handlePrevSlider = () => {
        slider.current.slickPrev();
    }

    const outCards = () => {
        if (cardState.cardsLoaded) {
            if (cardState.cardsError) {
                return (
                    <MessageText>
                        {cardState.cardsError}
                    </MessageText>
                )
            }
            if (cardState.cards.length) {
                return (
                    <Box sx={{width: '100%', position: 'relative'}}>
                        <IconButton className={clsx(styles.sliderArrows, styles.prevArrow)} onClick={handlePrevSlider}>
                            <ArrowBackIos className={styles.sliderIcon}/>
                        </IconButton>
                        <IconButton className={clsx(styles.sliderArrows, styles.nextArrow)} onClick={handleNextSlider}>
                            <ArrowForwardIos className={styles.sliderIcon}/>
                        </IconButton>
                        <Slider
                            ref={slider}
                            {...settings}
                            afterChange={handleSlideChange}
                        >
                            {cardState.cards.map((elem) => (
                                <Box key={elem.id} className={styles.sliderItemBox}>
                                    <img className={styles.sliderImg} src={elem.image} alt={""}/>
                                </Box>
                            ))}
                        </Slider>

                    </Box>

                )
            }
            return (
                <MessageText>
                    There is No Card
                </MessageText>
            )
        }
        return (
            <MessageText>
                Loading ...
            </MessageText>
        )
    }


    const outCardSelectItem = () => {
        if (cardState.cardsLoaded) {
            if (cardState.cardsError) {
                return (
                    <MessageText>
                        {cardState.cardsError}
                    </MessageText>
                )
            }
            console.log(cardState.cards, "cardsMao")
            if (cardState.cards.length) {
                return cardState.cards.map((elem, i) => (
                    <CardSelectItem elem={elem} key={i}/>
                ));
            }
            return (
                <MessageText>
                    There is no cards
                </MessageText>
            )
        }
        return (
            <MessageText>
                Loading ...
            </MessageText>
        )
    }
    const authState = useAppSelector(selectAuth);
    const [open, setOpen] = useState(false);
    const [quatiti, setQuatiti] = useState(0);

    const handleClose = () => {
        setOpen(false);
    }
    const handleOpen = () => {
        setOpen(true);
    }

    const outSelectValue = () => {
        const inOrder = authState?.uploadCard?.find((el: any) => el.card.id === cardState.cards[index].id);
        if (inOrder) {
            return inOrder.count;
        }
        return 0;
    }

    const outSelectChange = (e: any): any => {
        console.log(e.target.value)
        setQuatiti(e.target.value)
    }

    const onOrder = (el: any) => {
        const result = {
            card: el,
            count: quatiti
        }
        dispatch(setUploadCards(result))
    }

    const outCurrentCardPrice = () => {
        if (cardState.cardsLoaded) {
            if (cardState.cardsError) {
                return null;
            }
            if (cardState.cards.length) {
                {
                    console.log(cardState.cards[index], "freeset")
                }
                return (
                    <>
                        <Box>
                            <Box className={styles.cardSelectItem}>
                                <Box className={styles.selectHolder}>
                                    <Box className={styles.selectBox}>
                                        <Select
                                            open={open}
                                            autoWidth
                                            className={styles.select}
                                            onClose={handleClose}
                                            defaultValue={0}
                                            onChange={outSelectChange}
                                            onOpen={handleOpen}
                                        >
                                            {buyCardCounts.map((elem, i: number) => (
                                                <MenuItem key={i} value={elem}>{elem}</MenuItem>
                                            ))}
                                        </Select>
                                    </Box>
                                    <Box className={styles.iconHolder} onClick={handleOpen}>
                                        <IconButton className={styles.iconButton}>
                                            <KeyboardArrowDownIcon className={clsx(styles.icon, {rotated: open})}/>
                                        </IconButton>
                                    </Box>
                                </Box>
                                <Box className={styles.cardSelectTop} sx={{color: "black"}}>
                                    {cardState.cards[index][`title`]}
                                </Box>
                                <Typography fontSize={media(17, 20)} fontWeight="600" color="black">
                                    {cardState.cards[index][`price_dollar`]} {currenciesTitle['dollar']}
                                </Typography>
                            </Box>
                            <Box className={styles.orderInfo}>

                            </Box>
                            {authState?.uploadCard?.includes({card: cardState.cards[index]}) ? null :
                                <Box className={styles.selectBtn}><Button
                                    onClick={() => quatiti > 0 && onOrder(cardState.cards[index])}>PROSED</Button></Box>}

                        </Box>

                    </>


                )
            }
            return null;
        }
        return null
    }


    const [price, setPrice] = useState(0)

    useEffect(() => {
        const result = authState.uploadCard.reduce((acc: any, el: any) => {
            return el?.count * el?.card?.price_dollar + acc
        }, 0)
        setPrice(result)

    }, [authState.uploadCard])

    const [dataSubmit, setDataSubmit] = useState(false)

    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const onSubmit = (data: any) => {
        const res = authState.uploadCard.map((els: any) => {
            return {
                id: els.card.id,
                count: els.count
            }
        })

        const deta = {
            location: data.location,

        }
        api.post("users/send-mail-order/", data)
            .then(() => {
                setDataSubmit(true)
            })
    };

    return (
        <MainLayout>
            <div style={{background: 'white'}}>
                <Container maxWidth="md" className={styles.container}>
                    {!isOrdered && (
                        <>
                            {outCards()}
                            <Box sx={{width: '80%'}}>
                                {outCurrentCardPrice()}
                            </Box>
                        </>
                    )}
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={async (values, actions) => {
                            actions.setStatus("");
                            const result = await dispatch(orderCard(values)).unwrap();
                            if (result.success) {
                                actions.setStatus(result.message);
                                setOrdered(false);
                            } else {
                                actions.setStatus(result.message);
                            }
                            actions.setValues(initialValues)
                            actions.setTouched({phone: false, location: false});
                            actions.setSubmitting(false);
                        }}
                    >
                        {(formik) => (
                            <form onSubmit={formik.handleSubmit} className={styles.form}>
                                {isOrdered ? (
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start'
                                    }}>
                                        <Loading fontSize={media(18, 20)} active={formik.isSubmitting}
                                                 bg="transparent"/>
                                        <Typography component="h1" fontSize={media(17, 19)} fontWeight="700"
                                                    color="secondary">
                                            CASH ON DELIVARY
                                        </Typography>
                                        <Typography marginTop={media(14, 17)} maxWidth="380px" component="p"
                                                    fontSize={media(13, 15)} fontWeight="400" color="secondary">
                                            TEMIR smart card works with NFC technology. Can connect with any phone and
                                            share with your card
                                            unlimited anywahere an place.
                                            one cardd enophe to share details with ulimited times.
                                        </Typography>
                                        <Box className={styles.userInfoForm}>
                                            <PreviewWithValueInput preview="Your phone" name="phone"/>
                                            <PreviewWithValueInput preview="Your location" name="location"/>
                                        </Box>
                                        <BlueButton type="submit" sx={{maxWidth: media(240, 360), width: '100%'}}
                                                    style={{paddingTop: media(4, 7), paddingBottom: media(4, 7)}}>
                                            SUBMIT
                                        </BlueButton>
                                    </Box>
                                ) : (
                                    <div>
                                        <Container maxWidth="sm">

                                        </Container>
                                    </div>

                                )}
                            </form>
                        )}
                    </Formik>
                </Container>
            </div>
            {authState.uploadCard.length > 0 &&
                <>
                    <Box style={{background: 'black', padding: '30px 20px'}}>
                        <Box style={{textAlign: "center", padding: "30px 0"}}>
                            <svg width="239" height="14" viewBox="0 0 239 14" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M90.8058 1.9776H67.9718L67.9827 6.00937L87.543 5.9852L90.7568 7.01006L87.543 7.98174L67.9881 7.96241L67.999 11.9748H90.7786L87.543 13.9665H67.4979L66.8933 13.5363L64.8125 12.1054V1.66337L67.1003 0.116411L67.2092 0.0390625H67.9663L87.6247 0.0438968L90.8058 1.97276V1.9776Z"
                                    fill="url(#paint0_linear_958_309)"/>
                                <path
                                    d="M187.493 11.9448L186.148 13.8833L184.742 11.9448V1.86539L186.126 0.0332031H186.148L187.493 1.94273V11.9448Z"
                                    fill="url(#paint1_linear_958_309)"/>
                                <path
                                    d="M210.762 0.0580111L231.319 0C231.319 0 237.158 0.290055 238.999 3.36948V5.14365C238.999 5.14365 238.885 7.72997 233.165 8.05387L227.544 8.09254L233.356 13.9662H229.429L220.692 5.75276L233.596 5.68025C233.596 5.68025 235.693 5.52072 235.747 4.5732C235.873 2.26243 230.731 1.99655 230.731 1.99655H213.997L210.762 0.0580111Z"
                                    fill="url(#paint2_linear_958_309)"/>
                                <path
                                    d="M126.147 2.79478L126.141 2.78995L126.19 11.9702L124.72 13.9667L123.238 11.9702L123.211 2.06481L124.055 1.47986L126.125 0.0682623L126.136 0.0585938H126.147V0.063428L136.872 6.79271V9.5289L126.147 2.79478Z"
                                    fill="url(#paint3_linear_958_309)"/>
                                <path
                                    d="M152.4 2.06378V11.9692L150.902 13.9657L149.486 11.9692V2.77925L138.875 9.53754V6.80619L149.486 0.0527344L149.502 0.0624029L150.401 0.681187L150.597 0.811712L151.55 1.46434L151.545 1.46917L152.4 2.06378Z"
                                    fill="url(#paint4_linear_958_309)"/>
                                <path
                                    d="M32.4263 1.03956L29.1798 2.04025L18.3239 2.03542V12.052L16.2104 13.9664L14.2277 11.994L14.1024 2.03058L3.24099 2.02575L0 1.02506L3.24099 0.0195312L29.1798 0.034034L32.4263 1.03956Z"
                                    fill="url(#paint5_linear_958_309)"/>
                                <defs>
                                    <linearGradient id="paint0_linear_958_309" x1="64.8125" y1="7.00053" x2="90.8058"
                                                    y2="7.00053" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="white"/>
                                        <stop offset="1" stopColor="#E8E8E8"/>
                                    </linearGradient>
                                    <linearGradient id="paint1_linear_958_309" x1="184.741" y1="6.95711" x2="187.492"
                                                    y2="6.95711" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="white"/>
                                        <stop offset="1" stopColor="#E8E8E8"/>
                                    </linearGradient>
                                    <linearGradient id="paint2_linear_958_309" x1="210.761" y1="6.98216" x2="239"
                                                    y2="6.98216" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="white"/>
                                        <stop offset="1" stopColor="#E8E8E8"/>
                                    </linearGradient>
                                    <linearGradient id="paint3_linear_958_309" x1="123.211" y1="7.0104" x2="136.872"
                                                    y2="7.0104" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="white"/>
                                        <stop offset="1" stopColor="#E8E8E8"/>
                                    </linearGradient>
                                    <linearGradient id="paint4_linear_958_309" x1="138.875" y1="7.00695" x2="152.4"
                                                    y2="7.00695" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="white"/>
                                        <stop offset="1" stopColor="#E8E8E8"/>
                                    </linearGradient>
                                    <linearGradient id="paint5_linear_958_309" x1="0" y1="6.99067" x2="32.4263"
                                                    y2="6.99067" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="white"/>
                                        <stop offset="1" stopColor="#E8E8E8"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </Box>
                        <Container maxWidth="md" style={{background: 'white', padding: '20px'}}>
                            {authState.uploadCard.map((items: any) => (
                                <>
                                    <Box style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        alignItems: "center",
                                        margin: '15px 0',
                                        borderBottom: "2px solid #D0D0D0",
                                        paddingBottom: "10px"
                                    }}>
                                        <img src={items.card.image} alt="" style={{width: media(240, 300)}}/>
                                        <Box style={{margin: `0 ${media(0, 20)}`, width: "120px"}}>
                                            <Typography>{items.card.title}</Typography>
                                            <Typography>{items.count} piece</Typography>
                                            <Typography>{items.card.price_dollar} $</Typography>
                                            <Typography>Total: {items.card.price_dollar * items.count} $</Typography>
                                        </Box>
                                    </Box>
                                </>
                            ))}
                            <Box style={{textAlign: 'center'}}>
                                <h4>TOTAL AMOUNT</h4>
                                <h3>{price} $</h3>
                            </Box>
                        </Container>
                        <Container maxWidth="md">
                            <Box style={{textAlign: "center"}}><h3 style={{color: "#797979"}}>BILLING DETAILS</h3></Box>

                            <Box>
                                {
                                    dataSubmit ? <Typography color="white" fontSize="25px">Your order is accepted...</Typography> : <form onSubmit={handleSubmit(onSubmit)}>
                                        <Box className={styles.inputDataBox}>
                                            {/* register your input into the hook by invoking the "register" function */}
                                            <input placeholder="First name" type="text"
                                                   className={errors.first_name ? styles.inputDataError : styles.inputData} {...register("first_name", {required: true})} />

                                            <input placeholder="Last name" type="text"
                                                   className={errors.last_name ? styles.inputDataError : styles.inputData} {...register("last_name", {required: true})} />

                                            <input placeholder="Mobile" type="tel"
                                                   className={errors.mobile ? styles.inputDataError : styles.inputData} {...register("mobile", {required: true})} />
                                            <input placeholder="Email" type="email"
                                                   className={errors.email ? styles.inputDataError : styles.inputData} {...register("email", {required: true})} />
                                            {/* errors will return when field validation fails  */}
                                        </Box>
                                        <Box style={{textAlign: "center"}}><h3 style={{color: "#797979"}}>DELIVERY
                                            ADSRESS</h3></Box>

                                        <Box className={styles.inputDataBox}>
                                            {/* register your input into the hook by invoking the "register" function */}

                                            {/* include validation with required or other standard HTML validation rules */}
                                            <input placeholder="City" type="text"
                                                   className={errors.city ? styles.inputDataError : styles.inputData} {...register("city", {required: true})} />
                                            <input placeholder="Street /Area" type="text"
                                                   className={errors.street ? styles.inputDataError : styles.inputData} {...register("street", {required: true})} />
                                            <input placeholder="Tower/Building name"
                                                   className={errors.building_name ? styles.inputDataError : styles.inputData} {...register("building_name", {required: true})} />
                                            <input placeholder="Unit #" type="text"
                                                   className={errors.unit ? styles.inputDataError : styles.inputData} {...register("unit", {required: true})} />
                                            <textarea
                                                className={errors.description ? styles.inputDataTextareaError : styles.inputDataTextarea}
                                                placeholder="Notes about your order" {...register("description", {required: true})}/>
                                            {/* errors will return when field validation fails  */}
                                        </Box>

                                        <Box style={{textAlign: "center"}}>
                                            <Button className={styles.inputBtn} type="submit">Pay</Button>
                                        </Box>
                                    </form>
                                }
                            </Box>

                        </Container>

                    </Box>
                </>
            }
        </MainLayout>
    )
}

export default GetCard;
