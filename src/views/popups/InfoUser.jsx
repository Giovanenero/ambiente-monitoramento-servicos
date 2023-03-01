import styles from "./../../assets//views/popups/InfoUser.module.css";

import photo from "./../../assets/img/foto-perfil.jpg";

import { useState, useEffect } from "react";

import endpoint from "./../../endpoint/SystemUsers";

function InfoUser({user, token}){

    const [accessHistory, setAccessHistory] = useState([]);

    useEffect(() => {
        let i;
        let listAccessHistory = [];
        for(i = 0; i < 10; i++){
            let aux = {
                date: "10/05/2022 às 10:53:24",
                action: "login"   
            }
            listAccessHistory.push(aux);
        }
        setAccessHistory(listAccessHistory);

        endpoint.useraccess(token, "63fcfa6e46f3667bd5163164")
        .then(data => console.log(data))
        .catch(error => console.log(error));
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
                </header>
                <div className={styles.logs}>
                    {accessHistory.map((element, index) => {
                        return (
                            <div key={index}>
                                <p>{element.date}</p>
                                <p>{element.action}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default InfoUser;