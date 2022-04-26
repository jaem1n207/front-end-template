/* eslint-disable no-unused-vars */
// 추상 클래스 만들기 참고: https://stackoverflow.com/questions/29480569/does-ecmascript-6-have-a-convention-for-abstract-classes
// Abstract
export default class View {
  #container;

  #template;

  #renderTemplate;

  constructor(containerId, template) {
    if (new.target === View) {
      throw new TypeError('Must override method');
    }

    const containerEl = document.getElementById(containerId);
    if (!containerEl) {
      throw new Error(`최상위 컨테이너(${containerId})가 없어 UI를 진행하지 못해요`);
    }

    this.#container = containerEl;
    this.#template = template;
    this.#renderTemplate = template;
  }

  _updateView() {
    if (typeof this.#renderTemplate === 'function') {
      this._setTemplateData();
    }

    this.#container.innerHTML = this.#renderTemplate;
    this.#renderTemplate = this.#template;
  }

  _setTemplateData(templateData) {
    this.#renderTemplate = this.#renderTemplate(templateData);
  }

  // Abstract (required)
  // eslint-disable-next-line class-methods-use-this
  render(...params) {
    throw new Error('render 메소드를 구현해주세요');
  }
}
