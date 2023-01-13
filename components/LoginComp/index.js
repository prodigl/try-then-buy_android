import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from 'helpers/api';
import * as yup from 'yup';
require('yup-phone');
import { CartVolume } from 'providers/CartContext';
import { AuthValidation } from 'providers/AuthContext';

const phoneSchema = yup.string().phone('IN', true).required();

const login = ({ searchBar, setSearchBar, updateSliderActive }) => {
    // Cart State Mangament ------------------
    const {
        cart,
        fetchCartData,
        updateLocalCartData,
        updateCartItem,
        localCartData,
    } = CartVolume();

    //Auth State Management-----------------
    const { token, updateToken, updateUser } = AuthValidation();

    // useEffect(() => {
    //     if (!token) {
    //         history.back();
    //     }
    // }, [token]);

    const [otpData, setOtpdata] = useState();
    const [errorOtp, setErrorOtp] = useState(false);
    const [verify, setVerify] = useState(false);
    const [otp1, setOtp1] = useState([]);
    const [otp2, setOtp2] = useState([]);
    const [otp3, setOtp3] = useState([]);
    const [otp4, setOtp4] = useState([]);

    const [otp, setOtp] = useState([]);
    const router = useRouter();
    //For Mobile number purpose
    // const [mobile, setMobile] = useState();
    const [valid, setValid] = useState();
    const [phone, setPhone] = useState('');

    const handleChange = (e) => {
        setOtp([...otp, e.target.value]);
        //going to next input
        if (e.target.value.length === 1 && e.target.parentNode.nextSibling) {
            e.target.parentNode.nextSibling.firstChild.focus();
        }
    };
    useEffect(() => {
        console.log('otp', otp);
    }, [otp]);

    const handleKeyDown = (e) => {

        if (e.which === 8 || e.which === 46) {
            setErrorOtp(false)
            if (e.target.value === '' && e.target.parentNode.previousSibling) {
                e.target.value = '';
                console.log('first');
                e.target.parentNode.previousSibling.firstChild.focus();
               
            } 
            // else if (
            //     // e.target.value === '' &&
            //     !e.target.parentNode.previousSibling
            // ) {
            //     // e.target.parentNode.previousSibling.firstChild.focus();
            //     // console.log('second');
            //     setErrorOtp(false)
            // }
        }
    };

    const setMobileNumber = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setPhone(value.trim());
    };

    //Checking phone number is valid or not
    const validatePhone = async (phone) => {
        if (phone.length > 6) {
            const isValid = await phoneSchema.isValid(phone);
            setValid(isValid);
        } else {
            setValid();
        }
    };

    useEffect(() => {
        validatePhone(phone);
    }, [phone]);

    //Mobile number submiting
    const formSubmit = async (e) => {
        // e.preventDefault();
        if (valid) {
            try {
                const url = 'send-otp';
                const responce = await api.post(url, {
                    phone,
                });
                if (responce.status == 200) {
                    console.log(responce.data);
                    setOtpdata(responce.data);
                    setVerify(true);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    // verify otp
    const otpSubmit = async (e) => {
        console.log(otp1, otp2, otp3, otp4);
        const arr = [otp1, otp2, otp3, otp4];
        console.log(arr.join(''));

        try {
            const url = `verify-otp`;

            const res = await api.post(url, {
                phone: phone,
                otp: arr.join(''),
            });

            if (res.status == 200) {
                setOtp1([]);
                setOtp2([]);
                setOtp3([]);
                setOtp4([]);
                const data = res.data;
                console.log(data);
                const token = data?.data?.token;
                // setOtpdata('');
                // setPhone('');
                // setErrorOtp(false);
                // setVerify(false);
                localStorage.setItem('token', data.data.token);
                updateToken(data.data.token);
                try {
                    const url = 'user';
                    if (token) {
                        const responce = await api.get('user', {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });

                        if (responce) {
                            console.log('responce', responce.data);
                            localStorage.setItem(
                                'user',
                                JSON.stringify(responce?.data?.data)
                            );
                            updateUser(responce.data.data);
                            // router.push('/');
                            // closeSearchBar();
                            if (localCartData?.length) {
                                try {
                                    if (token) {
                                        const url = `initializeCart`;
                                        const res = await api.get(url, {
                                            headers: {
                                                Authorization: `Bearer ${token}`,
                                            },
                                        });

                                        if (res.status == 200) {
                                            const id = res?.data?.id;
                                            try {
                                                localCartData.map(
                                                    async (value) => {
                                                        if (value.id) {
                                                            const url = `addProductToCart/${id}`;
                                                            let res =
                                                                await api.post(
                                                                    url,
                                                                    {
                                                                        product_id:
                                                                            value.id,
                                                                        color: value.color,
                                                                        size: value.size,
                                                                        qty: value.qty,
                                                                    },
                                                                    {
                                                                        headers:
                                                                            {
                                                                                Authorization: `Bearer ${token}`,
                                                                            },
                                                                    }
                                                                );

                                                            if (
                                                                res.status ==
                                                                200
                                                            ) {
                                                                localStorage.removeItem(
                                                                    'localCartData'
                                                                );
                                                                updateLocalCartData(
                                                                    []
                                                                );
                                                                // fetchCartData();
                                                                updateCartItem(
                                                                    data
                                                                );
                                                                closeSearchBar();
                                                                router.push(
                                                                    '/cart/step-2'
                                                                );
                                                            }
                                                        }
                                                    }
                                                );
                                            } catch (e) {
                                                console.log(e);
                                            }
                                        }
                                    }
                                } catch (err) {
                                    console.log(err);
                                }
                            } else {
                                closeSearchBar();
                            }
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            setErrorOtp(true);
            setOtp([]);
            console.log(error);
        }
    };

    const handleOtpSession = () => {
        setVerify(false);
        setOtpdata();
    };
    const handleBackSession = () => {
        setVerify(false);
        setOtpdata();
        closeSearchBar();
        // router.back();
    };

    const closeSearchBar = () => {
        setSearchBar(false);
        setPhone('');
        setErrorOtp(false);
        setVerify(false);
        setOtp([]);
        setOtpdata('');
        localStorage.setItem("logged", "false");
    };

    return (
        <>
            <div
                className={
                    searchBar
                        ? 'searchMenuWrapper menuWrapper-active'
                        : 'searchMenuWrapper'
                }>
                <div className="container-fluid bg-light login-parent-div px-0 menuContainer">
                    <div className="pt-3 px-3">
                        {!verify ? (
                            <>
                                <div onClick={handleBackSession}>
                                    <img src="/icons/login-home-cross.svg" />
                                </div>
                            </>
                        ) : (
                            <>
                                <div onClick={handleOtpSession}>
                                    <img src="/icons/login-home-back.svg" />
                                </div>
                            </>
                        )}
                    </div>
                    <div className="user-loginSection">
                        <div className="d-flex justify-content-center align-items-center flex-column pt-4">
                            <img
                                src="/images/trythenbuy.svg"
                                width="200px"
                                height="75px"
                            />
                            <h3 className="font-22x">Sign up or Sign in</h3>
                            <p
                                className="font-14x fw-light text-center px-4"
                                id="secondry-text">
                                Enjoy the convenience of a single account across
                                all participating brands.
                            </p>
                        </div>

                        {!verify ? (
                            <div className="signup px-3">
                                <h6 className="font-14x">Mobile Number</h6>
                                <input
                                    className="form-control me-2 input-box"
                                    type="tel"
                                    placeholder="Enter Mobile Number"
                                    maxLength="10"
                                    name="phone"
                                    value={phone}
                                    onChange={setMobileNumber}
                                />
                                {phone.length > 3 && valid == true ? (
                                    <p className="text-success font-12x mb-0 "></p>
                                ) : valid == false ? (
                                    <p className="text-danger font-12x mb-0 ">
                                        <em>
                                            Please enter 10 digit phone number.
                                        </em>
                                    </p>
                                ) : null}
                                <button
                                    className="main-button mt-4 w-100 mb-4"
                                    onClick={formSubmit}>
                                    <p className="mb-0 font-12x text-center text-white">
                                        CONTINUE
                                    </p>
                                </button>
                            </div>
                        ) : (
                            <div className="otp px-3">
                                <h6 className="font-14x">Verify OTP</h6>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <input
                                            className={`${
                                                errorOtp
                                                    ? 'otp-box-error'
                                                    : 'otp-box'
                                            }`}
                                            type="tel"
                                            maxLength="1"
                                            name="otp1"
                                            value={otp1}
                                            // onChange={handleChange}
                                            onChange={(e) => {
                                                setOtp1(e.target.value);
                                                if (
                                                    e.target.value.length ===
                                                        1 &&
                                                    e.target.parentNode
                                                        .nextSibling
                                                ) {
                                                    e.target.parentNode.nextSibling.firstChild.focus();
                                                }
                                            }}
                                            onKeyDown={handleKeyDown}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            className={`${
                                                errorOtp
                                                    ? 'otp-box-error'
                                                    : 'otp-box'
                                            }`}
                                            type="tel"
                                            maxLength="1"
                                            name="otp2"
                                            value={otp2}
                                            // onChange={handleChange}
                                            onChange={(e) => {
                                                setOtp2(e.target.value);
                                                if (
                                                    e.target.value.length ===
                                                        1 &&
                                                    e.target.parentNode
                                                        .nextSibling
                                                ) {
                                                    e.target.parentNode.nextSibling.firstChild.focus();
                                                }
                                            }}
                                            onKeyDown={handleKeyDown}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            className={`${
                                                errorOtp
                                                    ? 'otp-box-error'
                                                    : 'otp-box'
                                            }`}
                                            type="tel"
                                            maxLength="1"
                                            name="otp3"
                                            value={otp3}
                                            // onChange={handleChange}
                                            onChange={(e) => {
                                                setOtp3(e.target.value);
                                                if (
                                                    e.target.value.length ===
                                                        1 &&
                                                    e.target.parentNode
                                                        .nextSibling
                                                ) {
                                                    e.target.parentNode.nextSibling.firstChild.focus();
                                                }
                                            }}
                                            onKeyDown={handleKeyDown}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            className={`${
                                                errorOtp
                                                    ? 'otp-box-error'
                                                    : 'otp-box'
                                            }`}
                                            type="tel"
                                            maxLength="1"
                                            name="otp4"
                                            value={otp4}
                                            // onChange={handleChange}
                                            onChange={(e) => {
                                                setOtp4(e.target.value);
                                                if (
                                                    e.target.value.length ===
                                                        1 &&
                                                    e.target.parentNode
                                                        .nextSibling
                                                ) {
                                                    e.target.parentNode.nextSibling.firstChild.focus();
                                                }
                                            }}
                                            onKeyDown={handleKeyDown}
                                        />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-2">
                                    <div>{otpData && otpData?.data?.otp}</div>
                                    <div onClick={formSubmit}>
                                        <img src="/icons/reset.svg" />
                                        <span
                                            className="ms-2 font-12x"
                                            id="secondry-text">
                                            Reset OTP
                                        </span>
                                    </div>
                                </div>
                                <button
                                    className="main-button mt-3 w-100 mb-4"
                                    onClick={otpSubmit}>
                                    <p className="mb-0 font-12x text-center text-white">
                                        CONTINUE
                                    </p>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default login;
