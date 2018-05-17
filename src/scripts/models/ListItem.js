import uuid from 'uuid';

export class ListItemModel {
  id = '';
  url = '';
  redirectUrl = '';
  _list = [];

  title = '';
  description = '';
  _titleEditing = false;

  constructor(list, item) {
    this.id = uuid();
    this._list = list || [];
    this.title = item.title || this.id;
    this.description = item.description;
  }

  get list() {
    return this._list;
  }

  get titleEditing() {
    return this._titleEditing;
  }

  removeItem = () => {
    this.list.removeItem(this.id);
  }

  editTitle = () => {
    this._titleEditing = true;
  }

  exitEditTitle = () => {
    this._titleEditing = false;
  }
}