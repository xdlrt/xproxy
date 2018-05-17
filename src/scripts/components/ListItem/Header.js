import React from 'react';
import { model, binding } from 'mota';
import styled from 'styled-components';
import { Icon, Input } from 'antd';

const Container = styled.div`
  position: relative;
`;

const CustomIcon = styled(Icon)`
  float: right;
  line-height: 22px;
  cursor: pointer;
`;

const TitleInput = styled(Input)`
  position: absolute;
  top: 0;
  left: 0;
`;

@model
@binding
export default class PanelItem extends React.Component {

  onEditTitleKeyDown = (event) => {
    if (event.keyCode !== 13) return;
    this.model.exitEditTitle();
  }

  render() {
    const { title, titleEditing } = this.model;
    return (
      <Container onDoubleClick={this.model.editTitle}>
        <span>{title}</span>
        <CustomIcon type="close" onClick={this.model.removeItem} />
        {titleEditing
          ? <TitleInput
            data-bind="title"
            autoFocus={titleEditing}
            onBlur={this.model.exitEditTitle}
            onKeyDown={this.onEditTitleKeyDown} />
          : null}
      </Container>
    );
  }
}