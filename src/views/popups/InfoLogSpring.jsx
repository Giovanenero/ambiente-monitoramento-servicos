import styles from "./../../assets/views/popups/InfoLogSpring.module.css";

function InfoLogSpring({lines}){
    return (
        <div className={styles.containerInfoLogSpring}>
            <div style={{margin: 20}}>
                {lines.map((line, index) => {
                    return (
                        <div key={index} className={styles.line}>
                            <p>{line}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default InfoLogSpring;