import React from 'react';
import { Menu, Icon } from 'antd';

export default class MenuComponent extends React.Component {

  render() {
    return (
      <Menu mode="inline" {...this.props}>
        <Menu.Item key="1">
          <Icon type="pie-chart" />
          <span>Option 1</span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="desktop" />
          <span>Option 2</span>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="inbox" />
          <span>Option 3</span>
        </Menu.Item>
      </Menu>
    );
  }

}