/**
 * Styles
 */
import '../../styles/menu/Menu.css';

/**
 * Components
 */

import GameMiniature from "./GameMiniature";

function Menu() {
    return (
        <div className={"Menu"}>
            <h1 className={"MenuTitle"}>MixedBag Minigames</h1>

            <div className={"GameDisplayTable"}>

                <GameMiniature

                    gameName={"Pong"}
                    gameCssClass={"ImagePong"}
                    gameLink={"/Pong"}

                />

                <GameMiniature

                    gameName={"MineSweeper"}
                    gameCssClass={"ImageMineSweeper"}
                    gameLink={"/MineSweeper"}

                />

                <GameMiniature

                    gameName={"Snake"}
                    gameCssClass={"ImageSnake"}
                    gameLink={"/Snake"}

                />

                <GameMiniature

                    gameName={"PacMan"}
                    gameCssClass={"ImagePacman"}
                    gameLink={"/Pacman"}

                />

                <GameMiniature

                    gameName={"SpaceInvaders"}
                    gameCssClass={"ImageSpaceInvaders"}
                    gameLink={"/SpaceInvaders"}

                />

                <GameMiniature

                    gameName={"Atari Breakout"}
                    gameCssClass={"ImageAtariBreakout"}
                    gameLink={"/AtariBreakout"}
                />

            </div>
        </div>
    );
}

export default Menu;