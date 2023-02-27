import http from "./http-common";

//Retorna cpu (em %) e disco (em GB) usado pelo Servidor
function cpudiskusegraph(token){
    return http.post("/getcpudiskusegraph/", {token})
    .then(response => {return response.data})
    .catch(error => console.log(error));
}

//Retorna a memória utiliza pelo Java
function javamemoryusegraph(token){
    return http.post("/getjavamemoryusegraph/", {token})
    .then(response => {return response.data})
    .catch(error => console.log(error));
}

//Retorna a memória utilizada pelo MongoDB
function mongomemoryusegraph(token){
    return http.post("/getmongomemoryusegraph/", {token})
    .then(response => {return response.data})
    .catch(error => console.log(error));
}

//Retorna a memória utiliza pelo Servidor
function servermemoryusegraph(token){
    return http.post("/getservermemoryusegraph/", {token})
    .then(response => {return response.data})
    .catch(error => console.log(error));
}

const endpoint = {
    cpudiskusegraph,
    mongomemoryusegraph,
    javamemoryusegraph,
    servermemoryusegraph,
};

export default endpoint;