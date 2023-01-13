import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthValidation } from "providers/AuthContext";
import api from 'helpers/api';
import { Header } from "components";
import Footer from "components/Footer";
import { CartVolume } from "providers/CartContext";
import { toast } from "react-toastify";
import Axios from 'axios';
import Back from 'components/BackButton';
import { useFormik } from 'formik';
import * as Yup from 'yup';

//Schema for address
const AddressSchema = Yup.object().shape({
  title: Yup.string()
      .min(3, 'Too Short!')
      .required('Required')
      .matches(/^[aA-zZ]+$/, "Only alphabets are allowed for this field "),
  phone: Yup.string()
      .length(10, 'Number should be 10 digits')
      .matches(/^[6,7,8,9]{1}[\d]{0,9}$/, 'Enter valid mobile number')
      .required('Required'),
  street_address: Yup.string()
      .min(3, 'Too Short!')
      .matches(/^[a-zA-Z0-9]+$/, 'Only alphabets are allowed')
      .required('Required'),
  address_line_1: Yup.string()
      .min(3, 'Too Short!')
      .matches(/^[a-zA-Z0-9]+$/, 'Only alphabets are allowed')
      .required('Required'),
  address_line_2: Yup.string()
      .min(3, 'Too Short!')
      .required('Required')
      .matches(/^[a-zA-Z0-9]+$/, "Only alphabets are allowed for this field"),
  postcode: Yup.string()
      .required()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(6, 'Must be exactly 6 digits')
      .max(6, 'Must be exactly 6 digits'),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  address_type: Yup.string().required('Required'),
});


