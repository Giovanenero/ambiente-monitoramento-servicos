import styles from "./../assets/components/Service.module.css";
import ServidorIcon from "../assets/icons/jsxIcons/ServidorIcon";
import { Link } from "react-router-dom";

import endpoint from "../endpoint/UserStorage";

import { useEffect, useReducer } from "react";

function Service({
    nameService,
    logo,
    css,
    path,
    token,
}){
    const [state, dispatch] = useReducer(reducer, {image: "", content: "", graphic: null})

    useEffect(() => {
        const wait = async () => {
            let name = nameService.toLowerCase();
            if(name === "mongodb"){
                await mongodb(name);
            } else if(name === "java"){
                await java(name);
            } else if(name === "servidor"){
                await server(name);
            }
        }
        wait();
        // eslint-disable-next-line
    }, []);

    function reducer(state, action){
        let residentMemory = "";
        if(action.type === "mongodb" || action.type === "java"){
            let virtualMemory = "";
            if(typeof action.data[0].ResidentMemUsed === "number"){
                residentMemory = (action.data[0].ResidentMemUsed / 1000).toFixed(2);
            }
            if(typeof action.data[0].VirtualMemUsed === "number"){
                virtualMemory = (action.data[0].VirtualMemUsed / 1000).toFixed(2);
            }
            return {
                ...state,
                image: <img src={logo} alt={logo} className={css}/>,
                content: (
                    <>
                        <h2>STATUS</h2>
                        {action.data.length > 0 ? <p>Conectado</p> : <p>Desconectado</p>}
                        <h2>USO DA MEMÓRIA</h2>
                        {residentMemory !== "" ? <p>{"Residente: " + residentMemory + "Gb"}</p> : <p>Erro</p>}
                        {virtualMemory !== "" ? <p>{"Virtual: " + virtualMemory + "Gb"}</p> : <p>Erro</p>}
                    </>
                ),
                graphic: action.data,
            }
        } else {
            let server = {
                flagDisk: false,
                diskPorcentage: "",
                flagResident: false,
                residentPorcentage: "",
                flagSwap: false,
                swapMemory: "",
                swapPorcentage: "",
            }
            if(typeof action.ArrayCpuDisk[0].DiskUse === "number" && typeof action.ArrayCpuDisk[0].DiskTotal === "number"){
                server.diskPorcentage = ((action.ArrayCpuDisk[0].DiskUse / action.ArrayCpuDisk[0].DiskTotal) * 100).toFixed(2)
                server.flagDisk = !server.flagDisk;
            }
            if(typeof action.ArrayMemory[0].ResidentMemUsed === "number" && typeof action.ArrayMemory[0].ResidentMemTotal === "number"){
                residentMemory = (action.ArrayMemory[0].ResidentMemUsed / 1000).toFixed(2);
                server.residentPorcentage = ((action.ArrayMemory[0].ResidentMemUsed/action.ArrayMemory[0].ResidentMemTotal)*100).toFixed(2);
                server.flagResident = !server.flagResident;
            }
            if(typeof action.ArrayMemory[0].SwapMemUsed === "number" && typeof action.ArrayMemory[0].SwapMemTotal === "number"){
                server.swapMemory = (action.ArrayMemory[0].SwapMemUsed/1000).toFixed(2);
                server.swapPorcentage = ((action.ArrayMemory[0].SwapMemUsed/action.ArrayMemory[0].SwapMemTotal) * 100).toFixed(2);
                server.flagSwap = !server.flagSwap;
            }
            return {
                ...state,
                image: <div className={css}><ServidorIcon style={{size: 70}}/></div>,
                content: (
                    <>
                        <h2>USO DE DISCO/CPU</h2>
                        {server.flagDisk === true ? <p>{action.ArrayCpuDisk[0].DiskUse + "Gb (" + server.diskPorcentage + "%)"}</p> : <p>Erro</p>}
                        <h2>USO DA MEMÓRIA</h2>
                        {server.flagResident === true ? <p>{"Residente: " + residentMemory + "Gb (" + server.residentPorcentage + "%)"}</p> : <p>Erro</p>}
                        {server.flagSwap === true ? <p>{"Swap: " + server.swapMemory + "Gb (" + server.swapPorcentage + "%)"}</p> : <p>Erro</p>}
                    </>
                ),
            }
        }
    }

    const mongodb = async (name) => {
        return new Promise((resolve) => {
            endpoint.mongomemoryusegraph(token)
            .then(data => {
                dispatch({type: name, data: data});
                resolve();
            })
            .catch(error => console.log(error));
        })
    }

    const java = async (name) => {
        return new Promise((resolve) => {
            endpoint.javamemoryusegraph(token)
            .then(data => {
                if(data.length > 0){
                    dispatch({type: name, data: data});
                }
                resolve();
            })
            .catch(error => console.log(error));
        })
    }

    const server = async (name) => {
        return new Promise((resolve) => {
            endpoint.servermemoryusegraph(token)
            .then(data1 => {
                endpoint.cpudiskusegraph(token)
                .then(data2 => {
                    console.log(data1);
                    console.log(data2);
                    if(data1.length > 0 && data2.length > 0){
                        dispatch({type: name, ArrayMemory: data1, ArrayCpuDisk: data2});
                    }
                    resolve();
                })
                .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
        })
    }

    return (state !== undefined) ? (
        <div className={styles.containerService}>
            {state.image}
            <div className={styles.title}>
              <p>{nameService}</p>  
            </div>
            <div className={styles.containerInfo}>
                {state.content}
            </div>
            <Link to={{pathname: path, state: {logo: logo, graphic: state.graphic, token: token}}}>
                <button>Ver mais</button>
            </Link>
        </div>
    ) : "";
}

export default Service;