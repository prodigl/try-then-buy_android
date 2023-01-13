import Logo from '../assets/vectors/Brand-logo';
import Image from 'next/image';
import Link from 'next/link'
import { Header } from 'components';
import Footer from 'components/Footer';
const notFound = () => {
    return (
        <>
        <Header />
           

            <div className='mobile'>
                

                <section >
                    <div className='container-fluid'>
                        <div className='error-body-section' >
                            <p className='font-18x opps-line'>OOPS!</p>
                            <p className='font-30x text-center'>This is not the page you <br /> are looking for!</p>
                            <p className='font-16x text-center' id="secondry-text">A bed with a good storage space  for  multiple purpose  you can use it in different   ways. A <br />bed with a good storage space  for  multiple <br /> purpose  you can use it.</p>
                            <Link href="#">
                                <button className='main-button' style={{ marginTop: '70px' }}>
                                    <p className='mb-0 font-18x text-center text-white'>GO BACK TO HOME</p>
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>

                <section className='subscribe-letter'>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-12'>
                                <p className='subscrible-heading mb-0'>Subscribe to our newsletter.</p>
                                <p className='font-12x mt-1 mb-0' id="secondry-text">Get our latest offers and news straight in your inbox.</p>
                                <form className="d-flex mt-4 input-box">
                                    <input className="form-control me-2" type="search" placeholder="Please enter your email address.." aria-label="Search" />
                                    <button className='main-button' style={{ width: '155px', height: '42px', borderRadius: '0' }}>
                                        <p className='mb-0 font-12x text-center text-white'>SUBSCRIBE</p>
                                    </button>
                                </form>
                            </div>

                            <div className='col-12 mt-5'>
                                <p className='subscrible-heading mb-0'>Download our apps.</p>
                                <p className='font-12x mt-1 mb-0' id="secondry-text">Shop our products and offers on-the-go.</p>
                                <div>
                                    <img src="/images/android-app.svg" alt="" className='me-3' />
                                    <img src="/images/ios-app.svg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                
            </div>
            <Footer />
        </>
    )
}

export default notFound