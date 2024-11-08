import Menu from "../menu/Menu";
/**
 * Changes the screen displayed to the menu of the application.
 * @param {*} param0 The screen changer to set the screen in the app.
 * @returns 
 */
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