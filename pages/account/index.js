import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AuthValidation } from 'providers/AuthContext';
import { useRouter } from 'next/router';
import { config } from 'config';
import axios from 'helpers/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartVolume } from 'providers/CartContext';
import { Header } from 'components';
import Footer from 'components/Footer';
import Loader from 'components/LoadingSpinner';
import Back from 'components/BackButton';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Too Short!')
        .max(25, 'Too Long!')
        .required('Required')
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    gender: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});

const Home = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    //Authcontextapi data
    const { user, token, updateUser, userLogout } = AuthValidation();

    //Cart State Management---------
    const { fetchCartData, updateCartItem, updateWishlist } = CartVolume();

    //used for edit or update button's facility
    const [disabled, setDisabled] = useState(true);

    //Getting User Data through api
    const getUser = async () => {
        try {
            if (token) {
                const url = `${config.apiUrl}user`;
                // console.log("tokentoken", token);
                const res = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (res) {
                    const userData = res.data;
                    updateUser(userData.data);
                    localStorage.setItem('user', JSON.stringify(userData.data));
                    setIsLoading(true);
                }
            } else {
                router.push('/');
            }
        } catch (error) {
            console.log(error.response);
            if (error.response.status == 401) {
                userLogout();
                updateCartItem('');
                updateWishlist('');

                toast.error('Session Expired..!', {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    };

    useEffect(() => {
        getUser();
    }, [token]);

    const [customer, setCustomer] = useState({
        name: user?.name ? user?.name : '',
        email: user?.email ? user?.email : '',
        gender: user?.gender ? user?.gender : '',
        phone: user?.phone ? user?.phone : '', 
    });

    const updateCustomer = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setCustomer({
            ...customer,
            // gender : value,
            [name]: value,
        });
    };

    const updateGender = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setCustomer({
            ...customer,
            gender: value,
            // [name] : value
        });
    };

    //update field
    const editField = () => {
        setDisabled(false);
    };

    //Edit Field
    const updateField = async () => {
        if (!Object.keys(errors).length) {
            setDisabled(true);
            try {
                if (token) {
                    const url = `${config.apiUrl}user`;

                    const res = await axios.post(
                        url,
                        {
                            name: customer.name,
                            gender: customer.gender,
                            email: customer.email,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    const check = updateUser(res.data.user);
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                    getUser();
                    fetchCartData();

                    // toast(`❤️ User bio updated!`, {
                    //   position: "top-center",
                    //   autoClose: 2000,
                    //   hideProgressBar: true,
                    //   closeOnClick: true,
                    //   pauseOnHover: true,
                    //   draggable: true,
                    //   progress: undefined,
                    //   theme: "light",
                    // });
                }
            } catch (error) {
                console.log(error.response);
                if (error.response.status == 401) {
                    userLogout();
                    updateCartItem('');
                    updateWishlist('');

                    toast.error('Session Expired..!', {
                        position: 'top-center',
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            }
        } else {
            toast.error(`Please Complete your field!`, {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
    };

    const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
        useFormik({
            initialValues: customer,
            validationSchema: SignupSchema,
            validateOnChange: true,
            validateOnBlur: true,
            onSubmit: (values, action) => {
                console.log('values is value', values);
                setCustomer({
                    ...values,
                });
            },
        });
    useEffect(() => {
        // console.log('values', values);
        setCustomer({
          ...values
        })
    }, [values]);

    
    return (
        <>
            <Header />
            {isLoading ? (
                <div>
                    <div className="mobile">
                        <div className="container-fluid mt-5">
                            <div className="row pt-5">
                                <div className="col-12">
                                    <div className="product-cartDetails mt-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center">
                                                <Back />
                                                <p className="mb-0 font-18x fw-bold ms-2">
                                                    Personal Information
                                                </p>
                                            </div>

                                            <div className="d-flex align-items-center">
                                                {disabled ? (
                                                    <div>
                                                        <button
                                                            onClick={editField}
                                                            className="d-flex align-items-center">
                                                            <img
                                                                src="/images/edit.svg"
                                                                width="13px"
                                                                height="13px"
                                                            />
                                                               <p
                                                                className="mb-0 font-14x ms-3"
                                                                id="alternative-text">
                                                                EDIT
                                                            </p>
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={updateField}>
                                                        <p
                                                            className="mb-0 font-14x ms-3 fw-bold"
                                                            id="primary-color">
                                                            UPDATE
                                                        </p>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        {/* <form onSubmit={handleSubmit}> */}
                                        <div className="col-12 mt-4">
                                            <div
                                                className={
                                                    disabled
                                                        ? 'personal-info'
                                                        : 'personal-info-edit'
                                                }>
                                                <p
                                                    className="mb-0 font-12x"
                                                    id="secondry-text">
                                                    Name
                                                </p>
                                                <input
                                                    type="text"
                                                    className="form-control mt-2"
                                                    placeholder="Enter your Name"
                                                    name="name"
                                                    value={values.name}
                                                    disabled={disabled}
                                                    onChange={handleChange}
                                                    // onChange={(e)=>{
                                                    //   const val = event.target.value.replace(/[^a-z]/gi, '');
                                                    //   handleChange(val)
                                                    // setCustomer({
                                                    //     ...customer,
                                                    //     name : val
                                                    // })
                                                    // }}
                                                    onBlur={handleBlur}
                                                    //   style={disabled == false && {backgroundColor:'#fff'} }
                                                />
                                                {errors.name && touched.name ? (
                                                    <p className="text-danger">
                                                        {errors.name}
                                                    </p>
                                                ) : null}
                                            </div>
                                        </div>

                                        <div className="col-12 mt-4">
                                            <div className="personal-info">
                                                <p
                                                    className="mb-0 font-12x"
                                                    id="secondry-text">
                                                    Gender
                                                </p>
                                                <div className="d-flex align-items-center mt-2 ">
                                                    <div className="radio-custome">
                                                        <input
                                                            type="radio"
                                                            name="gender"
                                                            value="male"
                                                            checked={
                                                                values.gender ==
                                                                'male'
                                                            }
                                                            disabled={disabled}
                                                            onChange={
                                                                handleChange
                                                            }
                                                        />
                                                        <label className="form-check-label">
                                                            Male
                                                        </label>
                                                    </div>
                                                    <div className="radio-custome ms-4">
                                                        <input
                                                            type="radio"
                                                            name="gender"
                                                            value="female"
                                                            checked={
                                                                values.gender ==
                                                                'female'
                                                            }
                                                            disabled={disabled}
                                                            onChange={
                                                                handleChange
                                                            }
                                                        />
                                                        <label className="form-check-label">
                                                            Female
                                                        </label>
                                                    </div>
                                                    {errors.gender &&
                                                    touched.gender ? (
                                                        <p className="text-danger">
                                                            {errors.gender}
                                                        </p>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 mt-4">
                                            <div
                                                className={
                                                    disabled
                                                        ? 'personal-info'
                                                        : 'personal-info-edit'
                                                }>
                                                <p
                                                    className="mb-0 font-12x"
                                                    id="secondry-text">
                                                    Email Address
                                                </p>
                                                <input
                                                    type="email"
                                                    className="form-control mt-2"
                                                    placeholder="Enter Your Email Address"
                                                    name="email"
                                                    value={values.email}
                                                    disabled={disabled}
                                                    // onChange={handleChange}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                {errors.email &&
                                                touched.email ? (
                                                    <p className="text-danger">
                                                        {errors.email}
                                                    </p>
                                                ) : null}
                                            </div>
                                        </div>

                                        <div className="col-12 mt-4">
                                            <div className="personal-info">
                                                <p
                                                    className="mb-0 font-12x"
                                                    id="secondry-text">
                                                    Phone Number
                                                </p>
                                                <input
                                                    type="text"
                                                    className="form-control mt-2"
                                                    name="phone"
                                                    value={values.phone}
                                                    maxLength="10"
                                                    disabled
                                                    // onChange={updateCustomer}
                                                />
                                            </div>
                                        </div>

                                        {/* <button type="submit">
                        submit
                        </button>
                    </form> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Loader />
            )}
            <Footer />
        </>
    );
};

export default Home;
