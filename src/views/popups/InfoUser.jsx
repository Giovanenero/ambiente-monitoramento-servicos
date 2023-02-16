import styles from "./../../assets//views/popups/InfoUser.module.css";

import photo from "./../../assets/img/foto-perfil.jpg";

import { useState, useEffect } from "react";

function InfoUser(){

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
    }, []);

    return (
        <div className={styles.containerInfoUser}>
            <div className={styles.containerPersonalInfo}>
                <div className={styles.nameUser}>
                    <img src={photo} alt="foto do perfil" />
                    <div>
                        <p>Giovane</p>
                        <p>Limas Salvi</p>
                    </div>
                </div>
                <div className={styles.email}>giovanesalvi@alunos.utfpr.edu.br</div>
                <div className={styles.block}>
                    <span>Local</span>
                    <ul>
                        <li>Cidade: Curitiba/PR;</li>
                        <li>País: Brasil;</li>
                    </ul>
                </div>
                <div className={styles.block}>
                    <span>Informações da Empresa</span>
                    <ul>
                        <li>nome: VASPP;</li>
                        <li>Mercado: Autônomo;</li>
                        <li>Posição: Administrador;</li>
                        <li>funcionários: 234;</li>
                    </ul>
                </div>
                <div className={styles.block}>
                    <span>Informações do cliente com o ambiente da WiseML</span>
                    <ul>
                        <li>Cliente experiente;</li>
                        <li>Conheceu através de Redes Sociais;</li>
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