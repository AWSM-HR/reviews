import React from 'react';
import ReactDOM from 'react-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
// eslint-disable-next-line no-unused-vars
import CssBaseline from '@material-ui/core/CssBaseline';
import 'fontsource-roboto';
import Router from './components/Router';

const generateClassName = createGenerateClassName({
  productionPrefix: 'collin',
  seed: 'newman',
});

const WrappedApp = () => (
  <StylesProvider generateClassName={generateClassName}><Router /></StylesProvider>
);

ReactDOM.render(<WrappedApp />, document.getElementById('collin'));
