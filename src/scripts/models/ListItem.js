import uuid from 'uuid';

export default class ListItemModel {
  id;
  url;
  redirectUrl;
  checked = false;
  title;
  description;
  
  _list = {};
  _titleEditing = false;

  constructor(list, item) {
    this.id = uuid();
    this._list = list || {};
    this.title = item.title || this.id;
    this.description = item.description;
    this.url = item.url || '';
    this.redirectUrl = item.redirectUrl || '';
    this.checked = item.checked || false;
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