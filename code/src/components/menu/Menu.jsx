/**
 * Styles
 */
import '../../styles/menu/Menu.css';

/**
 * Components
 */
import GameMiniature from "./GameMiniature";
import SnakeHomeScreen from "../snake/SnakeHomeScreen";
import SpaceInvaders from "../spaceInvaders/SpaceInvaders";
import Pong from "../pong/Pong";
import AtariBreakout from "../atariBreakOut/AtariBreakout";

function Menu({screenChanger}) {
    return (
        <div className={"Menu"}>
            <h1 className={"MenuTitle"}>MixedBag Minigames</h1>

            <div className={"GameDisplayTable"}>
                <GameMiniature

                    gameName={"Pong"}
                    gameCssClass={"ImagePong"}

                    screenChanger={screenChanger}
                    gameComponent={
                        <Pong screenChanger={screenChanger}/>
                    }/>

                <GameMiniature
                    gameName={"MineSweeper"}
                    gameCssClass={"ImageMineSweeper"}

                    screenChanger={screenChanger}
                    gameComponent={
                        <SnakeHomeScreen screenChanger={screenChanger}/>
                    }/>

                <GameMiniature
                    gameName={"Snake"}
                    gameCssClass={"ImageSnake"}

                    screenChanger={screenChanger}
                    gameComponent={
                        <SnakeHomeScreen screenChanger={screenChanger}/>
                    }/>

                <GameMiniature

                    gameName={"PacMan"}
                    gameCssClass={"ImagePacman"}

                    screenChanger={screenChanger}
                    gameComponent={
                        <SnakeHomeScreen screenChanger={screenChanger}/>
                    }/>

                <GameMiniature
                    gameName={"SpaceInvaders"}
                    gameCssClass={"ImageSpaceInvaders"}

                    screenChanger={screenChanger}
                    gameComponent={
                        <SpaceInvaders screenChanger={screenChanger}/>
                    }/>

                <GameMiniature

                    gameName={"Atari Breakout"}
                    gameCssClass={"ImageAtariBreakout   "}

                    screenChanger={screenChanger}
                    gameComponent={
                        <AtariBreakout screenChanger={screenChanger}/>
                    }/>

            </div>
        </div>
    );
}

export default Menu;