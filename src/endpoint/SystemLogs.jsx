import http from "./http-common";

function systemlogs(token){
    return http.
        post("/getloggedusers/", {
            token,
        })
        .then(response => {
            return response.data;
        })
        .catch(error => console.log(error));
}

const endpoint = {
    systemlogs,
};

export default endpoint;