import { useState, useEffect } from "react";
import { config } from "config";
import Link from "next/link";
import { format } from "date-fns";
import NewsLetter from "components/NewsLetter";
import { Header } from "components";
import Footer from "components/Footer";

export const getStaticProps = async () => {
  let url = `${config.apiUrl}blog`;

  const res = await fetch(url);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

const Blog = ({ data }) => {
  console.log("data", data.data);

  return (
    <>
      <Header />
      

      {/* mobile view */}
      <div className="mobile mt-4">
        <div className="container-fluid">
          <h1 className="font-26x fw-bold pb-8" style={{ marginTop: "140px" }}>
            Our Blog
          </h1>
          <div className="row">
            {
              data.data.slice(0, 2).map((value) => {
                return (
                  <>
                    <Link href={`/blog/${value.id}`}>
                      <div className="col-12 mt-4">
                        <div className="blog-image-separate ">
                          <img
                            src={`${config.blogImagePath}${value.photo}`}
                            className="blog-box-image"
                          />
                          <span className="blog-inside-shadow"></span>
                          <div className="box-heading ">
                            <h1
                              className="font-22x text-white pe-4"
                              id="poppine"
                              style={{ fontWeight: 600 }}
                            >
                              {value.title}
                            </h1>
                            <div className="d-flex align-items-center mt-2">
                              <img
                                src="/images/image1.jpg"
                                className="user-image"
                              />
                              <p className="mb-0 font-12x ms-2" id="date-text">
                                Author
                              </p>
                              <p className="mb-0 font-12x ms-3" id="date-text">
                                {value.created_at && format(new Date(value.created_at), "dd.MM.yyyy")}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </>
                )
              })
            }


            <div className="col-12 mb-4">
              <h3 className="font-18x fw-bold mt-5">Join our list</h3>
              <p className="font-14x" id="secondry-text">
                Signup to be the first to hear about exclusive deals, special
                offers, new products.
              </p>

              <div className="subscribe-blog d-flex justify-content-between">
                <input type="text" placeholder="Your email address" />
                <button>Subscribe</button>
              </div>
            </div>
            {
              data.data.slice(2, data.data.length).map((value) => {
                return (
                  <>
                    <Link href={`/blog/${value.id}`}>
                      <div className="col-12 mt-4">
                        <div className="blog-card">
                          <img src={`${config.blogImagePath}${value.photo}`} className="card-img-top" />
                          <div className="blog-card-body">
                            <div className="d-flex flex-wrap mt-4">
                              {value.tags?.split(",")?.map((e, i) => {
                                return (
                                  <>
                                    <button className="tags me-2 mb-2">{e}</button>
                                  </>
                                );
                              })}
                            </div>

                            <h5 className="font-18x fw-bold" id="secondry-black">
                              {value.title}
                            </h5>
                            <p className="font-12x mb-0 mt-3">
                              Author <span className="ms-3">
                                {
                                  value.created_at && format(new Date(value.created_at), 'dd.MM.yyyy')
                                }</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </>
                )
              })
            }


          </div>
        </div>

        <div className="container" style={{ marginTop: "50px" }}>
          <NewsLetter />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Blog;
