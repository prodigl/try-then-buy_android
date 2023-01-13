import { Accordion } from 'react-bootstrap';
import { config } from 'config';
import { useEffect, useState } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Link from 'next/link';
import api from 'helpers/api';

// export const getStaticProps = async () => {
//     const url = `${config.apiUrl}faq`;

//     const res = await fetch(url);
//     const data = await res.json();

//     return {
//         props: {
//             data,
//         },
//     };
// };

const Faq = ({ data }) => {
    const [faq, setFaq] = useState();

    const [faqSerch, setFaqserch] = useState('');

    const [configration, setConfigration] = useState('');

    const isFaq = async () => {
        try {
            const responce = await api.get('faq');
            const data = responce.data.data;
            console.log(responce);
            if (data) {
                setFaq(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        isFaq();

        // return ()=>setFaq('');
    }, []);

    const submitForm = async (e) => {
        e.preventDefault();

        // const url = `${config.apiUrl}faq?q=${faqSerch}`;
        // try {
        //     const res = await fetch(url);
        //     const data = await res.json();
        //     setFaq(data);

        // } catch (e) {
        //     console.log(e)
        // }
    };

    const handleFilter = async (e) => {
        // setFaqserch(e.target.value)

        // const url = `${config.apiUrl}faq?q=${e.target.value}`;
        // try {
        //     const res = await fetch(url);
        //     const data = await res.json();
        //     setFaq(data);
        // } catch (e) {
        //     console.log(e);
        // }

        let value = e.target.value;
        setFaqserch(value)
        // console.log(value)
        try {
            if (value.length > 3) {
                let url = `faq?q=${value}`;
                const responce = await api.get(url);
                // const data = responce.data.data;
                if (data) {
                    setFaq(data);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (faqSerch?.length == '') {
            // setFaq(data);
            isFaq();
        }
    }, [faqSerch]);

    // useEffect(() => {
    //     const configration = localStorage.getItem('configration')
    //         ? JSON.parse(localStorage.getItem('configration'))
    //         : null;

    //     setConfigration(configration);
    // }, []);

    return (
        <>
            <Header />

            <div className="mobile">
                <div className="container-fluid mt-5 pt-5 px-3">
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link href="/">HOME</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="#" id="primary-color">
                                    Help Center
                                </a>
                            </li>
                        </ol>
                    </nav>

                    <h1 className="font-26x fw-bold mt-4">Help Center</h1>

                    <div className="faq-box-model  p-3 w-100 mt-4">
                        <div className="row">
                            <div className="col-4">
                                <img src="/images/faq.svg" />
                            </div>
                            <div className="col-8 ps-3">
                                <div className="d-flex flex-column ">
                                    <p
                                        className="mb-0 font-14x fs-bold"
                                        id="secondry-text">
                                        Talk directly with the team
                                    </p>
                                    <div className="d-flex mt-2 ">
                                        <img
                                            src="/images/phone-faq.svg"
                                            alt=""
                                        />
                                        <p className="mb-0 font-16x fw-bold ms-3">
                                            (+91) 701 8xx xxxx
                                        </p>
                                    </div>
                                    <div className="d-flex  mt-2">
                                        <img
                                            src="/images/chat-faq.svg"
                                            alt=""
                                        />
                                        <p className="mb-0 font-16x fw-bold ms-3">
                                            Live Chat
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <form className="d-flex input-box mt-4 w-100">
                        <button className="btn-search" type="submit">
                            <img src="/images/search.svg" alt="" />
                        </button>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search for common queries..."
                            aria-label="Search"
                        />
                    </form> */}

                    <form
                        className="d-flex input-box animateSearchBar mt-4"
                        // onSubmit={searchManualData}
                        // style={{ marginLeft: '8%' }}
                        onSubmit={submitForm}>
                        <button className="btn-search" type="submit">
                            <img
                                src="/icons/client/search.svg"
                                // width={20}
                                height={30}
                            />
                        </button>

                        <input
                            className="form-control header-search me-2 shadow-none"
                            type="search"
                            placeholder="Search"
                            onChange={handleFilter}
                            // onChange={handleSearch}
                            name="q"
                            // value={isSearch}
                        />
                    </form>
                </div>

                <div className="container-fluid mt-4">
                    {faq?.map((faq) => {
                        return (
                            <>
                                <Accordion>
                                    <Accordion.Item eventKey={faq.id}>
                                        <Accordion.Header>
                                            {faq.title}{' '}
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            {faq.details}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </>
                        );
                    })}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Faq;
