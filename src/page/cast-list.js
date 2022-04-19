import View from '../core/view';
import template from './cast-list-template';
import { CastListApi } from '../core/api';

export default class CastList extends View {
  #api;

  #data;

  constructor(container, data) {
    super(container, template);

    this.#data = data;
    this.#api = new CastListApi();
  }

  render = async () => {
    console.log(this.#data.store.castList);
    if (!this.#data.store.hasCastList) {
      this.#data.store.castList = await this.#api.getData();
    }

    this._setTemplateData({ castList: this.#data.store.castList });

    this._updateView();
  };
}
