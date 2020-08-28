import createHistory from 'history/createHashHistory';
// import { createBrowserHistory as createHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducers from '../_reducers/index';

const history = createHistory();
const routeMiddleware = routerMiddleware (history);
const loggerMiddleware = createLogger();

export const middlewares = [ routeMiddleware,loggerMiddleware, thunkMiddleware ];

export default function configureStore (initialState) {
    const store = createStore (reducers, initialState,
        compose (applyMiddleware (...middlewares)));

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept ('../_reducers/index', () => {
            const nextRootReducer = require ('../_reducers/index');
            store.replaceReducer (nextRootReducer);
        });
    }
    return store;
}
export { history };

