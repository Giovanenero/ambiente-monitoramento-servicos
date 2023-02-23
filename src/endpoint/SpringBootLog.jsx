import http from "./http-common";

//função que retorna um arquivo de log do spring boot
function springbootlog(){
    return http.post("/getspringbootlog/")
    .then(response => {return response.data})
    .catch(error => console.log(error));
}

const endpoint = {
    springbootlog,
}

export default endpoint;