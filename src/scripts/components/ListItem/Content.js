import React from 'react';
import { model, binding, watch } from 'mota';
import styled from 'styled-components';
import { Input } from 'antd';

const Container = styled.div``;

const CustomInput = styled(Input) `
  margin-bottom: 8px;
`;

@model
@binding
export default class PanelItem extends React.Component {

  @watch(model => model.url + model.redirectUrl)
  watchItem() {
    this.model.list.saveItems(this.model.list.items);
  }

  render() {
    return (
      <Container>
        <CustomInput data-bind="url" placeholder="input origin url rule" />
        <CustomInput data-bind="redirectUrl" placeholder="input redirect url rule" />
      </Container>
    );
  }

}