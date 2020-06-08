import dva from 'dva';
import {createHashHistory} from 'history';
import './stylesheets/index.scss';
import './stylesheets/reset.scss';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';

moment.locale('zh-cn');

// 1. Initialize
const app = dva({
	history: createHashHistory()
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/global').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
