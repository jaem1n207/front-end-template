export default class Router {
  #isStart;

  defaultRoute;

  notFoundRoute;

  routeTable;

  constructor() {
    window.addEventListener('hashchange', this.#route.bind(this));

    this.#isStart = false;
    this.defaultRoute = null;
    this.notFoundRoute = null;
    this.routeTable = [];
  }

  setDefaultPage(page, params = null) {
    this.defaultRoute = {
      path: '',
      page,
      params,
    };
  }

  setNotFoundPage(page, params = null) {
    this.notFoundRoute = {
      path: '',
      page,
      params,
    };
  }

  addRoutePath(path, page, params = null) {
    this.routeTable.push({ path, page, params });

    if (!this.#isStart) {
      this.#isStart = true;
      setTimeout(this.#route.bind(this), 0);
    }
  }

  #route() {
    const { pathname, hash } = window.location;

    if (hash === '' && this.defaultRoute && pathname === '/') {
      this.defaultRoute.page.render();
      return;
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const routeInfo of this.routeTable) {
      if (hash.indexOf(routeInfo.path) >= 0) {
        if (routeInfo.params) {
          const parseParams = hash.match(routeInfo.params);

          if (parseParams) {
            routeInfo.page.render.apply(null, [parseParams[1]]);
          }
        } else {
          routeInfo.page.render();
        }
        return;
      }
    }

    // eslint-disable-next-line no-unused-expressions
    this.notFoundRoute ? this.notFoundRoute.page.render() : this.defaultRoute.page.render();
  }
}
