import React from './lib/react';
import { render } from 'react-dom';
import 'antd/dist/antd.css';
import './css/common.less';
import Group from './scripts/pages/Group';

render(
  <Group />,
  document.getElementById('app')
);
