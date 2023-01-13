import { toast } from "react-toastify";

const defaultOptions = {
  autoClose: 3 * 1000,
  hideProgressBar: true,
  closeButton: false,
  position: toast.POSITION.BOTTOM_LEFT,
};

const showNotification = (message, type = "info", options = {}) => {
  if (options.notificationId) {
    return toast.update(options.notificationId, {
      ...defaultOptions,
      render: message,
      type,
      hideProgressBar: true,
      ...options,
    });
  } else {
    toast.dismiss();

    return toast[type](message, { ...defaultOptions, ...options });
  }
};

export default showNotification;

export const showErrorNotification = (error) => {
  console.error(error);
  showNotification(error.message || error, "error");
};
