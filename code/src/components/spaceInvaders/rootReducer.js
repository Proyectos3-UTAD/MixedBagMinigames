import { combineReducers } from 'redux';
import { hero } from './hero-reducer';
import { heroBullets } from './hero-bullets-reducer';
import { enemiesGrid } from './enemies-grid-reducer';
import { enemyExplosions } from './enemy-explosion';

const rootReducer = combineReducers({
    hero,
    heroBullets,
    enemiesGrid,
    enemyExplosions
});

export default rootReducer;
