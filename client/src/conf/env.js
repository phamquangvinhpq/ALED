import swal from 'sweetalert';
export const DEFAULT_API = 'https://sos.hachinet.com/'
// export const DEFAULT_API = 'http://localhost:8080/' 
export const MESSAGE = (result) => {
    if(result.loicode == -1 ){
        swal("Thất Bại", result.message, "error")
        return false
    }
    else{
        swal("Thành Công", "", "success")
        return true
    }
}
