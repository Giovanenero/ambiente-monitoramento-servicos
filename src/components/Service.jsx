import styles from "./../assets/components/Service.module.css";
import ServidorIcon from "../assets/icons/jsxIcons/ServidorIcon";
import { Link } from "react-router-dom";

function Service({
    nameService,
    logo,
    css,
}){
    function img(){
        if(nameService === "MongoDB" || nameService === "Spring" || nameService === "Spark"){
            return <img src={logo} alt={logo} className={css}/>
        } else {
            return (
                <div className={css}>
                    <ServidorIcon style={{size: 70}}/>
                </div>
            )
        }
    }

    return (
        <div className={styles.containerService}>
            {img()}
            <div className={styles.title}>
              <p>{nameService}</p>  
            </div>
            <div className={styles.containerInfo}>
                <h2>STATUS</h2>
                <p>Desconectado</p>
                <h2>USO DA MEMÓRIA</h2>
                <p>ESTOURANDO</p>
            </div>
            <Link to={{pathname: `/${nameService.toLowerCase()}`, state: {logo: logo}}}>
                <button>Ver mais</button>
            </Link>
        </div>
    )
}

export default Service;