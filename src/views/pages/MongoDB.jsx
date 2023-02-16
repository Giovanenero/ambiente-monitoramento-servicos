import styles from "./../../assets/views/pages/MongoDB.module.css";

import { Line } from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale, LinearScale, Filler, Title, Tooltip, Legend, PointElement, LineElement} from "chart.js"

import { useState, useEffect } from "react";

function MongoDB({location}){
    var props = location.state;
    const [userData, setUserData] = useState(null);
    const [userOptions, setUserOptions] = useState(null);

    var log = [{
        data: "09/02/2022",
        hora: "15:54:50",
        content: `{"t":{"$date":"2022-02-09T15:54:50.482-03:00"},"s":"I", "c":"NETWORK", "id":22943, "ctx":"listener","msg":"Connection accepted","attr":{"remote":"172.17.13.150:60136","connectionId":153959,"connectionCount":80}}`
        }, {
            data: "09/02/2022",
            hora: "15:54:50",
            content: `{"t":{"$date":"2022-02-09T15:54:50.482-03:00"},"s":"I", "c":"NETWORK", "id":22943, "ctx":"listener","msg":"Connection accepted","attr":{"remote":"172.17.13.150:60136","connectionId":153959,"connectionCount":80}}`
        }, {
            data: "09/02/2022",
            hora: "15:54:50",
            content: `{"t":{"$date":"2022-02-09T15:54:50.482-03:00"},"s":"I", "c":"NETWORK", "id":22943, "ctx":"listener","msg":"Connection accepted","attr":{"remote":"172.17.13.150:60136","connectionId":153959,"connectionCount":80}}`
        }, {
            data: "09/02/2022",
            hora: "15:54:50",
            content: `{"t":{"$date":"2022-02-09T15:54:50.482-03:00"},"s":"I", "c":"NETWORK", "id":22943, "ctx":"listener","msg":"Connection accepted","attr":{"remote":"172.17.13.150:60136","connectionId":153959,"connectionCount":80}}`
        }, {
            data: "09/02/2022",
            hora: "15:54:50",
            content: `{"t":{"$date":"2022-02-09T15:54:50.482-03:00"},"s":"I", "c":"NETWORK", "id":22943, "ctx":"listener","msg":"Connection accepted","attr":{"remote":"172.17.13.150:60136","connectionId":153959,"connectionCount":80}}`
        }, {
            data: "09/02/2022",
            hora: "15:54:50",
            content: `{"t":{"$date":"2022-02-09T15:54:50.482-03:00"},"s":"I", "c":"NETWORK", "id":22943, "ctx":"listener","msg":"Connection accepted","attr":{"remote":"172.17.13.150:60136","connectionId":153959,"connectionCount":80}}`
        }, {
            data: "09/02/2022",
            hora: "15:54:50",
            content: `{"t":{"$date":"2022-02-09T15:54:50.482-03:00"},"s":"I", "c":"NETWORK", "id":22943, "ctx":"listener","msg":"Connection accepted","attr":{"remote":"172.17.13.150:60136","connectionId":153959,"connectionCount":80}}`
        }, {
            data: "09/02/2022",
            hora: "15:54:50",
            content: `{"t":{"$date":"2022-02-09T15:54:50.482-03:00"},"s":"I", "c":"NETWORK", "id":22943, "ctx":"listener","msg":"Connection accepted","attr":{"remote":"172.17.13.150:60136","connectionId":153959,"connectionCount":80}}`
        }, {
            data: "09/02/2022",
            hora: "15:54:50",
            content: `{"t":{"$date":"2022-02-09T15:54:50.482-03:00"},"s":"I", "c":"NETWORK", "id":22943, "ctx":"listener","msg":"Connection accepted","attr":{"remote":"172.17.13.150:60136","connectionId":153959,"connectionCount":80}}`
        }, {
            data: "09/02/2022",
            hora: "15:54:50",
            content: `{"t":{"$date":"2022-02-09T15:54:50.482-03:00"},"s":"I", "c":"NETWORK", "id":22943, "ctx":"listener","msg":"Connection accepted","attr":{"remote":"172.17.13.150:60136","connectionId":153959,"connectionCount":80}}`
        },
    ]


    useEffect(() => {
        ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Title, Tooltip, Legend);
        setUserData({
            labels: ["2016", "2017", "2018", "2019", "2020"],
            datasets: [{
                label: "CPU %",
                data: ["2000", "5000", "1500", "3200", "1200"],
                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                borderColor: 'rgba(255, 0, 0, 0.6)',
                fill: true,
                pointRadius: 0,
                lineTension: 0.2
            }, {
                label: 'RAM %',
                data: ["1000", "2000", "1500", "2000", "3500"],
                backgroundColor: 'rgba(0, 0, 255, 0.2)',
                borderColor: 'rgba(0, 0, 255, 0.6)',
                fill: true,
                pointRadius: 0,
                lineTension: 0.2
            }]
        })
        setUserOptions({
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: "Uso CPU e RAM"
                },
                legend: {
                    position: "top"
                },
            },
        })
    }, [])

    return (
        <div className={styles.mongoDB}>
            <div className={styles.containerMongoDB}>
                <div className={styles.containerHeader}>
                    <div className={styles.useMemory}>
                        {userData && <Line data={userData} options={userOptions}/>}
                    </div>
                    <div className={styles.img}>
                        <img src={props.logo} alt="logotipo do MongoDB"/>
                    </div>
                </div>
                <div className={styles.containerLogs}>
                    <div className={styles.containerHeaderLogs}>
                        <p>Últimos 20 logs</p>
                        <div>
                            <div className={styles.data}>
                                Data/Hora
                            </div>
                            <div className={styles.log}>
                                Log
                            </div>
                        </div>
                    </div>
                    {log.map((element, index) => (
                        <div className={styles.containerLog} key={index}>
                            <div>
                                <p>{element.data}</p>
                                <p>{element.hora}</p>
                            </div>
                            <article>
                                <p>{element.content}</p>
                            </article>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MongoDB;