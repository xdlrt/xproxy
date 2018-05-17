import React from 'react';
import { model, binding } from 'mota';
import styled from 'styled-components';
import { Input } from 'antd';

const Container = styled.div`

`;

const CustomInput = styled(Input) `
  margin-bottom: 8px;
`;

@model
@binding
export default class PanelItem extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <Container>
        <CustomInput data-bind="url" placeholder="待转发url" />
        <CustomInput data-bind="redirectUrl" placeholder="转发到的url" />
      </Container>
    );
  }

}