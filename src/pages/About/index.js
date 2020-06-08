import React, {useEffect, useState} from 'react'
import {Tabs} from 'antd'
import styles from './index.scss'
import SubRoutes, {RedirectRoute} from "../../utils/SubRoutes";
import {Switch} from "dva/router";

//antd
const { TabPane } = Tabs;

function Index (props) {
	const { routes, app, location } = props;

	const [activeKey, setActiveKey] = useState('')

	useEffect(() => {
		const initKey = getRoutePathname()
		setActiveKey(initKey)
	}, [location.pathname])


	const TabList = [{
		name: '历史订餐',
		key: '/about/history'
	}, {
		name: '联系我们',
		key: '/about/contact'
	}, {
		name: '点餐文档',
		key: '/about/orderingGuide'
	}, {
		name: '快递信息',
		key: '/about/delivery'
	}]

	const handelTabClick = (key) => {
		if ( getRoutePathname() === key ) return
		props.history.push(key)
	}

	const TabItem = function () {
		return TabList.map(tab => <TabPane tab={tab.name} key={tab.key}/>)
	}

	const getRoutePathname = () => `/${location.pathname.split('/').slice(1, 3).join('/')}`

	return (
		<div className={styles.tabs}>
			<Tabs className={styles.container} defaultActiveKey="1"
				  activeKey={activeKey} tabPosition={"left"}
				  animated={false} onChange={handelTabClick}>
				{TabItem()}
			</Tabs>
			<div className={styles.routes}>
				<Switch>
					{routes.map((route, i) => <SubRoutes key={i} {...route} app={app}/>)}
					<RedirectRoute exact={true} from={'/about'} routes={routes}/>
				</Switch>
			</div>
		</div>
	)
}

export default Index
