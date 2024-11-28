import '../../styles/spaceInvaders/Menu.css';
import React from "react";
import SpaceInvaders from "../spaceInvaders/space-invader";
import ClassicSpaceInvaders from "../spaceInvaders/classic-space-invader";
import HomeMenuButton from "../common/HomeMenuButton";

function SpaceInvadersMenu({ screenChanger }) {
  return (
    <div className="menu-container">
      <h1>Space Invaders</h1>
      <div className="menu-buttons">
        <button
          onClick={() =>
            screenChanger(
              <ClassicSpaceInvaders onReturnToMenu={() => screenChanger(<SpaceInvadersMenu screenChanger={screenChanger} />)} />
            )
          }
        >
          Game
        </button>
        <button
          onClick={() =>
            screenChanger(
              <SpaceInvaders onReturnToMenu={() => screenChanger(<SpaceInvadersMenu screenChanger={screenChanger} />)} />
            )
          }
        >
          Speed
        </button>
        <HomeMenuButton screenChanger={screenChanger} />
      </div>
    </div>
  );
}

export default SpaceInvadersMenu;

