import Router from './core/router';
import Store from './store';
import CastList from './page/cast-list';
import CastDetail from './page/cast-detail';
import PageNotFound from './page/page-not-found';

const store = new Store();

const router = new Router();

const castList = new CastList('root', { store });
const castDetail = new CastDetail('root', { store });
const pageNotFound = new PageNotFound('root');

router.setDefaultPage(castList);
router.setNotFoundPage(pageNotFound);

router.addRoutePath('/cast/', castDetail, /cast\/(\d+)/);
