import React from 'react';
import { model } from 'mota';
import styled from 'styled-components';
import ListModel from '../../models/List';
import { Switch, Button, List } from 'antd';
import ItemHeader from '../../components/ListItem/Header';
import ItemContent from '../../components/ListItem/Content';
import { getListData } from '../../utils/storage';
const Item = List.Item;

const CustomItem = styled(Item) `
  margin-bottom: 16px;
  padding: 16px;
  border: 0;
  border-radius: 6px;
  background: #f7f7f7;
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, .1);
  overflow: hidden
`;

const Container = styled.div`
  margin: 0 auto;
  padding: 16px;
  width: 500px;
  height: 500px;
`;

const Header = styled.div`
  margin-bottom: 16px;
`;

const HeaderButton = styled(Button) `
  margin-right: 8px;
`;

const HeaderSwitch = styled(Switch) `
  float: right;
  margin-top: 5px;
`;

@model(ListModel)
export default class Group extends React.Component {

  componentDidMount() {
    getListData(this.model);
  }

  render() {
    return (
      <Container>
        <Header>
          <HeaderButton onClick={this.model.addItem}>添加规则</HeaderButton>
          <Button onClick={this.model.saveItems}>保存</Button>
          <HeaderSwitch checkedChildren="on" unCheckedChildren="off" />
        </Header>
        <List
          itemLayout="vertical"
          locale={{ emptyText: '现在还没有代理规则哦' }}
          dataSource={this.model.items}
          renderItem={item => (
            <CustomItem key={item.id}>
              <List.Item.Meta
                title={<ItemHeader model={item} />}
                description={item.description}
              />
              <ItemContent model={item} />
            </CustomItem>
          )}
        />
      </Container>
    );
  }

}