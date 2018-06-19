import React from 'react';
import { model } from 'mota';
import styled from 'styled-components';
import Group from '../Group';
// import Menu from '../../components/Menu';

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 16px;
  width: 600px;
  height: 600px;
`;

// const CustomMenu = styled(Menu)`
//   position: absolute;
//   left: 16px;
//   width: 240px;
// `;

@model
export default class Home extends React.Component {

  render() {
    return (
      <Container>
        {/* <CustomMenu /> */}
        <Group />
      </Container>
    );
  }

}