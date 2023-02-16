import http from "./http-common";

//função que retorna todos os usuários do sistema
function systemusers(token){
    return http
        .post("/getsystemusers/", {
            token,
        })
        .then(response => {
            return response.data;
        })
        .catch(error => console.log(error));
}

const endpoint = {
    systemusers,
};

export default endpoint;