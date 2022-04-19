import View from '../core/view';
import template from './cast-detail-template';
import { CastDetailApi } from '../core/api';

export default class CastDetail extends View {
  #data;

  constructor(containerId, data) {
    super(containerId, template);

    this.#data = data;
  }

  render = async id => {
    const api = new CastDetailApi(id);
    this.#data.store.cast = await api.getData();
    this.#data.store.makeRead(Number(id));

    this._setTemplateData({ cast: this.#data.store.cast });

    this._updateView();
    // this.#container.innerHTML = this.#template({ cast: this.#data.store.cast });
  };
}
