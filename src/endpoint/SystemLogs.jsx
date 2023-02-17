import http from "./http-common";

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

const endpoint = {
    systemlogs
};
export default endpoint;