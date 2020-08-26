import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import moment from 'moment';
import ReactDOM from 'react-dom';
import axios from 'axios';

const ReactRedux = require('react-redux');
const Redux = require('redux');

Enzyme.configure({ adapter: new Adapter() });
// window.HTMLElement.prototype.scrollIntoView = function () {};

global.React = React;
global.moment = moment;
global.ReactRedux = ReactRedux;
global.ReactDOM = ReactDOM;
global.Redux = Redux;
global.axios = axios;
