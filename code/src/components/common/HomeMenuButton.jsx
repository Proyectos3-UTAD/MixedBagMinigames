import Menu from "../menu/Menu";

function HomeMenuButton({screenChanger}) {

    const returnHome = () => {
        screenChanger(<Menu screenChanger={screenChanger}/>);
    }

    return (
        <button onClick={returnHome}>
            Home
        </button>
    );
}

export default HomeMenuButton;