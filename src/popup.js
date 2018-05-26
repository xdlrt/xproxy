import React from 'react';
import { render } from 'react-dom';
import 'antd/dist/antd.css';
import './css/common.less';
import Home from './scripts/pages/Home';

render(
  <Home />,
  document.getElementById('app')
);
