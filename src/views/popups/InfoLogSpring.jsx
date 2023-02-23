import styles from "./../../assets/views/popups/InfoLogSpring.module.css";

function InfoLogSpring({lines}){
    return (
        <div className={styles.containerInfoLogSpring}>
            {lines.map((line, index) => {
                return (
                    <div key={index}>
                        <p>{line}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default InfoLogSpring;