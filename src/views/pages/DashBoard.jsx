import styles from "./../../assets/views/pages/DashBoard.module.css";

import Service from "./../../components/Service";
import logoMongo from "./../../assets/img/mongoDB-logo.png";
import logoJava from "./../../assets/img/java-logo.png";

import endpoint from "../../endpoint/SystemUsers";

import { useState, useEffect } from "react";

function DashBoard({token}){

    const [usersOnline, setUsersOnline] = useState([]);

    useEffect(() => {
        endpoint.systemlogs(token)
        .then(data => {
            setUsersOnline(data);
        })
        .catch(error => console.log(error));
        //eslint-disable-next-line
    }, []);

    return (
        <div className={styles.containerDashBoard}>
            <div>
                <div className={styles.title}><p>Services</p></div>
                <div className={styles.block}>
                    <div className={styles.containerServices}>
                        <Service 
                            nameService="MongoDB"
                            logo={logoMongo}
                            css={styles.mongoDB}
                            path="/mongodb"
                            token={token}
                        />
                        <Service 
                            nameService="Java"
                            logo={logoJava}
                            css={styles.java}
                            path="/java"
                            token={token}
                        />
                        <Service 
                            nameService="Servidor"
                            css={styles.servidor}
                            path="/servidor"
                            token={token}
                        />
                    </div>
                    <div className={styles.containerOnlineUsers}>
                        <div className={styles.titleOnlineUsers}><p>Usuários online</p></div>
                        {usersOnline.length !== 0 ? usersOnline.map((user, index) => {
                            return (user !== null) ? (
                                <div className={styles.userOnline} key={index}>
                                    <p>{user.firstName} {user.lastName}</p>
                                    <div></div>
                                </div>
                            ) : ("")
                        }) : ""}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;