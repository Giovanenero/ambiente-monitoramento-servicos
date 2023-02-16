import styles from "./../../assets/views/pages/Servidor.module.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, PointElement, LineElement, Filler } from "chart.js"
import { Doughnut, Line } from "react-chartjs-2";
import { useState, useEffect } from "react";

function Servidor(){
    const [graphicLeftData, setGraphicLeftData] = useState(null)
    const [graphicRightData, setGraphicRightData] = useState(null)
    const [graphicBottomData, setGraphicBottomData] = useState(null)

    function convertPorcentage(data){
        let sum = parseFloat(data[0]) + parseFloat(data[1]);
        return ((parseFloat(data[0]) / sum) * 100).toFixed(2);
    }

    useEffect(() => {
        ChartJS.register(CategoryScale, LinearScale, PointElement, ArcElement, LineElement, Tooltip, Legend, Title, Filler);
        //Iniaizaliza os dados e as opções de cada gráfico
        //dados do gráfico à direita
        setGraphicLeftData({data: {
            labels: ["Utilizado(Gb)", "Disponível(Gb)"],
            datasets: [{
                label: "Disponível(Gb)",
                data: ["5684", "2050"],
                backgroundColor: ['rgba(0, 92, 200)', 'rgba(220, 220, 220)']
            }]
            }, options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        text: "Uso de disco: partição/app", display: true
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
        //dados do gráfico à esquerda
        setGraphicRightData({data: {
            labels: ["Utilizado(Gb)", "Disponível(Gb)"],
            datasets: [{
                label: "Disponível(Gb)",
                data: ["3000", "5000"],
                backgroundColor: ['rgba(0, 92, 200)', 'rgba(220, 220, 220)']
            }]
            }, options: {
                plugins: {
                    title: {
                        text: "Uso de disco: partição/dados", display: true
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
                        ctx.fillText("Utilizado", chart.getDatasetMeta(0).data[0].x,  chart.getDatasetMeta(0).data[0].y +20);
                    }
                }
            ]
        });
        //dados do gráfico de baixo
        setGraphicBottomData({
            data: {
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
    }, []); 

    return (    
        <div style={{background: "#eee"}}>
            <div className={styles.containerServidor}>
                <p>Informações do Sercidor</p>
                <div className={styles.contentServidor}>
                    <div className={styles.useDisk}>
                        <div>
                            {graphicLeftData && 
                                <Doughnut 
                                    data={graphicLeftData.data} 
                                    options={graphicLeftData.options} 
                                    plugins={graphicLeftData.plugins}
                            />}
                        </div>
                        <div>
                            {graphicRightData && 
                                <Doughnut 
                                    data={graphicRightData.data} 
                                    options={graphicRightData.options}
                                    plugins={graphicRightData.plugins}
                            />}
                        </div>
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