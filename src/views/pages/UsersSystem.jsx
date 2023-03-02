import styles from "./../../assets/views/pages/UsersSystem.module.css";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import { PopUp } from "../../components/PopUp";
import InfoUser from "../popups/InfoUser";
import endpoint from "./../../endpoint/SystemUsers";

function UsersSystem({token}){

    const [trigger, setTrigger] = useState();
    const [systemUsers, setSystemUsers] = useState([])
    const [user, setUser] = useState(null)

    useEffect(() => {
        setTrigger(false)
        endpoint.systemusers(token)
        .then(data => {setSystemUsers(data)})
        .catch(error => console.log(error));
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className={styles.containerUsersSystem}>
                <div className={styles.title}>
                    <p>Usuários do Sistema</p>
                    <p>Qntd. de Usuários: {systemUsers.length}</p>
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
                        <p>armazenamento utilizada</p>
                        <span></span>
                        <p>tipo de ação</p>
                        <span></span>
                        <p>data</p>
                    </header>

                    <div className={styles.logs}>
                        {systemUsers && systemUsers.map((systemUser, index) => {
                            return (
                                <div className={styles.log} onClick={() => {setTrigger(true); setUser(systemUser);}} key={index}>
                                    <p>{systemUser.firstName + " " + systemUser.lastName}</p>
                                    <p>{systemUser.mongoDiskUsageMB !== 0 ? systemUser.mongoDiskUsageMB + "MB" : "-"}</p>
                                    <p>-</p>
                                    <p>-</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            {trigger && (
                <PopUp trigger={trigger} setTrigger={setTrigger} title="Informações do usuário e histórico de acesso">
                    <InfoUser user={user} token={token}/>
                </PopUp>
            )}
        </>
    )
}

export default UsersSystem;