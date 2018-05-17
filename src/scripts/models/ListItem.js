import uuid from 'uuid';

export class ListItemModel {
  id = '';
  url = '';
  redirectUrl = '';
  title = '';
  description = '';
  _list = [];

  constructor(list, item) {
    this.id = uuid();
    this._list = list || [];
    this.title = item.title || this.id;
    this.description = item.description;
  }

  get list() {
    return this._list;
  }

  removeItem = () => {
    this.list.removeItem(this.id);
  }
}