import React from 'react';
import { model } from 'mota';
import styled from 'styled-components';
import { Icon } from 'antd';

const Container = styled.div`

`;

const CustomIcon = styled(Icon) `
  float: right;
  line-height: 22px;
  cursor: pointer;
`;

@model
export default class PanelItem extends React.Component {
  render() {
    return (
      <Container>
        <span>{this.model.title}</span>
        <CustomIcon type="close" onClick={this.model.removeItem} />
      </Container>
    );
  }
}