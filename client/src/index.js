import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { MuiThemeProvider , createMuiTheme } from '@material-ui/core/styles';
//Material UI를 통해 font를 선언할 경우, index.js 파일에서 통합적으로 선언 가능
const theme = createMuiTheme({
    typography : {
        fontFamily : '"Noto Sans KR", serif'
    }
});

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
    <MuiThemeProvider theme={theme}><App /></MuiThemeProvider>,
     document.getElementById('root'));

serviceWorker.unregister();
