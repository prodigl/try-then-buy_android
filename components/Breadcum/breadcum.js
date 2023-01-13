import Link from "next/link";
const Breadcum = ({category, subCategory, childcategory, productName}) => {
  return (
    <>
      <div className="col-12 pt-3">
        <nav >
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <Link href="/">
              <a>HOME</a>
              </Link>
            </li>
            {
              category?.name === 'Deleted' ? 
                null : <li className="breadcrumb-item">
                  <Link href={`/category/${category?.slug}`}>
                      <a >{category?.name.length > 20 ? category?.name.substring(0, 19) + "..." : category?.name}</a>
                  </Link>
              </li>
            }
            {
              subCategory?.name === 'Deleted' ? 
                null : <li className="breadcrumb-item">
                  <Link href={`/sub-category/${subCategory?.slug}`}>
                <a href="#">{subCategory?.name.length > 20 ? subCategory?.name.substring(0, 19) + "..." : subCategory?.name}</a>
                </Link>
              </li>
            }
            {
              childcategory?.name === 'Deleted' ? 
                null : <li className="breadcrumb-item">
                  <Link href={`/child-category/${childcategory?.slug}`}>
                <a >{childcategory?.name.length > 20 ? childcategory?.name.substring(0, 19) + "..." : childcategory?.name}</a>
                </Link>
              </li>
            }
            
            <li className="breadcrumb-item">
              <a href="#" style={{ color: "#F15733" }}>
             { productName?.length > 20 ? productName.substring(0, 19) + "..." : productName}
              </a>
            </li>
          </ol>
        </nav>
      </div>
    </>
  );
};

export default Breadcum;
