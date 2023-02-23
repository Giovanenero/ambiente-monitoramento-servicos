import Navigation from "./components/Navigation";

import './App.css';

function App() {
    localStorage.setItem("token", "token_170240888089600000797")

    // const [teste, setTeste] = useState([]);

    // function tratarDados(data){
    //     let springBoot = [];
    //     let first = 0;
    //     let last = data.indexOf("at ");
    //     while(last !== -1){
    //         springBoot.push("at " + data.slice(first, last));
    //         first = last + 3;
    //         last = data.indexOf("at ", first);
    //     }
    //     setTeste(springBoot)
    // }


    return ( 
        <div className="App" >
            <Navigation />
        </div>
    );
}

export default App;