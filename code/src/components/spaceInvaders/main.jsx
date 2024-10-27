import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers'; // Archivo donde defines todos los reducers combinados
import SpaceInvaders from './SpaceInvaders';

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <SpaceInvaders />
    </Provider>,
    document.getElementById('root')
);
