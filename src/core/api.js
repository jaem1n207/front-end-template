/* eslint-disable no-return-await */
/* eslint-disable max-classes-per-file */
import axios from 'axios';
import { FAKE_USER_DETAIL_URL, FAKE_USER_URL } from '../config/config';

export default class Api {
  url;

  constructor(url) {
    this.url = url;
  }

  async request() {
    const { data } = await axios(this.url);
    return await data;
  }
}

export class CastListApi extends Api {
  constructor() {
    super(FAKE_USER_URL);
  }

  async getData() {
    return this.request();
  }
}

export class CastDetailApi extends Api {
  constructor(id) {
    super(FAKE_USER_DETAIL_URL.replace('@id', id));
  }

  async getData() {
    return this.request();
  }
}
