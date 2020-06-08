import React from 'react';
import {Router, Switch} from 'dva/router';
import SubRoutes from './utils/SubRoutes';

//router 守卫
const isAuthority = true
//router
const RouteConfig = [{
	path: '/',
	component: () => import('./pages/IndexPage'),
	models: [import ('./models/home')],
	routes: [{
		path: '/home',
		component: () => import('./pages/Home'),
		redirect: true,
		isAuthority
	}, {
		path: '/menus',
		component: () => import('./pages/Menus'),
		isAuthority
	}, {
		path: '/admin',
		component: () => import('./pages/Admin'),
		isAuthority
	}, {
		path: '/about',
		component: () => import('./pages/About'),
		isAuthority,
		routes : [{
			path:'/about/history',
			component:()=>import('./pages/About/History'),
			isAuthority
		},{
			path:'/about/contact',
			component:()=>import('./pages/About/Contact'),
			isAuthority,
			routes : [{
				path:'/about/contact/phone',
				component:()=>import('./pages/About/Contact/Phone'),
				isAuthority
			},{
				path:'/about/contact/address',
				component:()=>import('./pages/About/Contact/Address'),
				isAuthority
			}]
		},{
			path:'/about/delivery',
			component:()=>import('./pages/About/Delivery'),
			isAuthority
		},{
			path:'/about/orderingGuide',
			component:()=>import('./pages/About/OrderingGuide'),
			isAuthority
		}]
	}, {
		path: '/login',
		component: () => import('./pages/User/Login')
	}, {
		path: '/register',
		component: () => import('./pages/User/Register')
	}]
}]

function RouterConfig ({ history, app }) {
	return (
		<Router history={history}>
			<Switch>
				{/*<Route path="/" component={IndexPage}/>*/}
				{RouteConfig.map((route, i) => <SubRoutes key={i} app={app} {...route}/>)}
			</Switch>
		</Router>
	);
}

export default RouterConfig;
