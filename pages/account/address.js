import { useState, useEffect } from "react";
import api from "helpers/api";
import Sidebar from "components/Sidebar";
import Loader from "components/LoadingSpinner";
import { AuthValidation } from "providers/AuthContext";
import { useRouter } from "next/router";
import { Header } from "components";
import Footer from "components/Footer";

const Address = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState([]);
  const [editable, setEditable] = useState(false);

  //Auth context
  const { token, user } = AuthValidation();

  if (!token) {
    router.push("/", undefined, { shallow: true });
  }

  const fetchAddress = async () => {
    try {
      setIsLoading(true);
      const url = `address`;
      if (token) {
        const res = await api.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res) {
          console.log(res.data.data);
          setAddress(res.data.data);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log(error.response);
      // if(error.responce.status == 401) {
      //   alert("show");
      // }
      // history.back();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, [token]);

  const deleteAddress = async (id) => {
    try {
      const url = `address/delete`;
      if (token) {
        const res = await api.post(
          url,
          {
            id: id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res) {
          fetchAddress();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const editAddress = async (id) => {
    router.push(`/account/edit-address/${id}`);
  };

  return (
    <>
      <Header />
      <div className="mobile">
        <div className="container-fluid mt-5 ">
          <div className="row pt-5">
            <div className="col-12">
              <div className="product-cartDetails">
                <div className="d-flex justify-content-between">
                  <h1 className="font-18x fw-bold">Addresses</h1>
                  {editable && (
                    <div className="d-flex align-items-center">
                      <img
                        src="/images/edit.svg"
                        className="me-4"
                        width="18px"
                        height="20px"
                        onClick={() => editAddress(editable)}
                      />
                      <img
                        src="/images/delete.svg"
                        alt=""
                        width="20px"
                        height="20px"
                        onClick={() => deleteAddress(editable)}
                      />
                    </div>
                  )}
                </div>
                {isLoading ? (
                  <Loader />
                ) : address ? (
                  address?.map((address) => {
                    return (
                      <>
                        <div className="mt-5" key={address?.id}>
                          <div className="d-flex justify-content-start align-items-center">
                            <div className="radio-custome me-3">
                              <input
                                type="radio"
                                name="address"
                                value={address?.id}
                                className="m-0"
                                onClick={() => setEditable(address?.id)}
                                id={`address${address?.id}`}
                              />
                            </div>
                            <p
                              className="font-16x mb-0"
                              id="alternative-black"
                              
                            >
                              <label for={`address${address?.id}`}>
                              {address?.street_address},{" "}
                              {address?.address_line_1},{" "}
                              {address?.address_line_2}, {address?.city},{" "}
                              {address?.state} 
                              </label>
                              
                               <br />
                                <span className="font-11x" id="secondry-text">
                                  {address?.is_default == 1 &&
                                    "Default Address"}
                                </span>
                            </p>

                            <div
                              className="saving-money ms-3"
                              style={{ marginTop: "-18px" }}
                            >
                              <p
                                className="font-10x mb-0 fw-bold"
                                id="secondry-color"
                              >
                                {address?.address_type}
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })
                ) : null}
                <div className="text-center">
                  <button
                    className="btn addressBtn mt-5 shadow-none"
                    style={{
                      width: "190px",
                    }}
                    onClick={() => router.push("/account/add-new-address")}
                  >
                    ADD NEW ADDRESS
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Address;
