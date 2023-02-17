import Navigation from "./components/Navigation";

import './App.css';

function App() {
    localStorage.setItem("token", "token_139770092524800000997")
    return ( 
        <div className="App" >
            <Navigation />
        </div>
    );
}

export default App;