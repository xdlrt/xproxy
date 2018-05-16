import React from 'react';
import { model } from 'mota';
import styled from 'styled-components';
import HomeModel from './HomeModel';

const Container = styled.div`
  width: 500px;
  height: 500px;
`

@model(new HomeModel())
export default class Home extends React.Component {

  render() {
    return (
      <Container>
        <h1 className="title">{this.model.title}</h1>
        <p>{this.model.content}</p>
      </Container>
    )
  }

}