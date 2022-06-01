const { toast } = require('react-toastify');

export default function successToast (msg){
  return  toast.success(msg, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 8000
  })}
export const infoToast = (msg) =>
  toast.info(msg, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: false
  });
export const warnToast = (msg) =>
  toast.warn({
    position: toast.POSITION.BOTTOM_RIGHT
  });
export const errorToast = (msg) =>
  toast.error(msg, {
    position: toast.POSITION.BOTTOM_RIGHT
  });
