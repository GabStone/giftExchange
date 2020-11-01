import React from 'react';
import './App.css';
import Routes from "./Routes";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@material-ui/styles';
import MuiTheme from './theme';

function App() {
  return (
    <div className="App">
        <header className="App-header">
            Gift Exchange
        </header>
            <BrowserRouter>
                <ThemeProvider theme={MuiTheme}>
                    <Routes />
                </ThemeProvider>
            </BrowserRouter>
        <footer className="App-footer">
            StoneOak - {new Date().getFullYear()}
        </footer>
    </div>
  );
}

export default App;
