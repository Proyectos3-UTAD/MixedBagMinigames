import SnakeHomeScreen from "./SnakeHomeScreen";

function SnakeHomeButton({screenChanger}) {

    const returnHome = () => {
        screenChanger(<SnakeHomeScreen screenChanger={screenChanger}/>);
    }

    return (
        <button onClick={returnHome}>
            Snake
        </button>
    );
}

export default SnakeHomeButton;