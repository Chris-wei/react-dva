import React from 'react'
import {connect} from "dva";
import {Redirect, Route} from 'dva/router'
import dynamic from 'dva/dynamic'
import NoMatch from '../components/NoMatch'

const dynamicComponent = (app, models, component) => {
	return dynamic({
		app,
		models: () => models,
		component
	})
}

export function SubRoutes (props) {
	const { app, component, models = [], routes = [], isAuthority, userInfo } = props;
	const Component = dynamicComponent(app, models, component);
	// 路由鉴权
	if ( isAuthority ) {
		const username = localStorage.getItem('username')
		if ( !username && !userInfo.id ) return <Redirect to={'/login'}/>;
	}
	return <Route render={props => <Component {...props} app={app} routes={routes}/>}/>
}

export function RedirectRoute ({ routes, from, exact }) {
	const redirectRoute = routes.filter(route => route.redirect)
	const to = redirectRoute.length ? redirectRoute[0].path : routes[0].path
	return <Redirect to={to} exact={exact} from={from}/>
}

export function NoMatchRoute ({ status = 404 }) {
	return <Route render={props => <NoMatch {...props} status={status}/>}/>
}

export default connect(({ global }) => ({
	userInfo: global.userInfo
}))(SubRoutes)
