import React, {useEffect, useState} from 'react'
import {connect} from "dva";
import styles from './index.scss'
import {Link} from 'dva/router'
import {Dropdown, Menu} from 'antd'
//logo
import Logo from '../../assets/logo.png'

const menus = [{
	key: '/home',
	classname: styles['menu-item'],
	name: '主页'
}, {
	key: '/menus',
	classname: styles['menu-item'],
	name: '菜单'
}, {
	key: '/admin',
	classname: styles['menu-item'],
	name: '管理'
}, {
	key: '/about',
	classname: styles['menu-item'],
	name: '关于我们'
}, {
	key: '/login',
	classname: [styles.login, styles['menu-item']],
	name: '登录',
	auth: true
}, {
	key: '/register',
	classname: [styles.register, styles['menu-item']],
	name: '注册',
	auth: true
}]

function Index (props) {
	const { location: { pathname }, userInfo: { username } } = props;
	const [selectedKeys, setSelectedKeys] = useState([])
	const user_name = localStorage.getItem('username') || username

	useEffect(() => {
		const key = pathname.length > 2 ? ('/' + pathname.split('/')[1]) : ['/home']
		setSelectedKeys([key])
	}, [])

	const handleLogout = (e) => {
		e.preventDefault()
		localStorage.clear()
		props.history.replace('/login')
	}

	const MemoMenu = React.memo(() =>
		<Menu className={styles["menu-left"]}
			  mode={"horizontal"}
			  selectedKeys={selectedKeys}>
			{
				menus.filter(menu => user_name ? !menu.auth : true).map(menu =>
					<Menu.Item className={menu.classname} key={menu.key}>
						<Link to={menu.key}>{menu.name}</Link>
					</Menu.Item>
				)
			}
		</Menu>
	)

	const LogoutMenu = (
		<Menu className={styles["menu-left"]}>
			<Menu.Item key={0} className={styles['menu-item']}>
				<a className="ant-dropdown-link" onClick={handleLogout}>
					退出
				</a>
			</Menu.Item>
		</Menu>
	)


	return (
		<nav className={styles.header}>
			<img className={styles.logo} src={Logo} alt=""/>
			<MemoMenu/>
			{
				user_name &&
				<Dropdown overlay={LogoutMenu} className={styles.dropdown}>
					<a className="ant-dropdown-link"
					   onClick={e => e.preventDefault()}
					>
						{user_name}
					</a>
				</Dropdown>
			}

		</nav>
	)
}

Index.propTypes = {}

export default connect(({ global }) => ({
	userInfo: global.userInfo
}))(Index)
