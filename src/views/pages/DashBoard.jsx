import styles from "./../../assets/views/pages/DashBoard.module.css";

import Service from "./../../components/Service";
import logoMongo from "./../../assets/img/mongoDB-logo.png";
import logoSpring from "./../../assets/img/spring-logo.png";
import logoSpark from "./../../assets/img/spark-logo.png";

import endpoint from "../../endpoint/SystemLogs";

import { useState, useEffect } from "react";

function DashBoard(){

    const [usersOnline, setUsersOnline] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        endpoint.systemlogs(token)
        .then(data => {
            setUsersOnline(data);
        })
        .catch(error => console.log(error));
    }, []);

    return (
        <div className={styles.containerDashBoard}>
            <div>
                <div className={styles.title}>
                    <p>Services</p>
                    <p>Usuários online</p>
                </div>
                <div className={styles.block}>
                    <div className={styles.containerServices}>
                        <Service 
                            nameService="Spring"
                            logo={logoSpring}
                            css={styles.spring}
                        />
                        <Service 
                            nameService="MongoDB"
                            logo={logoMongo}
                            css={styles.mongoDB}
                        />
                        <Service 
                            nameService="Servidor"
                            css={styles.servidor}
                        />
                        <Service 
                            nameService="Spark"
                            logo={logoSpark}
                            css={styles.spark}
                        />
                    </div>
                    <div className={styles.containerOnlineUsers}>
                        {usersOnline.map((user, index) => {
                            return (
                                <div className={styles.userOnline} key={index}>
                                    <p>{user.firstName} {user.lastName}</p>
                                    <div></div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;