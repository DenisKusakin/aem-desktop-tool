import 'rxjs';
import { combineEpics } from 'redux-observable';
import servers from './servers-epic';
import homePage from './home-page-epic';
import pushToMainEpic from './push-to-main-epic';
import bundlesActionsEpic from './bundles-actions-epic';
import searchDialogEpic from './search-dialog-epic';

export default combineEpics(
    servers,
    homePage,
    pushToMainEpic,
    bundlesActionsEpic,
    searchDialogEpic
);
