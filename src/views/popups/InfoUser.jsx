import styles from "./../../assets//views/popups/InfoUser.module.css";

import photo from "./../../assets/img/foto-perfil.jpg";

function InfoUser(){
    return (
        <div className={styles.containerInfoUser}>
            <div className={styles.containerPersonalInfo}>
                <div className={styles.nameUser}>
                    <img src={photo} alt="foto do perfil" />
                    <div>
                        <p>Giovane</p>
                        <p>Limas Salvi</p>
                    </div>
                </div>
                <div className={styles.email}>giovanesalvi@alunos.utfpr.edu.br</div>
                <div className={styles.locality}>
                    <span>Local:</span>
                    <div>
                        <p>Cidade: Curitiba/PR</p>
                        <p>País: Brasil</p>
                    </div>
                </div>
                <div className={styles.company}>
                    <span>Empresa:</span>
                    <div>
                        <p>nome: VASP</p>
                        <p>Mercado: Autônomo</p>
                        <p>Posiçao: Administrador</p>
                        <p>Qntd. de funcionários: 234</p>
                    </div>
                </div>
                <div className={styles.others}>
                    <span>Outros</span>
                </div>
            </div>
        </div>
    )
}

export default InfoUser;