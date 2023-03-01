import http from "./http-common";

//função que retorna as informações do usuário pelo token
function infouser(token){
    return http
        .post("/getuser/", {token})
        .then(response => {return response.data})
        .catch(error => console.log(error));
}

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

//função que retorna todos os usuários online
function systemlogs(token){
    // eslint-disable-next-line 
    return http.
        post("/getloggedusers/", {
            token,
        })
        .then(response => {
            return response.data;
        })
        .catch(error => console.log(error));
}

//função que retorna os registros do sistema de um usuário em específico pelo seu ID
function useraccess(token, id){
    return http.post("/getsystemlogsbyuserid/", {
        token,
        id,
    })
    .then(response => {return response.data})
    .catch(error => console.log(error))
}

const endpoint = {
    systemusers,
    systemlogs,
    useraccess,
    infouser,
};

export default endpoint;