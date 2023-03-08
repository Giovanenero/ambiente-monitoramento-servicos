import styles from "./../../assets/views/pages/Java.module.css";
import logoSpring from "./../../assets/img/spring-logo.png";

import { useState, useEffect } from "react";
import endpoint from "./../../endpoint/SpringBootLog";

import { PopUp } from "../../components/PopUp";
import InfoLogSpring from "../popups/InfoLogSpring";
import DataParse from "../../helpers/DataParse";

import { Line } from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale, LinearScale, Filler, Title, Tooltip, Legend, PointElement, LineElement} from "chart.js"

function Java({location}){
    var props = location.state;

    const [logs, setLogs] = useState([]);
    const [trigger, setTrigger] = useState();
    const [lines, setLines] = useState([]);
    const [graphic, setGraphic] = useState(null);

    function initializeGraphic(time){
        setGraphic({
            data: {
                labels: time.reverse(),
                datasets: [{
                    label: "Memória Virtual",
                    data: props.graphic.virtualMemory.reverse(),
                    backgroundColor: 'rgba(255, 0, 0, 0.2)',
                    borderColor: 'rgba(255, 0, 0, 0.6)',
                    fill: true,
                    pointRadius: 0,
                    lineTension: 0.2
                }, {
                    label: 'Memória Residente',
                    data: props.graphic.residentMemory.reverse(),
                    backgroundColor: 'rgba(0, 0, 255, 0.2)',
                    borderColor: 'rgba(0, 0, 255, 0.6)',
                    fill: true,
                    pointRadius: 0,
                    lineTension: 0.2
                }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: "Uso de Memória em Mb"
                    },
                    legend: {
                        position: "top"
                    },
                },
            }
        })
    }

    function initializeLogs(){
        endpoint.springbootlog(props.token)
        .then(data => {
            let i = 0;
            let auxLogs = [];
            while(i < data.length){
                let aux = DataParse.treatData(data[i])
                if(aux !== null){
                    auxLogs.unshift(aux);
                }
                i++
            }
            setLogs(auxLogs);
        })
        .catch(error => console.log(error));
    }

    useEffect(() => {
        setTrigger(false);
        ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Title, Tooltip, Legend);
        if(props.graphic){
            let time = [];
            props.graphic.time.forEach(element => {
                time.push(element.hour);
            })
            initializeGraphic(time);
        }
        initializeLogs();
        // eslint-disable-next-line 
    }, []);

    return (
        <>
            <div className={styles.containerJava}>
                <div className={styles.containerGraphic}>
                    <div className={styles.graphic}>
                        {graphic && <Line data={graphic.data} options={graphic.options}/>}
                    </div>
                    <div className={styles.image}>
                        <img src={props.logo} alt="logo do java" style={{width: 170, height: 110}}/>
                    </div>

                </div>
                <div className={styles.containerServices}>
                    <div className={styles.containerFramework}>
                        <div className={styles.titleFramework}>
                            <img src={logoSpring} alt="logo do Spring boot" style={{width: 50, height: 50}}/>
                            <p>Spring-boot últimos logs</p>
                        </div>
                        <div className={styles.header}>
                            <div className={styles.titledate}><p>Data/Hora</p></div>
                            <span></span>
                            <div className={styles.titleLog}><p>Log</p></div>
                        </div>
                        <div className={styles.containerLogs}>
                            {logs.map((data, index) => {
                                return (
                                    <div className={styles.containerLog} key={index} onClick={() => {setTrigger(true); setLines(data.lines)}}>
                                        <div className={styles.date}>
                                            <div>{data.day}</div>
                                            <div>{data.clock}</div>
                                        </div>
                                        <div className={styles.log}>
                                            {(data.lines[0]).slice(21)}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className={styles.containerFramework}>
                        Spark
                    </div>
                </div>
            </div>
            {trigger && (
                <PopUp trigger={trigger} setTrigger={setTrigger} title="Log spring boot">
                    <InfoLogSpring lines={lines}/>
                </PopUp>    
            )}
        </>
    )
}

export default Java;