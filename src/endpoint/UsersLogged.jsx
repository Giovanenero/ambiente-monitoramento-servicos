import http from "./http-common";

function usersLogged(token){
    return http
        .post("/getnumberofuserslogged/", {
            token,
        })
        .then(response => {
            return response;
        })
        .catch(error => console.log(error));
}

const endpoint = {
    usersLogged,
};

export default endpoint;