import Swal from "sweetalert2";

export const ConfirmCloseAlert=(type,message)=>{
    Swal.fire({
        icon: type,
        title: message,
        showConfirmButton: true, 
    })
}