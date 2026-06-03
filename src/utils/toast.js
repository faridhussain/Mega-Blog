import { toast, Bounce } from 'react-toastify'

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

export const successToast = (message) => {
    toast.success(message, toastConfig)
}

export const errorToast = (message) => {
    toast.error(message, toastConfig)
}

export const infoToast = (message) => {
    toast.info(message, toastConfig)
}

export const warningToast = (message) => {
    toast.warning(message, toastConfig)
}