import { toast, Bounce } from 'react-toastify'

// shared toast configuration used across the application
const toastConfig = {
    position: 'bottom-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
    transition: Bounce
}

// show success notification
export const successToast = (message) => {
    toast.success(message, toastConfig)
}

// show error notification
export const errorToast = (message) => {
    toast.error(message, toastConfig)
}

// show informational notification
export const infoToast = (message) => {
    toast.info(message, toastConfig)
}

// show warning notification
export const warningToast = (message) => {
    toast.warning(message, toastConfig)
}