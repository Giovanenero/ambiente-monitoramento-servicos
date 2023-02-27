import styles from "./../assets/components/Service.module.css";
import ServidorIcon from "../assets/icons/jsxIcons/ServidorIcon";
import { Link } from "react-router-dom";

import endpoint from "../endpoint/UserStorage";

import { useState, useEffect } from "react";
function Service({
    nameService,
    logo,
    css,
    path,
}){
    const [imgService, setImgService] = useState("");
    const [infoService, setInfoService] = useState("");
    const [useMemory, setUseMemory] = useState("");
    const [graphic, setGraphic] = useState([]);


    function memoryMongo(){
        endpoint.mongomemoryusegraph(localStorage.getItem("token"))
        .then(data => {
            setGraphic(data);
            let total = parseInt(data[0].MemoryTotal);
            let memoryUse = parseInt(data[0].MemoryUse);
            let porcentage = ((memoryUse/total)*100).toFixed(2);
            setUseMemory({
                Gb: (memoryUse/1000).toFixed(2),
                porcentage: porcentage,
            });
        })
        .catch(error => console.log(error));
    }

    function memoryJava(){
        endpoint.javamemoryusegraph(localStorage.getItem("token"))
            .then(data => {
                setGraphic(data)
                let total = parseInt(data[0].MemoryTotal);
                let memoryUse = parseInt(data[0].MemoryUse);
                let porcentage = ((memoryUse/total)*100).toFixed(2);
                setUseMemory({
                    Gb: (memoryUse/1000).toFixed(2),
                    porcentage: porcentage,
                });
        })
        .catch(error => console.log(error));
    }

    function memoryServidor(){
        endpoint.servermemoryusegraph(localStorage.getItem("token"))
        .then(data => {
            setGraphic(data);
            let total = parseInt(data[0].MemoryTotal);
            let memoryUse = parseInt(data[0].MemoryUse);
            let porcentage = ((memoryUse/total)*100).toFixed(2);
            setUseMemory({
                Gb: (memoryUse/1000).toFixed(2),
                porcentage: porcentage,
            });
        })
        .catch(error => console.log(error));
    }  

    useEffect(() => {
        if(nameService === "MongoDB" || nameService === "Java" || nameService === "Spring" || nameService === "Spark"){
            setImgService(<img src={logo} alt={logo} className={css}/>)
            if(nameService === "MongoDB"){
                memoryMongo();
            } else {
                memoryJava();
            }
        } else {
            setImgService(<div className={css}><ServidorIcon style={{size: 70}}/></div>);
            memoryServidor();
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if(nameService === "MongoDB" || nameService === "Java"){
            setInfoService(
                <>
                    <h2>STATUS</h2>
                    <p>Conectado/Desconectado</p>
                    <h2>USO DA MEMÓRIA</h2>
                    <p>{`${useMemory.Gb}Gb (${useMemory.porcentage}%)`}</p>
                </>
            )
        } else {
            endpoint.cpudiskusegraph(localStorage.getItem("token"))
            .then(data => {
                let useDisk = parseInt(data[0].DiskUse);
                let porcentage = ((useDisk/parseInt(data[0].DiskTotal))*100).toFixed(2);
                setInfoService(
                    <>
                        <h2>USO DE DISCO</h2>
                        <p>{`${useDisk}Gb (${porcentage}%)`}</p>
                        <h2>USO DA CPU/RAM</h2>
                        <p>{`${data[0].CpuUse}% / ${useMemory.Gb}Gb (${useMemory.porcentage}%)`}</p>
                    </>
                )
            })
            .catch(error => console.log(error));
        }
        // eslint-disable-next-line
    }, [useMemory]);

    return (
        <div className={styles.containerService}>
            {imgService}
            <div className={styles.title}>
              <p>{nameService}</p>  
            </div>
            <div className={styles.containerInfo}>
                {infoService}
            </div>
            <Link to={{pathname: path, state: {logo: logo, graphic: graphic}}}>
                <button>Ver mais</button>
            </Link>
        </div>
    )
}

export default Service;