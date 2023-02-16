import styles from "./../../assets/views/pages/UsersSystem.module.css";

import { FiSearch } from "react-icons/fi";

import { useState, useEffect } from "react";

import { PopUp } from "../../components/PopUp";
import InfoUser from "../popups/InfoUser";

function UsersSystem(){

    const [trigger, setTrigger] = useState();
    const [usersInfo, setUsersInfo] = useState([]);

    useEffect(() => {
        setTrigger(false)
        let i;
        let listUsersInfo = [];
        for(i = 0; i < 14; i++){
            let aux = {
                name: "wise",
                memory: "10MB",
                action: "login",
                date: "10/02/2023 às 14:08:18",
            }
            listUsersInfo.push(aux);
        }
        setUsersInfo(listUsersInfo);
    }, []);
    return (
        <>
            <div className={styles.containerUsersSystem}>
                <div className={styles.title}>
                    <p>Usuários do Sistema</p>
                    <p>Qntd. de Usuários: {usersInfo.length}</p>
                </div>
                <div className={styles.containerSearch}>
                    <div className={styles.input}>
                        <input type="text" placeholder="Pesquisar pelo nome do usuário" onChange={(e) => console.log(e.target.value)}></input>
                        <FiSearch />
                    </div>
                </div>
                <div className={styles.containerContent}>
                    <header className={styles.header}>
                        <p>usuário</p>
                        <span></span>
                        <p>memória utilizada</p>
                        <span></span>
                        <p>tipo de ação</p>
                        <span></span>
                        <p>data</p>
                    </header>

                    <div className={styles.logs}>
                        {usersInfo.map((element, index) => {
                            return (
                                <div className={styles.log} onClick={() => setTrigger(true)} key={index}>
                                    <p>{element.name}</p>
                                    <p>{element.memory}</p>
                                    <p>{element.action}</p>
                                    <p>{element.date}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            {trigger && (
                <PopUp trigger={trigger} setTrigger={setTrigger} title="Informações do usuário e histórico de acesso">
                    <InfoUser />
                </PopUp>
            )}
        </>
    )
}

export default UsersSystem;