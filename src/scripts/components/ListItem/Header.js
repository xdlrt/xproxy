import React from 'react';
import { model, binding, watch, bindable } from 'mota';
import styled from 'styled-components';
import { Icon, Input, Checkbox } from 'antd';
const BindCheckbox = bindable('checkbox', Checkbox);

const Container = styled.div`
  position: relative;
  height: 24px;
`;

const CustomIcon = styled(Icon)`
  float: right;
  line-height: 26px;
  cursor: pointer;
`;

const Title = styled.span`
  display: inline-block;
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
`;

const TitleInput = styled(Input)`
  position: absolute;
  top: 0;
  left: 0;
`;

@model
@binding
export default class PanelItem extends React.Component {

  exitEditTitle = (event) => {
    if (event.keyCode !== 13 || !this.model.title) return;
    this.model.exitEditTitle();
  }

  @watch(model => model.title + model.checked)
  watchItem() {
    this.model.list.saveItems(this.model.list.items);
  }

  render() {
    const { title, titleEditing } = this.model;
    return (
      <Container>
        <BindCheckbox data-bind="checked" />
        <Title onDoubleClick={this.model.editTitle}>{title}</Title>
        <CustomIcon type="close" onClick={this.model.removeItem} />
        {titleEditing
          ? <TitleInput
            data-bind="title"
            autoFocus={titleEditing}
            onBlur={this.exitEditTitle}
            onKeyDown={this.exitEditTitle} />
          : null}
      </Container>
    );
  }
}