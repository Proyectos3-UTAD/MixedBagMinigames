/**
 * Styles
 */
import '../../styles/menu/Menu.css';

/**
 * Components
 */
import GameMiniature from "./GameMiniature";
import Snake from "../snake/Snake";
import SpaceInvaders from "../spaceInvaders/SpaceInvaders";
import Pong from "../pong/Pong";
import AtariBreakout from "../atariBreakOut/AtariBreakout";

function Menu({screenChanger}) {
    return (
        <div className={"Menu"}>
            <h1 className={"MenuTitle"}>MixedBag Minigames</h1>

            <div className={"GameDisplayTable"}>
                <GameMiniature

                    style={{backgroundImage: "url("}}
                    screenChanger={screenChanger}
                    gameName={"Pong"}

                    gameComponent={
                        <Pong screenChanger={screenChanger}/>
                    }/>

                <GameMiniature

                    screenChanger={screenChanger}
                    gameName={"MineSweeper"}

                    gameComponent={
                        <Snake screenChanger={screenChanger}/>
                    }/>


                <GameMiniature

                    screenChanger={screenChanger}
                    gameName={"Snake"}

                    gameComponent={
                        <Snake screenChanger={screenChanger}/>
                    }/>

                <GameMiniature

                    screenChanger={screenChanger}
                    gameName={"PacMan"}

                    gameComponent={
                        <Snake screenChanger={screenChanger}/>
                    }/>

                <GameMiniature

                    screenChanger={screenChanger}
                    gameName={"SpaceInvaders"}

                    gameComponent={
                        <SpaceInvaders screenChanger={screenChanger}/>
                    }/>
                <GameMiniature

                    screenChanger={screenChanger}
                    gameName={"Atari Breakout"}

                    gameComponent={
                        <AtariBreakout screenChanger={screenChanger}/>
                    }/>

            </div>
        </div>
    );
}

export default Menu;