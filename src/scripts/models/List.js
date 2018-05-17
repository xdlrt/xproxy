import uuid from 'uuid';
import { ListItemModel } from './listItem';
import { saveListData } from '../utils/storage';

class ListModel {
  id = '';
  items = [];

  constructor() {
    this.id = uuid();
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