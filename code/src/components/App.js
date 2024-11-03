import '../styles/App.css';
import {useState, useEffect} from "react";
import Menu from "./menu/Menu";

function App() {

    const [screen, setScreen] = useState(<p>Loading</p>);

    const screenChanger = (newScreen) => {
        setScreen(newScreen);
    }

    useEffect(() => {
        setScreen(<Menu screenChanger={screenChanger}/>);
    }, []);

    return (
        <div id="App">
            {screen}
        </div>
    );
}

export default App;
