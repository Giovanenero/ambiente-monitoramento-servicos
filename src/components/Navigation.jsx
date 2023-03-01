import styles from "./../assets/components/Navigation.module.css";
import wiseLogo from "./../assets/img/wise-logo.png";

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import DashBoard from "../views/pages/DashBoard";
import UsersSystem from "./../views/pages/UsersSystem";
import Spring from "./../views/pages/Spring";
import Spark from "./../views/pages/Spark";
import MongoDB from "./../views/pages/MongoDB";
import Servidor from "./../views/pages/Servidor";
import Java from "./../views/pages/Java";

import { useState, useEffect } from "react";

function Navigation({token}){

    const [pageSelected, setPageSelected] = useState("");

    useEffect(() => {
        setPageSelected("DashBoard");
    }, []);

    return (
        <Router>
            <div className={styles.containerNavigation}>
                <div className={styles.containerHeader}>
                    <p>Ambiente de Gestão</p>
                    <img src={wiseLogo} alt="logo da Wise"/>
                </div>
                <div className={styles.containerPages}>
                    <Link to="/" style={{textDecoration: "none", color: "#282828"}}>
                        <div onClick={() => setPageSelected("DashBoard")} className={pageSelected === "DashBoard" ? styles.selected : ""}>DASHBOARD</div>
                    </Link>
                    <Link to="/systemlogs" style={{textDecoration: "none", color: "#282828"}}>
                        <div onClick={() => setPageSelected("Usuários do Sistema")} className={pageSelected === "Usuários do Sistema" ? styles.selected : ""}>USUÁRIOS DO SISTEMA</div>
                    </Link>
                </div>
                <div className={styles.logout}>
                    wise
                </div>
            </div>
            <Switch>
                <Route path="/" exact component={() => <DashBoard token={token}/>}/>
                <Route path="/systemlogs" component={() => <UsersSystem token={token}/>}/>
                <Route path="/java/spring" component={Spring}/>
                <Route path="/mongodb" component={MongoDB}/>
                <Route path="/servidor" component={Servidor}/>
                <Route path="/java/spark" component={Spark}/>
                <Route path="/java" component={Java}/>
            </Switch>
        </Router>
    );
}

export default Navigation;