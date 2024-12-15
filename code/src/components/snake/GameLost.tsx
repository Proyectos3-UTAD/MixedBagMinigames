import { Link } from 'react-router-dom'
import '../../styles/snake/EndScreens.css'

export default function GameLost() {
	return (
		<div className='snake-defeat-propmt'>
			<h2 className='snake-end-game-propmt-title'>Has perdido</h2>
			<div className='snake-defeat-gif' />
			<div className='snake-end-screen-button-holder'>

				<Link reloadDocument to={"/Snake/Game"} className='snake-end-game-link'> Retry</Link>
				<Link to={"/"} className='snake-end-game-link'> Exit</Link>

			</div>
		</div>
	)
}