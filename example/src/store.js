export default class Store {
  #cast;

  #castList;

  constructor() {
    this.#cast = null;
    this.#castList = [];
  }

  set cast(cast) {
    this.#cast = cast;
  }

  get cast() {
    return this.#cast;
  }

  set castList(castList) {
    this.#castList = castList.map(cast => ({ ...cast, isRead: false }));
  }

  get castList() {
    return this.#castList;
  }

  get hasCastList() {
    return this.#castList.length > 0;
  }

  makeRead(id) {
    const cast = this.castList.find(_cast => _cast.id === id);

    if (cast) {
      cast.isRead = true;
    }
  }
}
