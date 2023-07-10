import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  message: string;
};

function BottomRightToast({ message }: Props) {
  const notify = () => {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  useEffect(() => {
    notify();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <ToastContainer autoClose={5000} />
    </>
  );
}

export default BottomRightToast;