const Edit = () => {

  const router = useRouter();
  const id = router.query.slug;

  //Auth context
  const {
    token,
    user,
    userLogout
  } = AuthValidation();

  //Cart State Management---------
  const {
    fetchWishlist,
    updateCartItem,
    updateWishlist
  } = CartVolume();

  useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, [token]);

  const [data, setData] = useState();

  const [idefault, setDefault] = useState(false)

  const [state, setState] = useState({
    title: '',
    phone: '',
    street_address: '',
    address_line_1: '',
    address_line_2: '',
    postcode: '',
    city: '',
    state: '',
    address_type: ''
  })

  const fetchAddress = async () => {
    try {
      if (token && id) {
        const url = `address/${id}`;
        const res = await api.get(url, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        if (res) {
          setData(res.data.Addresses);
          setDefault(res.data.Addresses.is_default);
        }
      }
    } catch (err) {
      console.log(err)
      if (err.response.status == 401) {
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
  }

  useEffect(() => {
    fetchAddress()
  }, [token, id])



  useEffect(() => {
    setState({
      title: data ? data.title : '',
      phone: data ? data.phone : '',
      street_address: data ? data?.street_address : '',
      address_line_1: data ? data?.address_line_1 : '',
      address_line_2: data ? data?.address_line_2 : '',
      postcode: data ? data.postcode : '',
      city: data ? data.city : '',
      state: data ? data.state : '',
      address_type: data ? data.address_type : '',
    })
  }, [data])


  const updateState = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setState({
      ...state,
      [name]: value
    })
    console.log(state)
  }

  const [error, setError] = useState("")

  useEffect( () => {
    const getData = setTimeout(async () => {
        try {
            if (state?.postcode?.length === 6) {
                const url =
                    'https://get-details-by-pin-code-india.p.rapidapi.com/detailsbypincode';
                const res = await Axios.post(
                    url,
                    {
                        pincode: `${state.postcode}`,
                    },
                    {
                        headers: {
                            'X-RapidAPI-Key': `b0c6f16eb8msh6d4c31e3d35ffeap153824jsn61aee16586e1`,
                            'X-RapidAPI-Host':
                                'get-details-by-pin-code-india.p.rapidapi.com',
                        },
                    }
                );
                if (res.data) {
                    console.log(res);
                    if (res.data != 'No Data Found') {
                        setError('');

                        setState({
                            ...state,
                            city: res.data.details[0].city_name,
                            state: res.data.details[0].state_name,
                        });
                    } else {
                        setError(res.data);
                        setState({
                            ...state,
                            city: '',
                            state: '',
                        });
                    }
                }
            }
        } catch (error) {
            console.log(error.response);
            setError(error.response);
        }
    }, 2000);

    return () => clearTimeout(getData);
}, [state?.postcode?.length === 6]);

  const saveAddress = async (e) => {
    e.preventDefault();
    console.log(idefault)
    if (!Object.keys(errors).length) {
      try {
        const url = `address/${id}`;
        if (token) {
          const res = await api.post(url, {
            ...values
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          })
          if (res) {
            if (idefault) {
              // const id = res.data.Addresses.id;
              const url = `address/change-default/${id}`;
              const rdata = await api.post(url, {}, {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
              })
              if (rdata) {
                console.log(rdata.data)
                setState({
                  title: '',
                  phone: '',
                  street_address: '',
                  address_line_1: '',
                  address_line_2: '',
                  postcode: '',
                  city: '',
                  state: '',
                  address_type: ''
                })
                setDefault(false);
                history.back()
              }
            } else {

              setState({
                title: '',
                phone: '',
                street_address: '',
                address_line_1: '',
                address_line_2: '',
                postcode: '',
                city: '',
                state: '',
                address_type: ''
              })
              history.back()
            }
          }

        }
      } catch (e) {
        console.log(e.message)
        // if(e.message == "Token has expired") {
        //   alert(e.message)
        // }
        userLogout();
        updateCartItem("");
        updateWishlist("");

        toast.error('Session Expired..!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        window.history.back();
      }
    } else {
      toast.error('Please fill your valid addresss details!', {
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

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: state,
      validationSchema: AddressSchema,
      validateOnChange: true,
      validateOnBlur: true,
      enableReinitialize: true,
      onSubmit: (values, action) => {
        console.log('values is value', values);
      },
    });

  useEffect(() => {
    setState({
      ...values,
    });
  }, [values]);
  // console.log(values)
  // console.log(errors)
  // console.log(state)

  return (
    <>
      <Header />

      <div className='mobile'>
        <div className='container-fluid pt-5'>
          <div className='row mx-0'>
            <div className="product-cartDetails">
              <div className="d-flex align-items-center" >
                <Back />
                <h1 className="font-18x fw-bold mb-0 ms-3">Edit Address</h1>
              </div>
              <form method="post" onSubmit={saveAddress}>
                <div>
                  <div className="personal-info mt-3">
                    <p className="mb-0 font-12x" id="secondry-text">
                      Flat, House no., Building, Company, Apartment
                    </p>
                    <input
                      type="text"
                      className="form-control mt-2"
                      name="street_address"
                      style={{
                        maxWidth: "100%",
                      }}
                      // value={state.street_address}
                      // onChange={updateState}
                      value={values.street_address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="off"
                      required
                    />
                    {errors.street_address &&
                      touched.street_address ? (
                      <p className="text-danger">
                        {errors.street_address}
                      </p>
                    ) : null}
                  </div>

                  <div className="row mt-3">
                    <div className="col-12 mb-3">
                      <div className="personal-info">
                        <p className="mb-0 font-12x" id="secondry-text">
                          Area, Street, Sector, Village
                        </p>
                        <input
                          type="text"
                          className="form-control mt-2"

                          name="address_line_1"
                          value={
                            values.address_line_1
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="off"
                          required
                        />
                        {errors.address_line_1 &&
                          touched.address_line_1 ? (
                          <p className="text-danger">
                            {
                              errors.address_line_1
                            }
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="col-12 mb-3">
                      <div className="personal-info">
                        <p className="mb-0 font-12x" id="secondry-text">
                          Landmark
                        </p>
                        <input
                          type="text"
                          className="form-control mt-2"
                          // placeholder="Enter your Name"
                          name="address_line_2"
                          value={
                            values.address_line_2
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="off"
                          required
                        />
                        {errors.address_line_2 &&
                          touched.address_line_2 ? (
                          <p className="text-danger">
                            {
                              errors.address_line_2
                            }
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="personal-info">
                        <p className="mb-0 font-12x" id="secondry-text">
                          {
                            error ? <span className="ms-3 text-danger">*****Wrong pin Code*****</span>
                              : "Pincode "
                          }
                        </p>
                        <input
                          type="text"
                          className="form-control mt-2"
                          // placeholder="Enter your Name"
                          name="postcode"
                          value={values.postcode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          maxLength="6"
                          style={error ? { border: "1px solid red" } : null}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-12 mb-3">
                      <div className="personal-info">
                        <p className="mb-0 font-12x" id="secondry-text">
                          City
                        </p>
                        <input
                          type="text"
                          className="form-control mt-2"
                          // placeholder="Enter your Name"
                          name="city"
                          value={state.city}
                          onChange={handleChange}
                          disabled
                          required
                        />
                      </div>
                    </div>

                    <div className="col-12 ">
                      <div className="personal-info">
                        <p className="mb-0 font-12x" id="secondry-text">
                          State
                        </p>
                        <input
                          type="text"
                          className="form-control mt-2"
                          // placeholder="Enter your Name"
                          name="state"
                          value={state.state}
                          onChange={handleChange}
                          disabled
                          required
                        />
                      </div>
                    </div>

                    <div className="col-12 mb-3 mt-3">
                      <div className="personal-info">
                        <p className="mb-0 font-12x" id="secondry-text">
                          Address Type
                        </p>
                        <select className='form-select mt-2 font-12x ' name="address_type" required
                          // onChange={(e) => {
                          //   setState({
                          //     ...state,
                          //     address_type: e.target.value
                          //   })
                          // }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option selected disabled value="">Choose...</option>
                          <option value="home" selected={state.address_type === 'home'} >
                            Home
                          </option>
                          <option value="work" selected={state.address_type === 'work'}>
                            Work
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="col-12 mb-3">
                      <div className="personal-info">
                        <p className="mb-0 font-12x" id="secondry-text">
                          Name
                        </p>
                        <input
                          type="text"
                          className="form-control mt-2"
                          // placeholder="Enter your Name"
                          name="title"
                          value={values.title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="off"
                          required
                        />
                        {errors.title &&
                          touched.title ? (
                          <p className="text-danger">
                            {errors.title}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="personal-info">
                        <p className="mb-0 font-12x" id="secondry-text">
                          Phone
                        </p>
                        <input
                          type="number"
                          className="form-control mt-2"
                          // placeholder="Enter your Name"
                          name="phone"
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          axLength="10"
                          minLength="10"
                          autoComplete="off"
                        />
                        {errors.phone &&
                          touched.phone ? (
                          <p className="text-danger">
                            {errors.phone}
                          </p>
                        ) : null}
                      </div>
                    </div>


                  </div>

                  <div className="radio-custome d-flex align-items-center mt-4">

                    <input type="checkbox"
                      name="address"
                      value="false"

                      className="m-0"
                      checked={idefault == true}
                      onClick={() => setDefault(!idefault)}
                    />
                    <span className="mb-0 font-12x" id="secondry-text">&nbsp;&nbsp; Add as default Address</span>
                  </div>
                </div>

                <button
                  className="add-to-cart-product mt-5"
                  style={{ width: "190px" }}
                  onClick={saveAddress}
                >
                  UPDATE ADDRESS
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}



export default Edit 