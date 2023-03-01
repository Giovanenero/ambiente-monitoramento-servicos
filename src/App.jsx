import Navigation from "./components/Navigation";
import endpoint from "./endpoint/SystemUsers";

import { useState, useEffect } from "react";

import './App.css';

function App() {
    const queryParameters = new URLSearchParams(window.location.search);
    const [isAdm, setIsAdm] = useState(false);
    const [token, setToken] = useState()
    
    useEffect(() => {
        let auxToken = queryParameters.get("token"); 
        if(auxToken){
            localStorage.setItem("token", auxToken);
            setToken(auxToken);    
        } else {
            setToken(localStorage.getItem("token"));
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(token){
            endpoint.infouser(token)
            .then(data => {
                if(data.isAdmin){
                    setIsAdm(true);
                } else {
                    alert("Apenas admin pode ter acesso a esta página")
                }
            })
            .catch((error) => console.log(error));
        }
    }, [token])

    return ( 
        <div className="App" >
            {isAdm && <Navigation token={token}/>}
        </div>
    );
}

export default App;