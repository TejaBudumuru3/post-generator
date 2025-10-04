import {useEffect,useRef} from 'react';


const Toast = ({state,message})=>{

    const toastRef = useRef(null);

    useEffect(() => {
        const toastElement = toastRef.current;
        if (toastElement) {
            const toast = new bootstrap.Toast(toastElement);
            toast.show();
        }
    }, []);

    return (<>
    <div ref={toastRef} className={`toast fixed top-2 right-0 md:right-2 align-items-center text-bg-${state} border-0 margin-top-0`} role="alert" aria-live="assertive" aria-atomic="true" style={{zIndex:100}} >
        <div className="d-flex">
            <div className="toast-body">
            {message}
            </div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>

    </>)
}

export default Toast;