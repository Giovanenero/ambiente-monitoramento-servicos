import styles from "./../../assets/views/pages/DashBoard.module.css";

import Service from "./../../components/Service";
import logoMongo from "./../../assets/img/mongoDB-logo.png";
import logoSpring from "./../../assets/img/spring-logo.png";
import logoSpark from "./../../assets/img/spark-logo.png";

function DashBoard(){
    return (
        <div className={styles.containerDashBoard}>
            <div>
                <div className={styles.title}>
                    <p>Services</p>
                </div>
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
            </div>
        </div>
    );
}

export default DashBoard;