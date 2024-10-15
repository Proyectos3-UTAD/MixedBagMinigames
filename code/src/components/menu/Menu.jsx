import GameMiniature from "./GameMiniature";
import Snake from "../snake/Snake";
import SpaceInvaders from "../spaceInvaders/SpaceInvaders";
import Pong from "../pong/Pong";
import AtariBreakout from "../atariBreakOut/AtariBreakout";

function Menu({screenChanger}) {
    return (
        <div>
            <h1>MixedBag Minigames</h1>

            <GameMiniature

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
    );
}

export default Menu;