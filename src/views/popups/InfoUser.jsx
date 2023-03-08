import styles from "./../../assets//views/popups/InfoUser.module.css";

import photo from "./../../assets/img/foto-perfil.jpg";

import { useState, useEffect } from "react";

import endpoint from "./../../endpoint/SystemUsers";
import DataParse from "./../../helpers/DataParse";

function InfoUser({user, token}){

    const [accessHistory, setAccessHistory] = useState([]);

    useEffect(() => {
        if(user){
            endpoint.useraccess(token, user.userId)
            .then(data => {
                data.forEach((element, index) => {
                    let time = DataParse.parseDate(element.date)
                    if(time){
                        data[index].date = time;
                    } else {
                        data[index.date] = "Erro"
                    }
                })
                setAccessHistory(data.reverse());
            })
            .catch(error => console.log(error));
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div className={styles.containerInfoUser}>
            <div className={styles.containerPersonalInfo}>
                <div className={styles.nameUser}>
                    <img src={photo} alt="foto do perfil" />
                    <div>
                        <p>{user.firstName}</p>
                        <p>{user.lastName}</p>
                    </div>
                </div>
                <div className={styles.email}>{user.email}</div>
                <div className={styles.block}>
                    <span>Local</span>
                    <ul>
                        <li>Cidade: {user.city}</li>
                        <li>Estado: {user.state}</li>
                        <li>País: {user.country}</li>
                    </ul>
                </div>
                <div className={styles.block}>
                    <span>Informações da Empresa</span>
                    <ul>
                        <li>Nome: {user.companyName}</li>
                        <li>Mercado: {user.companyMarketField}</li>
                        <li>Posição: {user.position}</li>
                        <li>funcionários: {user.companyNumberOfEmployees}</li>
                    </ul>
                </div>
                <div className={styles.block}>
                    <span>Informações do cliente com o ambiente da WiseML</span>
                    <ul>
                        <li>Experiência: {user.intendedUse}</li>
                        <li>Conheceu: {user.howCameToKnow}</li>
                    </ul>
                </div>
            </div>
            <div className={styles.userLogs}>
                <header>
                    <p>Data</p>
                    <span></span>
                    <p>Tipo de Ação</p>
                    <span></span>
                    <p>Status</p>
                </header>
                <div className={styles.logs}>
                    {accessHistory && accessHistory.map((element, index) => {
                        return (
                            <div key={index} className={element.jobStatus === "Failed" ? styles.failed : ""}>
                                <p>{element.date.day + " às " + element.date.hour}</p>
                                <p>{element.jobType === "ModelCreate" ? element.jobType + ": " + element.algorithmName : element.jobType}</p>
                                <p>{element.jobStatus}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default InfoUser;