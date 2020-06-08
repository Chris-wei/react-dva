import React from 'react';
import {connect} from 'dva';
// 路由
import {Switch} from 'dva/router'
import SubRoutes, {NoMatchRoute, RedirectRoute} from '../utils/SubRoutes'
// nav-bar
import NavBar from './NavBar'
//antd
import {Layout} from 'antd'
//scss
import styles from './IndexPage.scss'
// antd
const { Header, Content } = Layout

function IndexPage (props) {
	const { routes, app } = props;

	const MemoContent = React.memo(() =>
		<Content className={styles.content}>
			{/*一级路由*/}
			<Switch>
				{routes.map((route, i) => <SubRoutes key={i} {...route} app={app}/>)}
				<RedirectRoute exact={true} from={'/'} routes={routes}/>
				<NoMatchRoute/>
			</Switch>
		</Content>
	)

	return (
		<Layout className={styles.layout}>
			<Header className={styles.header}>
				<NavBar {...props}/>
			</Header>
			<MemoContent/>
		</Layout>
	);
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
