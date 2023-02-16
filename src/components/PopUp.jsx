import styles from "./../assets/components/PopUp.module.css";

import { HiXMark } from "react-icons/hi2";

export const PopUp = ({children, trigger, setTrigger, title}) => {
    return trigger ? (
        <div className={styles.containerPopUp}>
            <div className={styles.containerContent}>
                <header className={styles.header}>
                    <p>{title}</p>
                    <button onClick={() => setTrigger(!trigger)}><HiXMark/></button>
                </header>
                {children}
            </div>
        </div>
    ) : "";
}