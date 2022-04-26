import View from '../core/view';
import template from './page-not-found.template';

export default class PageNotFound extends View {
  constructor(containerId) {
    super(containerId, template);
  }

  render = () => {
    this._updateView();
  };
}
