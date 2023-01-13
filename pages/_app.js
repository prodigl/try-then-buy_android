import { useState, useEffect } from "react";
import { PageHead, Header, Notifications } from "../components";
import StateProvider from "../providers/CategoryContext";
import AuthContext from "../providers/AuthContext";
import CartContext from "providers/CartContext";
import Loader from "components/LoadingHome";
import Router from "next/router";
import api from "helpers/api";
import Miscellaneous from "providers/Miscellaneous";
// import { PushNotifications } from '@capacitor/push-notifications';
import { App } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Confirm from "components/ConfirmBox";

const MyApp = ({ Component, pageProps, router, data }) => {
  let { title, description } = pageProps;
  const [isloading, setLoad] = useState(false);
  const [loading, setLoading] = useState(false);

  //Confirm box dialoag
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setInterval(() => {
      setLoad(true);
    }, 2000);
  }, []);

  useEffect(() => {
    Router.events.on("routeChangeStart", () => setLoading(true));
    Router.events.on("routeChangeComplete", () => {
      window.scrollTo({
        top: 0,
        left: 0,
      });
      setLoading(false);
    });
    Router.events.on("routeChangeError", () => setLoading(false));
    return () => {
      Router.events.off("routeChangeStart", () => setLoading(true));
      Router.events.off("routeChangeComplete", () => setLoading(false));
      Router.events.off("routeChangeError", () => setLoading(false));
    };
  }, [Router.events]);

  // useEffect(() => {
  //   // alert("Alert")
  //   PushNotifications.checkPermissions().then((res) => {
  //     if (res.receive !== "granted") {
  //       alert("yes");
  //       PushNotifications.requestPermissions().then((res) => {
  //         if (res.receive === "denied") {
  //           // alert("denied")
  //           // showToast('Push Notification permission denied');
  //         } else {
  //           // alert("register")
  //           // showToast('Push Notification permission granted');
  //           register();
  //         }
  //       });
  //     } else {
  //       // alert("no")
  //       register();
  //     }
  //   });
  // }, []);

  // const register = () => {
  //   // console.log('Initializing HomePage');

  //   console.log("Registring the device on firebase.");

  //   // Register with Apple / Google to receive push via APNS/FCM
  //   PushNotifications.register();

  //   // On success, we should be able to receive notifications
  //   PushNotifications.addListener("registration", (token) => {
  //     // showToast('Push registration success');
  //     // setDeviceToken(token.value)
  //     localStorage.setItem("fcm_token", token.value);

  //     console.log("token for push notification", token.value);
  //   });

  //   useEffect(async () => {
  //     const fcmToken = localStorage.getItem("fcm_token");
  //     const authToken = localStorage.getItem("token");
  //     try {
  //       if (authToken && authToken) {
  //         const res = await api.post(
  //           "save-token",
  //           {
  //             device_token: fcmToken,
  //           },
  //           {
  //             headers: {
  //               Authorization: `Bearer ${authToken}`,
  //             },
  //           }
  //         );

  //         console.log("save-token", res.data);
  //       }
  //     } catch (error) {
  //       console.log(error.response);
  //     }
  //   }, []);

  //   // Method called when tapping on a notification
  //   PushNotifications.addListener(
  //     "pushNotificationActionPerformed",
  //     (notification) => {
  //       console.log("push notification", notification);
  //       // console.log("push notification text", notification.notification.data.body)
  //       navigate("/notifications");
  //       // setnotifications(notifications => [...notifications, { id: notification.notification.data.id, title: notification.notification.data.title, body: notification.notification.data.body, type: 'action' }])
  //     }
  //   );
  // };

  useEffect(() => {
    
    if (Capacitor.isNativePlatform()) {
      App.addListener("backButton", (e) => {
        if (window.location.pathname === "/") {
          let logged = JSON.parse(localStorage.getItem("logged"));
          // Show A Confirm Box For User to exit app or not
          // setIsModalOpen(true);
          // App.exitApp();
          alert(logged);
          if (logged == false) {
            handleShow();
          }
        } else {
          history.back();
        }
      });
    }
  }, []);

  return (
    <>
      <PageHead title={title} description={description} path={router.asPath} />
      <AuthContext>
        <CartContext>
          <StateProvider>
            <Miscellaneous>
              <SkeletonTheme color="#F5F5F5" highlightColor="#ffffff">
                <>
                  {!isloading ? (
                    ""
                  ) : loading ? (
                    <Loader />
                  ) : (
                    <>
                      <Component {...pageProps} />
                      <Notifications />
                    </>
                  )}
                </>
              </SkeletonTheme>
            </Miscellaneous>
          </StateProvider>
        </CartContext>
      </AuthContext>

      <Confirm show={show} handleClose={handleClose} />
    </>
  );
};

export default MyApp;
