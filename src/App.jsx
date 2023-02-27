import Navigation from "./components/Navigation";

import './App.css';

function App() {
    localStorage.setItem("token", "token_1946549956512000006452633301238")

    return ( 
        <div className="App" >
            <Navigation />
        </div>
    );
}

export default App;