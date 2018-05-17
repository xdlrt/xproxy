/* global chrome */
import uuid from 'uuid';
import { ListItemModel } from './listItem';
import { saveListData } from '../utils/storage';

class ListModel {
  id = '';
  items = [];

  _listDisabled = false;

  constructor() {
    this.id = uuid();
  }

  get listDisabled() {
    const bg = chrome.extension.getBackgroundPage();
    this._listDisabled = bg.xproxyDisabled;
    return this._listDisabled;
  }

  changeListState = (val) => {
    const bg = chrome.extension.getBackgroundPage();
    bg.xproxyDisabled = val;
    this._listDisabled = val;
  }

  addItem = (item = {}) => {
    this.items.push(new ListItemModel(this, item));
  }

  removeItem = (id) => {
    this.items = this.items.filter(item => item.id !== id);
  }

  saveItems = () => {
    saveListData(this.items);
  }
}

const listModel = new ListModel();

export default listModel;