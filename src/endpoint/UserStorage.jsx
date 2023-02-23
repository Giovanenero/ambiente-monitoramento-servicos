import http from "./http-common";

//Retorna o espaço em disco do MongoDB
function mongodiskuse(){
    return http.post("/getmongodiskuse/")
    .then(response => {return response.data})
    .catch(error => console.log(error));
}

//Retorna a memória utiliza pelo Java
function javamemoryusegraph(){
    return http.post("/getjavamemoryusegraph/")
    .then(response => {return response.data})
    .catch(error => console.log(error));
}

//Retorna a memória utilizada pelo MongoDB
function mongomemoryusegraph(){
    return http.post("/getmongomemoryusegraph/")
    .then(response => {return response.data})
    .catch(error => console.log(error));
}

const endpoint = {
    mongodiskuse,
    mongomemoryusegraph,
    javamemoryusegraph,
};

export default endpoint;