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


    function memoryMongo(){
        endpoint.mongomemoryusegraph()
        .then(data => {
            setUseMemory((data[0].MemoryUse/1000).toFixed(2));
        })
        .catch(error => console.log(error));
    }

    function memoryJava(){
        endpoint.javamemoryusegraph()
            .then(data => {
            setUseMemory((data[0].MemoryUse/1000).toFixed(2));
        })
        .catch(error => console.log(error));
    }

    function memoryServidor(){
        let sum = 0;
        endpoint.mongomemoryusegraph()
        .then(data => {
            sum += data[0].MemoryUse/1000;
            endpoint.javamemoryusegraph()
            .then(data => {
                sum += data[0].MemoryUse/1000;
                setUseMemory(sum.toFixed(2));
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    }  

    useEffect(() => {
        if(nameService === "MongoDB" || nameService === "Java"){
            setInfoService(
                <>
                    <h2>STATUS</h2>
                    <p>Conectado/Desconectado</p>
                    <h2>USO DA MEMÓRIA</h2>
                    <p>{useMemory + "GB"}</p>
                </>
            )
        } else {
            endpoint.mongodiskuse()
            .then(data => {
                setInfoService(
                    <>
                        <h2>USO DE DISCO</h2>
                        <p>{(data/1000).toFixed(2) + "GB"}</p>
                        <h2>USO DA MEMÓRIA</h2>
                        <p>{useMemory + "GB"}</p>
                    </>
                )
            })
            .catch(error => console.log(error));
        }
        // eslint-disable-next-line
    }, [useMemory]);

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

    return (
        <div className={styles.containerService}>
            {imgService}
            <div className={styles.title}>
              <p>{nameService}</p>  
            </div>
            <div className={styles.containerInfo}>
                {infoService}
            </div>
            <Link to={{pathname: path, state: {logo: logo}}}>
                <button>Ver mais</button>
            </Link>
        </div>
    )
}

export default Service;