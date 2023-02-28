import styles from "./../../assets/views/pages/Servidor.module.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, PointElement, LineElement, Filler } from "chart.js"
import { Doughnut, Line } from "react-chartjs-2";
import { useState, useEffect } from "react";

function Servidor({location}){

    const props = location.state;
    
    const [graphicLeftData, setGraphicLeftData] = useState(null)
    const [graphicBottomData, setGraphicBottomData] = useState(null)

    function convertPorcentage(data){
        let sum = parseFloat(data[0]) + parseFloat(data[1]);
        return ((parseFloat(data[0]) / sum) * 100).toFixed(2);
    }

    function initializeGrapfichBottom(){
        //dados do gráfico de Line(use de CPU e RAM)
        let graphic = props.graphic;
        let time = [];
        graphic.time.forEach(element => {
            time.push(element.slice(11, 19));
        })
        setGraphicBottomData({
            data: {
                labels: time.reverse(),
                datasets: [{
                    label: "CPU %",
                    data: graphic.cpu.reverse(),
                    backgroundColor: 'rgba(255, 0, 0, 0.2)',
                    borderColor: 'rgba(255, 0, 0, 0.6)',
                    fill: true,
                    pointRadius: 0,
                    lineTension: 0.2
                }, {
                    label: 'RAM %',
                    data: graphic.memory.reverse(),
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
                        text: "Uso CPU e RAM"
                    },
                    legend: {
                        position: "top"
                    },
                },
            }
        })
    }

    function initializeGraphicLeft(){
        //dados do gráfico Doughnut(use de disco)
        let diskUse = props.graphic.disk;
        let diskTotal = props.graphic.diskTotal;
        setGraphicLeftData({data: {
            labels: ["Utilizado(Gb)", "Disponível(Gb)"],
            datasets: [{
                label: "Disponível(Gb)",
                data: [diskUse, diskTotal],
                backgroundColor: ['rgba(0, 92, 200)', 'rgba(220, 220, 220)']
            }]
            }, options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        text: "Uso de disco:", display: true
                    },
                },
            }, plugins: [
                {
                    id: "textCenter",
                    beforeDatasetsDraw(chart){
                        const {ctx, data} = chart;
                        ctx.save();
                        ctx.font = "700 25px sans-serif";
                        ctx.fillStyle = "rgba(0, 92, 200)";
                        ctx.textAlign = "center";
                        ctx.textBaseline = "middle";
                        ctx.fillText(`${convertPorcentage(data.datasets[0].data)}%`, chart.getDatasetMeta(0).data[0].x,  chart.getDatasetMeta(0).data[0].y -10);
                    }
                }, {
                    id: "textCenter",
                    beforeDatasetsDraw(chart){
                        const {ctx} = chart;
                        ctx.save();
                        ctx.font = "200 14px sans-serif";
                        ctx.fillStyle = "rgba(0, 92, 200)";
                        ctx.textAlign = "center";
                        ctx.textBaseline = "middle";
                        ctx.fillText("Utilizado", chart.getDatasetMeta(0).data[0].x,  chart.getDatasetMeta(0).data[0].y + 20);
                    }
                }
            ]
        });
    }

    useEffect(() => {
        ChartJS.register(CategoryScale, LinearScale, PointElement, ArcElement, LineElement, Tooltip, Legend, Title, Filler);
        //Iniaizaliza os dados e as opções de cada gráfico
        initializeGrapfichBottom();
        initializeGraphicLeft();
        // eslint-disable-next-line
    }, []); 

    return (    
        <div style={{background: "#eee"}}>
            <div className={styles.containerServidor}>
                <p>Informações do Servidor</p>
                <div className={styles.contentServidor}>
                    <div className={styles.useDisk}>
                        {graphicLeftData && 
                            <Doughnut 
                                data={graphicLeftData.data} 
                                options={graphicLeftData.options} 
                                plugins={graphicLeftData.plugins}
                            />}
                    </div>
                    <div className={styles.useGraphic}>
                        {graphicBottomData && <Line data={graphicBottomData.data} options={graphicBottomData.options}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Servidor;