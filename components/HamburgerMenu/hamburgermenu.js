import { useState, useEffect, memo } from 'react';
import Link from 'next/link';
import { AuthValidation } from 'providers/AuthContext';
import api from 'helpers/api';

const hamburgermenu = ({
    value,
    setCloseMenu,
    updateCartItem,
    token,
    updateWishlist,
    updateSliderActive, 
}) => {
    // Auth State Mangment------------
    const { user, userLogout } = AuthValidation();

    const [category, setCategory] = useState();
    const [subcategory, setSubcategory] = useState();
    const [verify, setVerify] = useState();
    const [isOpenOrder, setIsOpenOrder] = useState(false);

    const logoutUser = () => {
        userLogout();
        updateCartItem('');
        updateWishlist('');
        setCloseMenu(false);
        updateSliderActive();
    };

    const setPositionToBody = () => {
        setCloseMenu(false);
        updateSliderActive();
    };

    const openChild = (slug) => {
        setVerify(slug);
        setIsOpenOrder(!isOpenOrder);
    };

    const fetchCategory = async () => {
        const url = `header-category`;
        try {
            const res = await api.get(url);
            if (res) {
                console.log('category form mobile', res.data.data);
                setCategory(res.data.data);
            }
        } catch (error) {
            console.error('category error', error);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, [hamburgermenu]);

    useEffect(() => {
        setSubcategory(category?.category[0]?.subs);
    }, [category]);

    //subcategory
    const subCategory = (sub) => {
        setSubcategory(sub);
    };

    return (
        <>
            <div
                className={
                    value ? 'menuWrapper menuWrapper-active' : 'menuWrapper'
                }>
                <div className="menuContainer">
                    <div className="container-fluid">
                        <div className="row">
                            <div
                                className="col-12 d-flex align-items-center mobile-header-fixed"
                                style={{
                                    // paddingTop:'12px',
                                    // paddingBottom : '12px'
                                    height: '62px',
                                }}>
                                <img
                                    src="/images/back.png"
                                    className="img-fluid"
                                    onClick={setPositionToBody}
                                />
                                <img
                                    // src="/images/user-image.svg"
                                    src="/icons/client/profile.svg"
                                    className="img-fluid ms-3"
                                    height={30}
                                />
                                {user ? (
                                    <Link href={`/account`} >
                                        <div className="d-flex flex-column" onClick={()=>updateSliderActive()}>
                                            <p className="mb-0 font-14x ms-3">
                                                {user?.name}
                                            </p>
                                            <p className="mb-0 font-14x ms-3">
                                                {user?.phone}
                                            </p>
                                        </div>
                                    </Link>
                                ) : (
                                    <p className="mb-0 ms-3">User</p>
                                )}
                            </div>
                        </div>

                        <div className="row" style={{ marginTop: '62px' }}>
                            <div className="col-6 px-0 mobile-side-category">
                                {category?.category?.map((item) => {
                                    return (
                                        <>
                                            <ul
                                                className={
                                                    subcategory === item.subs
                                                        ? 'mobile-sec-category-active'
                                                        : 'mobile-sec-category'
                                                }>
                                                <li
                                                    onClick={() =>
                                                        subCategory(item.subs)
                                                    }>
                                                    {item.name}
                                                </li>
                                            </ul>
                                        </>
                                    );
                                })}
                                <Link href={`/account/order`}>
                                    <ul
                                        className="mobile-sec-category"
                                        style={{
                                            background: 'rgb(251 251 251)',
                                        }}
                                        onClick={() => updateSliderActive()}>
                                        <li>Track</li>
                                    </ul>
                                </Link>
                                <Link href={`/faq`}>
                                    <ul
                                        className="mobile-sec-category"
                                        style={{
                                            background: 'rgb(251 251 251)',
                                        }}
                                        onClick={() => updateSliderActive()}>
                                        <li>Help</li>
                                    </ul>
                                </Link>
                                <Link href={`/`}>
                                    <ul
                                        className="mobile-sec-category"
                                        style={{
                                            background: 'rgb(251 251 251)',
                                        }}
                                        onClick={() => updateSliderActive()}>
                                        <li>Spin & Wheel</li>
                                    </ul>
                                </Link>
                                {token && (
                                    <Link href={`/account`}>
                                        <ul
                                            className="mobile-sec-category"
                                            style={{
                                                background: 'rgb(251 251 251)',
                                            }}
                                            onClick={() =>
                                                updateSliderActive()
                                            }>
                                            <li>My Account</li>
                                        </ul>
                                    </Link>
                                )}

                                {token && (
                                    <Link href={`/account/address`}>
                                        <ul
                                            className="mobile-sec-category"
                                            style={{
                                                background: 'rgb(251 251 251)',
                                            }}
                                            onClick={() =>
                                                updateSliderActive()
                                            }>
                                            <li>Manage Address</li>
                                        </ul>
                                    </Link>
                                )}

                                {token && (
                                    <Link href={`/account/transactions`}>
                                        <ul
                                            className="mobile-sec-category"
                                            style={{
                                                background: 'rgb(251 251 251)',
                                            }}>
                                            <li>Transactions</li>
                                        </ul>
                                    </Link>
                                )}

                                {token && (
                                    <Link href={`/account/loyalty`}>
                                        <ul
                                            className="mobile-sec-category"
                                            style={{
                                                background: 'rgb(251 251 251)',
                                            }}
                                            onClick={() =>
                                                updateSliderActive()
                                            }>
                                            <li>Loyalty Point</li>
                                        </ul>
                                    </Link>
                                )}

                                {token && (
                                    <ul
                                        className="mobile-sec-category"
                                        style={{
                                            background: 'rgb(251 251 251)',
                                        }}
                                        onClick={logoutUser}>
                                        <li>Logout</li>
                                    </ul>
                                )}
                            </div>
                            <div className="col-6 mobile-side-subcategory px-0">
                                {subcategory &&
                                    subcategory?.map((item) => {
                                        return (
                                            <>
                                                <div className="row d-flex my-3 ">
                                                    <div
                                                        className="col-10 ps-4"
                                                        onClick={() =>
                                                            updateSliderActive()
                                                        }>
                                                        <Link
                                                            href={`/sub-category/${item.slug}`}>
                                                            <p className="mb-0 ">
                                                                {item.name}
                                                            </p>
                                                        </Link>
                                                    </div>

                                                    <div
                                                        className="col-2 ps-0 text-center"
                                                        onClick={() => {
                                                            openChild(
                                                                item.slug
                                                            );
                                                        }}>
                                                        <img
                                                            src="/images/dropdownIcon.svg"
                                                            className={
                                                                verify ===
                                                                    item.slug &&
                                                                isOpenOrder
                                                                    ? ''
                                                                    : 'dActive'
                                                            }
                                                        />
                                                    </div>
                                                    {verify === item.slug &&
                                                        isOpenOrder && (
                                                            <div className="pt-2 px-0">
                                                                {item?.childs?.map(
                                                                    (child) => {
                                                                        return (
                                                                            <>
                                                                                <Link
                                                                                    href={`/child-category/${child.slug}`}>
                                                                                    <div
                                                                                        className={`row m-0 d-flex align-items-center py-2 `}
                                                                                        style={{
                                                                                            background:
                                                                                                '#f7f7f7',
                                                                                        }}
                                                                                        onClick={() =>
                                                                                            updateSliderActive()
                                                                                        }>
                                                                                        <div className="col-12 px-0">
                                                                                            <p className="mb-0  ps-4">
                                                                                                {
                                                                                                    child.name
                                                                                                }
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                </Link>
                                                                            </>
                                                                        );
                                                                    }
                                                                )}
                                                            </div>
                                                        )}
                                                </div>
                                            </>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default memo(hamburgermenu);
