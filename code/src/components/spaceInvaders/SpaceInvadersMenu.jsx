// import '../../styles/spaceInvaders/style.css';
import '../../styles/spaceInvaders/Menu.css';
import HomeMenuButton from "../common/HomeMenuButton";
import {Link} from "react-router-dom";

function SpaceInvadersMenu() {
	return (
		<div className="space-invaders-menu-container">
			<h1>Space Invaders</h1>
			<div className="space-invaders-menu-buttons">
				<Link className={"space-invaders-menu-button"} to={"/ClassicSpaceInvaders"}>
					Game
				</Link>
				<Link className={"space-invaders-menu-button"} to={"/SpaceInvaders"}>
					Speed
				</Link>
				<HomeMenuButton className={"space-invaders-menu-button"}/>
			</div>
		</div>
	);
}

export default SpaceInvadersMenu;

