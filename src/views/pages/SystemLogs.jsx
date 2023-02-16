import styles from "./../../assets/views/pages/SystemLogs.module.css";

import { FiSearch } from "react-icons/fi";

import { useState } from "react";

import { PopUp } from "./../../components/PopUp";
import InfoUser from "../popups/InfoUser";

function SystemLogs(){

    const [trigger, setTrigger] = useState(false);
    return (
        <>
            <div className={styles.containerSystemLogs}>
                <p>Logs do Sistema</p>
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
                        <p>tipo de ação</p>
                        <span></span>
                        <p>data</p>
                    </header>

                    <div className={styles.logs}>
                        <div className={styles.log} onClick={() => setTrigger(true)}>
                            <p>wise</p>
                            <p>login</p>
                            <div>
                                <p>10/02/2023</p>
                                <p>14:08:18</p>
                            </div>
                        </div>

                        <div className={styles.log} onClick={() => setTrigger(true)}>
                            <p>wise</p>
                            <p>login</p>
                            <div>
                                <p>10/02/2023</p>
                                <p>14:08:18</p>
                            </div>
                        </div>

                        <div className={styles.log} onClick={() => setTrigger(true)}>
                            <p>wise</p>
                            <p>login</p>
                            <div>
                                <p>10/02/2023</p>
                                <p>14:08:18</p>
                            </div>
                        </div>

                        <div className={styles.log} onClick={() => setTrigger(true)}>
                            <p>wise</p>
                            <p>login</p>
                            <div>
                                <p>10/02/2023</p>
                                <p>14:08:18</p>
                            </div>
                        </div>

                        <div className={styles.log} onClick={() => setTrigger(true)}>
                            <p>wise</p>
                            <p>login</p>
                            <div>
                                <p>10/02/2023</p>
                                <p>14:08:18</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {trigger && (
                <PopUp trigger={trigger} setTrigger={setTrigger} title="Usuário">
                    <InfoUser />
                </PopUp>
            )}
        </>
    )
}

export default SystemLogs;