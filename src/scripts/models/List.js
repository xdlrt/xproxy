import uuid from 'uuid';
import { ListItemModel } from './listItem';

class ListModel {
  id = '';
  items = [];

  constructor() {
    this.id = uuid();
  }

  addItem = (item) => {
    this.items.push(new ListItemModel(this, item));
  }

  removeItem = (id) => {
    this.items = this.items.filter(item => item.id !== id);
  }
}

const list = new ListModel();

export default list;