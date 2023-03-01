import styles from "./../../assets/views/pages/Java.module.css";
import logoSpring from "./../../assets/img/spring-logo.png";

import { useState, useEffect } from "react";
import endpoint from "./../../endpoint/SpringBootLog";

import { PopUp } from "../../components/PopUp";
import InfoLogSpring from "../popups/InfoLogSpring";

import { Line } from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale, LinearScale, Filler, Title, Tooltip, Legend, PointElement, LineElement} from "chart.js"

function Java({location}){
    var props = location.state;

    const [logs, setLogs] = useState([]);
    const [trigger, setTrigger] = useState();
    const [lines, setLines] = useState([]);
    const [graphic, setGraphic] = useState();

    function treatTime(date){
        let year = date.slice(0, 4);
        let month = date.slice(5, 7);
        let day = date.slice(8, 10);
        let clock = date.slice(11);
        return {
            day: day + "/" + month + "/" + year,
            clock: clock,
        }
    }

    function treatData(data){
        if(data !== ""){
            let lines = [];
            let first = 0;
            let last = data.indexOf("at ");
            lines.push(data.slice(first, last));
            first = last + 3;
            last = data.indexOf("at ", first);
            while(last !== -1){
                lines.push("at "+ data.slice(first, last));
                first = last + 3;
                last = data.indexOf("at ", first);
            }
            let date = treatTime(lines[0].slice(0, 19));
            return {
                lines: lines,
                day: date.day,
                clock: date.clock,
            }
        } return null;
    }

    function initializeGraphic(){
        let auxData = [];
        let auxLabels = [];
        props.graphic.forEach(element => {
            let aux;
            auxData.push(element.MemoryUse);
            aux = element._id.date;
            auxLabels.push(aux.slice(11, 19));
        });
        setGraphic({
            data: {
                labels: auxLabels.reverse(),
                datasets: [{
                    label: "Memória",
                    data: auxData.reverse(),
                    backgroundColor: 'rgba(255, 0, 0, 0.2)',
                    borderColor: 'rgba(255, 0, 0, 0.6)',
                    fill: true,
                    pointRadius: 0,
                    lineTension: 0.2,
                },]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: "Uso de memória"
                    },
                    legend: {
                        position: "top",
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
                let aux = treatData(data[i]);
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
        initializeGraphic();
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