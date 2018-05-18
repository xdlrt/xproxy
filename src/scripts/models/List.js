/* global chrome */
import uuid from 'uuid';
import { ListItemModel } from './listItem';
import { saveListData, saveXproxyDisabled } from '../utils/storage';

class ListModel {
  id = '';
  items = [];

  // 开关状态，on = true
  _listState = false;

  constructor() {
    this.id = uuid();
  }

  get listState() {
    chrome.storage.sync.get('xproxyDisabled', (result) => {
      this._listState = result.xproxyDisabled === 'disabled' ? false : true;
    });
    return this._listState;
  }

  changeListState = (val) => {
    saveXproxyDisabled(val);
    this._listState = val;
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