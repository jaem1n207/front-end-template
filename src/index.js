import Router from './core/router';
import PageNotFound from './page/page-not-found';

const router = new Router();

const pageNotFound = new PageNotFound('root');

router.setNotFoundPage(pageNotFound);
