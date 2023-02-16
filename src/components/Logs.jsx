import styles from "./../assets/components/Logs.module.css";

import { FaUserPlus } from "react-icons/fa";

function Logs(){

    var users = [{
        user: "fulano",
        access: "adimin"
    },
    {
        user: "ciclano",
        access: "adimin"
    },
    {
        user: "beltrano",
        access: "adimin"
    },
    {
        user: "giovane",
        access: "adimin"
    },
    {
        user: "fulano",
        access: "adimin"
    },
    {
        user: "fulano",
        access: "adimin"
    },
    {
        user: "fulano",
        access: "adimin"
    },
    {
        user: "fulano",
        access: "adimin"
    },
    ]

    return (
        <div className={styles.containerLogs}>
            <div className={styles.space}>
                <div className={styles.title}>
                    <p>USUÁRIOS</p>
                    <button>LOGS DO SISTEMA</button>
                </div>
                <div className={styles.containerInfo}>
                    <div className={styles.containerSearchAdd}>
                        <input type="text" placeholder="Pesquisar..."/>
                        <button onClick={() => {/*Finalizar*/}}><FaUserPlus /></button>
                    </div>
                    <div className={styles.titleLogs}>
                        <div>
                            <p>USUÁRIOS</p>
                        </div>
                        <span></span>
                        <div>
                            <p>ACESSO</p>
                        </div>
                    </div>
                    <div className={styles.users}>
                        {users.map((data, index) => (
                            <div className={styles.user} key={index}>
                                <p>{data.user}</p>
                                <p>{data.access}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Logs;