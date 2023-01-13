import { config } from "config";
import { format } from "date-fns";
import { Header } from "components";
import Footer from "components/Footer";
import renderHTML from "helpers/renderHTML";
import Link from "next/link";

export const getStaticPaths = async () => {
  let url = `${config.apiUrl}blog`;

  const res = await fetch(url);
  const data = await res.json();

  const paths = data.data.map((crrElm) => {
    return {
      params: {
        id: crrElm.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  let url = `${config.apiUrl}blog/${id}`;

  const res = await fetch(url);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

const Blog = ({ data }) => {
  console.log("data", data);

  return (
    <>
      <Header />
      
      <div className="mobile">
        <div className="container-fluid mt-5 mobile-blog-system">
          <div className="img-overlay">
            <img
              src={`${config.blogImagePath}${data.data.photo}`}
              className="mobile-blog-bgimage "
            />
            <div className="container blog-txt ps-5 pe-4">
              <div className="row mb-2">
                <div className="col-3">
                  <p className="mb-0 font-12x  text-white " id="dim-text">
                    Date:
                  </p>
                </div>
                <div className="col-9">
                  <p className="mb-0 font-12x text-white" id="poppine">
                    {data.data.created_at &&
                      format(new Date(data.data.created_at), "dd.MM.yyyy")}
                  </p>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-3">
                  <p className="mb-0 font-12x  text-white" id=" dim-text">
                    Category:
                  </p>
                </div>
                <div className="col-9">
                  <p className="mb-0 font-12x text-white" id="poppine">
                    Dinner
                  </p>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-3">
                  <p className="mb-0 font-12x  text-white" id=" dim-text">
                    Auther:
                  </p>
                </div>
                <div className="col-9">
                  <p className="mb-0 font-12x text-white" id="poppine">
                    Admin
                  </p>
                </div>
              </div>
              <h1 className="font-22x text-white mt-3" id="poppine">
                {data.data.title}
              </h1>
            </div>
          </div>
        </div>

        <div className="container-fluid mt-4">
          <p className="font-18x fw-bold" id="secondry-black">
            Tags
          </p>

          <div className="d-flex flex-wrap mb-5">
            {data.data.tags?.split(",")?.map((e, i) => {
              return (
                <>
                  <button className="tags me-2 mb-2">{e}</button>
                </>
              );
            })}
          </div>

          <p id="secondry-black" className="font-17x">
            {renderHTML(data.data.details)}
          </p>

          <p className="font-18x fw-bold mb-0 mt-4" id="secondry-black">
            Share
          </p>
          <div className="d-flex justify-content-between align-items-center mt-4">
            <img src="/images/facebook-blog.svg" width="82px" />
            <img src="/images/pinterest.svg" width="78px" />
            <img src="/images/twitter.svg" width="68px" />
            <img src="/images/linkdin-blog.svg" width="75px" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
