import styles from "./../../assets/views/pages/UsersSystem.module.css";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import { PopUp } from "../../components/PopUp";
import InfoUser from "../popups/InfoUser";
import endpoint from "./../../endpoint/SystemUsers";
import DataParse from "../../helpers/DataParse";

function UsersSystem({token}){

    const [trigger, setTrigger] = useState();
    const [systemUsers, setSystemUsers] = useState([])
    const [user, setUser] = useState(null)
    const [ordination, setOrdination] = useState("storage");
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setTrigger(false)
        const wait = async () => {
            return new Promise((resolve) => {
                endpoint.systemusers(token)
                .then(data => {
                    let length = 0;
                    if(data.length > 0 && !ready){
                        let auxUsers = [];
                        data.forEach(user => {
                            endpoint.useraccess(token, user.userId)
                            .then(userData => {
                                if(userData.length > 0){
                                    let time = DataParse.parseDate(userData[userData.length - 1].date);
                                    if(time){
                                        auxUsers.push({
                                            ...user,
                                            lastTimeOnline: time.day + " às " + time.hour,
                                            lastAction: userData[userData.length - 1].jobType,
                                        })
                                    } else {
                                        auxUsers.push(user);
                                    }
                                } else {
                                    auxUsers.push(user);
                                }
                                length++;
                                if(length === data.length){
                                    setReady(true);
                                    let i = 0;
                                    while(i < auxUsers.length){
                                        let j = null;
                                        for(j = i + 1; j < auxUsers.length; j++){
                                            if(auxUsers[i].mongoDiskUsageMB < auxUsers[j].mongoDiskUsageMB){
                                                let aux = auxUsers[i];
                                                auxUsers[i] = auxUsers[j];
                                                auxUsers[j] = aux;
                                            }
                                        }
                                        i++;
                                    }
                                    setSystemUsers(auxUsers);
                                    resolve();
                                }
                            })
                            .catch(error => console.log(error))
                        })
                    }
                })
                .catch(error => console.log(error));
            })
        }
        wait();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {

        if(systemUsers.length > 0){
            if(ordination === "alphabetical"){
                let i = 0;
                let auxUsers = systemUsers;
                while(i < auxUsers.length){
                    let j = null;
                    for(j = i + 1; j < auxUsers.length; j++){
                        if(auxUsers[i].firstName[0] <= auxUsers[j].firstName[0]){
                            let aux = auxUsers[i];
                            auxUsers[i] = auxUsers[j];
                            auxUsers[j] = aux;
                        }
                    }
                    i++;
                }
                console.log(auxUsers)
                setSystemUsers(auxUsers);
            }
        }

    // eslint-disable-next-line
    }, [ordination])

    return (systemUsers !== undefined) ?
        (
            <>
            <div className={styles.containerUsersSystem}>
                <div className={styles.title}>
                    <p>Usuários do Sistema</p>
                    <p>Qntd. de Usuários: {systemUsers !== [] ? systemUsers.length : 0}</p>
                </div>
                <div className={styles.containerSearch}>
                    <div className={styles.box}>
                        <input type="text" placeholder="Pesquisar pelo nome do usuário" onChange={(e) => console.log(e.target.value)}></input>
                        <FiSearch />
                    </div>
                    <div className={styles.box}>
                        <select name="ordination" onChange={(e) => setOrdination(e.target.value)}>
                            <option value="storage">Armazenamento</option>
                            <option value="alphabetical">Alfabética</option>
                            <option value="time">Tempo</option>
                        </select>
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
                        {systemUsers.map((systemUser, index) => {
                            return (
                                <div className={styles.log} onClick={() => {setTrigger(true); setUser(systemUser);}} key={index}>
                                    <p>{systemUser.firstName + " " + systemUser.lastName}</p>
                                    <p>{systemUser.mongoDiskUsageMB !== 0 ? systemUser.mongoDiskUsageMB + "MB" : ""}</p>
                                    <p>{systemUser.lastAction !== "" ? systemUser.lastAction : ""}</p>
                                    <p>{systemUser.lastTimeOnline !== "" ? systemUser.lastTimeOnline : ""}</p>
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
    ) : "";
}

export default UsersSystem;