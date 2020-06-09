import React, {useState} from 'react'
import {Button, Form, Input,message} from 'antd';
import styles from './index.scss'
import Logo from '../../../assets/logo.png'
import Loading from '../../../components/Loading'

function Index (props) {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false)

	const onFinish = values => {
		// const { usename, password } = values;

		setLoading(true)

		setTimeout(() => {
			setLoading(false)
			message.success('注册成功')
			props.history.push('/login')
		}, 1000)

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
						},
						{
							min: 6,
							message: '密码长度最少6位'
						}
					]}
				>
					<Input type={'password'} placeholder={'请输入密码'}/>
				</Form.Item>
				<Form.Item
					label={'确认密码'}
					name="confirm"
					dependencies={['password']}
					rules={[
						{
							required: true,
							message: '确认密码',
						},
						({ getFieldValue }) => ({
							validator (rule, value) {
								if ( !value || getFieldValue('password') === value ) {
									return Promise.resolve();
								}
								return Promise.reject('两次密码不一致');
							}
						})
					]}
				>
					<Input type={'password'} placeholder={'确认密码'}/>
				</Form.Item>
				<Form.Item>
					<Button htmlType="submit" className={styles.btn} type={'primary'}>注册</Button>
				</Form.Item>
			</Form>
			<Loading loading={loading}/>
		</div>
	)
}

export default Index
