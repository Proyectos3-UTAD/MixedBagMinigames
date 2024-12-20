import React from "react";
import colors from "../styles/Colors";
import styled from "styled-components";
import { useGameContext } from "../context/GameContext";
import { useInterval } from "../hooks/useInterval";
import { GAME_STATUS } from "../types/gameStatus";
import { useNavigate } from "react-router-dom";


const Header = () => {
  const { points, foodAmount, gameStatus } = useGameContext();
  const [timeElapsed, setTimeElapsed] = React.useState(0);

  React.useEffect(() => {
    document.addEventListener("restart-game", gameRestarted);
    return () => document.removeEventListener("restart-game", gameRestarted);
  }, []);

  function gameRestarted() {
    setTimeElapsed(0);
  }

  useInterval(() => {
    if (gameStatus === GAME_STATUS.IN_PROGRESS) {
      setTimeElapsed((previuosTime) => {
        return previuosTime + 1;
      });
    }
  }, 1000);

  const navigate = useNavigate();

  const goToMenu = () => {
    navigate("/"); // Ruta del menú principal
  };

  return (
    <StyledHeader>
      <span className="left title">PACMAN</span>

      <div className="right score">

      <div className="menu">
        <MenuButton onClick={goToMenu}>Menú Principal</MenuButton>
        </div>

        <div>
          <strong> Puntuación: </strong>
          <span className="points">
            {points} / {foodAmount}
          </span>

          <strong> Tiempo: </strong>
          <span className="points">{timeElapsed}</span>
        </div>
      
      </div>
    </StyledHeader>  );
};

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.color3};
  color: ${colors.color2};
  padding: 16px;

  

`;


const Title = styled.div`
  font-size: 40px;
  text-align: center;
  margin-bottom: 10px;
`;

const StatsContainer = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;

  .score {
    font-size: 34px;
    text-align: left;
  }

  .time {
    font-size: 34px;
    text-align: right;
  }
`;

const MenuButton = styled.button`
  text-align: center;
  padding: 2px 50px;
  margin: 0px 10px;
  font-size: 15px;
  background-color: ${colors.color1};
  color: ${colors.color2};
  border: 2px solid ${colors.color2};
  border-radius: 5px;
  cursor: pointer;

  box-shadow: 0 0 50px orange;
  
  &:hover {
    background-color: ${colors.color2};
    color: ${colors.color1};
  }
`;

export default Header;




/*
import React from "react";
import colors from "../styles/Colors";
import styled from "styled-components";
import { useGameContext } from "../context/GameContext";
import { useInterval } from "../hooks/useInterval";
import { GAME_STATUS } from "../types/gameStatus";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { points, foodAmount, gameStatus, setGameStatus } = useGameContext();
  const [timeElapsed, setTimeElapsed] = React.useState(0);

  React.useEffect(() => {
    document.addEventListener("restart-game", gameRestarted);
    return () => document.removeEventListener("restart-game", gameRestarted);
  }, []);

  function gameRestarted() {
    setTimeElapsed(0);
  }

  useInterval(() => {
    if (gameStatus === GAME_STATUS.IN_PROGRESS) {
      setTimeElapsed((previousTime) => previousTime + 1);
    }
  }, 1000);

  const navigate = useNavigate();

  const goToMenu = () => {
    navigate("/"); // Ruta del menú principal
  };

  return (
    <StyledHeader>
      <Title>PACMAN</Title>
      <StatsContainer>
        <div className="score">
          <strong>Puntuación:</strong> {points} / {foodAmount}
        </div>
        <div className="menu">
        <MenuButton onClick={goToMenu}>Menú Principal</MenuButton>
        </div>
        <div className="time">
          <strong>Tiempo de Juego:</strong> {timeElapsed}
        </div>
      </StatsContainer>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.color3};
  color: ${colors.color2};
  padding: 10px;
  width: 100%;
`;

const Title = styled.div`
  font-size: 80px;
  text-align: center;
  margin-bottom: 20px;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%; 
  margin-bottom: 20px;

  .score {
    font-size: 34px;
    text-align: left;
  }

  .time {
    font-size: 34px;
    text-align: right;
  }
`;

const MenuButton = styled.button`
  padding: 10px 20px;
  font-size: 24px;
  background-color: ${colors.color1};
  color: ${colors.color2};
  border: 2px solid ${colors.color2};
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.color2};
    color: ${colors.color1};
  }
`;

export default Header;

*/