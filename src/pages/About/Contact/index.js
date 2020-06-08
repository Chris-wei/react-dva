import React from 'react'
import styles from "./index.scss";
import {NavLink, Switch} from "dva/router";
import SubRoutes, {RedirectRoute} from "../../../utils/SubRoutes";

function Index (props) {
	const { routes, app } = props
	return (
		<div className={styles.container}>
			<div className={styles.title}>联系我们</div>
			<div className={styles['link-box']}>
				<NavLink activeClassName={styles.selected} className={styles.link} to={'/about/contact/phone'}>联系电话</NavLink>
				<NavLink activeClassName={styles.selected} className={styles.link} to={'/about/contact/address'}>联系地址</NavLink>
			</div>
			<div className={styles.info}>
				<Switch>
					{routes.map((route, i) => <SubRoutes key={i} {...route} app={app}/>)}
					<RedirectRoute exact={true} from={'/about/contact'} routes={routes}/>
				</Switch>
			</div>
		</div>
	)
}

export default Index
