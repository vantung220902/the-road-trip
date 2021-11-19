import { toast } from 'react-toastify';
export const toastError = (error) => {
    let message = null;
    if (typeof error === 'object' && error.message) {
        message = error.message;
        toast.error(message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            zIndex: 99,
        });
    }
};
