import styles from "./../assets/components/Service.module.css";
import ServidorIcon from "../assets/icons/jsxIcons/ServidorIcon";
import { Link } from "react-router-dom";

import endpoint from "../endpoint/UserStorage";

import { useState, useEffect } from "react";
function Service({
    nameService,
    logo,
    css,
}){
    const [imgService, setImgService] = useState(null);
    const [useMemory, setUseMemory] = useState(null);
    useEffect(() => {
        if(nameService === "MongoDB" || nameService === "Spring" || nameService === "Spark"){
            setImgService(<img src={logo} alt={logo} className={css}/>)
            if(nameService === "MongoDB"){
                endpoint.mongomemoryusegraph()
                .then(data => {
                    let memoryMongo = data[0].MemoryUse/1000;
                    console.log(memoryMongo.toFixed(2));
                })
                .catch(error => console.log(error));
            }
        } else {
            setImgService(<div className={css}><ServidorIcon style={{size: 70}}/></div>);
                let memoryMongo = 0;
                endpoint.mongomemoryusegraph()
                .then(data => {
                    memoryMongo = data[0].MemoryUse/1000;
                })
                .catch(error => console.log(error));

                endpoint.javamemoryusegraph()
                .then(data => {
                setUseMemory((memoryMongo + (data[0].MemoryUse/1000)).toFixed(2));
            })
            .catch(error => console.log(error));
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
                <>
                    <h2>STATUS</h2>
                    <p>Conectado/Desconectado</p>
                    <h2>USO DA MEMÓRIA</h2>
                    <p>{useMemory + "GB"}</p>
                </>
            </div>
            <Link to={{pathname: `/${nameService.toLowerCase()}`, state: {logo: logo}}}>
                <button>Ver mais</button>
            </Link>
        </div>
    )
}

export default Service;