import React from 'react';
import { model } from 'mota';
import styled from 'styled-components';
import HomeModel from './HomeModel';
import { Collapse, Switch } from 'antd';
const Panel = Collapse.Panel;

const Container = styled.div`
  width: 500px;
  height: 500px;
`;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

@model(new HomeModel())
export default class Home extends React.Component {

  render() {
    return (
      <Container>
        <h1 className="title">{this.model.title}</h1>
        <p>{this.model.content}</p>
        <Switch checkedChildren="全局开" unCheckedChildren="全局关" defaultChecked />
        <Collapse>
          <Panel header="This is panel header 1" key="1">
            <p>{text}</p>
          </Panel>
          <Panel header="This is panel header 2" key="2">
            <p>{text}</p>
          </Panel>
          <Panel header="This is panel header 3" key="3" disabled>
            <p>{text}</p>
          </Panel>
        </Collapse>
      </Container>
    );
  }

}