import React, {useState} from 'react'
import {connect} from "dva";
import {Button, Form, Input, message} from 'antd';
import styles from './index.scss'
import Loading from '../../../components/Loading'
import Logo from '../../../assets/logo.png'

function Index (props) {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false)

	const onFinish = values => {
		const { username, password } = values;

		if ( username === 'chris' && password === '123568a' ) {
			setLoading(true)
			setTimeout(() => {
				setLoading(false)
				message.success('登录成功')
				props.dispatch({
					type: 'global/setUserInfo',
					payload: {
						username,
						password,
						id: 1
					}
				}).then(() => {
					localStorage.setItem('username', username)
					props.history.replace('/home')
				})
			}, 1000)
		} else {
			return message.warn('帐号或密码错误')
		}
	}

	return (
		<div className={styles['login-box']}>
			<img className={styles.logo} src={Logo} alt=""/>
			<Form form={form} className={styles['account-form']}
				  size={'middle'} onFinish={onFinish}>
				<Form.Item
					label={'用户名'}
					name="username"
					rules={[
						{
							required: true,
							message: '请输入用户名',
						}
					]}
				>
					<Input type={'text'} placeholder={'请输入用户名'}/>
				</Form.Item>
				<Form.Item
					label={'密码'}
					name="password"
					rules={[
						{
							required: true,
							message: '请输入密码',
						}
					]}
				>
					<Input type={'password'} placeholder={'请输入密码'}/>
				</Form.Item>
				<Form.Item>
					<Button className={styles.btn} type={'primary'} htmlType={'submit'}>登录</Button>
				</Form.Item>
			</Form>
			<Loading loading={loading}/>
		</div>
	)
}

export default connect()(Index)
