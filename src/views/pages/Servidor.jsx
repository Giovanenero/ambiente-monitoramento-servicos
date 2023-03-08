import styles from "./../../assets/views/pages/Servidor.module.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, PointElement, LineElement, Filler } from "chart.js"
import { Doughnut, Line } from "react-chartjs-2";
import { useState, useEffect } from "react";

function Servidor({location}){

    const props = location.state;
    
    const [graphicCpu, setGraphicCpu] = useState(null)
    const [graphicMemory, setGraphicMemory] = useState(null)
    const [graphicDisk, setGraphicDisk] = useState(null);

    useEffect(() => {
        ChartJS.register(CategoryScale, LinearScale, PointElement, ArcElement, LineElement, Tooltip, Legend, Title, Filler);
        //Iniaizaliza os dados e as opções de cada gráfico
        if(props.graphic){
            let time = [];
            props.graphic.time.forEach(element => {
                time.push(element.hour);
            })
            initializeGraphicMemory(time);
            initializeGraphicDisk();
            initializeGraphicCpu();
        }
        // eslint-disable-next-line
    }, []); 

    function convertPorcentage(data){
        let sum = parseFloat(data[0]) + parseFloat(data[1]);
        return ((parseFloat(data[0]) / sum) * 100).toFixed(2);
    }

    
    function initializeGraphicMemory(time){
        //dados do gráfico de Line a respeito da memória
        setGraphicMemory({
            data: {
                labels: time.reverse(),
                datasets: [{
                    label: "Memória Swap",
                    data: props.graphic.swapMemory.reverse(),
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

    function initializeGraphicDisk(){
        //dados do gráfico Doughnut(use de disco)
        setGraphicDisk({data: {
            labels: ["Utilizado(Gb)", "Disponível(Gb)"],
            datasets: [{
                label: "Disponível(Gb)",
                data: [props.graphic.disk[0], props.graphic.diskTotal - props.graphic.disk[0]],
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

    function initializeGraphicCpu(){
        if(typeof props.graphic.cpu[0] === "number"){
            setGraphicCpu({data: {
                labels: ["Utilizado(%)", "Disponível(%)"],
                datasets: [{
                    label: "Disponível(%)",
                    data: [props.graphic.cpu[0], 100 - props.graphic.cpu[0]],
                    backgroundColor: ['rgba(0, 92, 200)', 'rgba(220, 220, 220)']
                }]
                }, options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            text: "Uso de Cpu:", display: true
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
    }

    return (    
        <div style={{background: "#eee"}}>
            <div className={styles.containerServidor}>
                <p>Informações do Servidor</p>
                <div className={styles.contentServidor}>
                    <div className={styles.useDisk}>
                        {graphicCpu && 
                            <div>
                                <Doughnut 
                                    data={graphicCpu.data} 
                                    options={graphicCpu.options} 
                                    plugins={graphicCpu.plugins}
                                />
                            </div>}
                        {graphicDisk && 
                            <div>
                                <Doughnut
                                    data={graphicDisk.data}
                                    options={graphicDisk.options}
                                    plugins={graphicDisk.plugins}
                                />
                            </div>}
                    </div>
                    <div className={styles.useGraphic}>
                        {graphicMemory && <Line data={graphicMemory.data} options={graphicMemory.options}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Servidor;