import React, {useEffect, useState} from 'react'
import {Button, Col, Form, Input, Row, Table} from 'antd'
import styles from './index.scss'
import Request from '../../utils/Request'

let seq = 4;

function Index () {
	const [form] = Form.useForm();
	const [dataSource, setDataSource] = useState([])

	useEffect(() => {
		Request('/mock/menu.json').then(res => {
			if ( res.err_code === 0 ) {
				const { data } = res;
				setDataSource(data)
			}
		})
	}, [])

	const renderNewPizza = () => {
		const labelCol = {
			offset: 2
		}
		return (
			<div className="">
				<h3>添加新的Pizza</h3>
				<Form form={form} className={styles['add-form']}
					  size={'middle'} initialValues={{ size1: 9, size2: 12 }}
					  onFinish={onFinish}>
					<Form.Item
						label={'品种'}
						name="name"
						labelCol={labelCol}
						rules={[{
							required: true,
							message: '请输入品种',
						}]}
					>
						<Input placeholder={'请输入品种'}/>
					</Form.Item>
					<Form.Item
						label={'描述'}
						name="description"
						labelCol={labelCol}
						rules={[{
							required: true,
							message: '请输入描述',
						}]}
					>
						<Input.TextArea type={'textarea'} placeholder={'请输入描述'}/>
					</Form.Item>
					<p><strong>选项1</strong></p>
					<Form.Item
						label={'尺寸'}
						name="size1"
						labelCol={labelCol}
						rules={[{
							required: true,
							message: '请输入尺寸',
						}]}
					>
						<Input type={'number'} placeholder={'尺寸'}/>
					</Form.Item>
					<Form.Item
						label={'价格'}
						name="price1"
						labelCol={labelCol}
						rules={[{
							required: true,
							message: '请输入价格',
						}]}
					>
						<Input type={'number'} placeholder={'价格'}/>
					</Form.Item>
					<p><strong>选项2</strong></p>
					<Form.Item
						label={'尺寸'}
						name="size2"
						labelCol={labelCol}
						rules={[{
							required: true,
							message: '请输入尺寸',
						}]}
					>
						<Input type={'number'} placeholder={'尺寸'}/>
					</Form.Item>
					<Form.Item
						label={'价格'}
						name="price2"
						labelCol={labelCol}
						rules={[{
							required: true,
							message: '请输入价格',
						}]}
					>
						<Input type={'number'} placeholder={'价格'}/>
					</Form.Item>
					<Form.Item>
						<Button className={styles.btn} type={'primary'} htmlType={'submit'}>添加</Button>
					</Form.Item>
				</Form>
			</div>
		)
	}

	const renderMenuTable = () => {
		const columns = [{
			key: 'name',
			title: '品种',
			dataIndex: 'name',
			align: 'center'
		}, {
			key: "action",
			title: '操作',
			align: 'center',
			render: (text, record) => (
				<Button type={"text"} size={"small"} danger onClick={() => handleMenuDelete(record)}>删除</Button>
			)
		}]

		return <Table columns={columns} size={'small'} locale={{ emptyText: '菜品暂无任何商品' }}
					  dataSource={dataSource} pagination={false}/>
	}


	const handleMenuDelete = (el) => {
		setDataSource(data => data.filter(v => v.key !== el.key))
	}

	const onFinish = (values) => {
		const { name, description, size1, price1, size2, price2 } = values;
		const data = {
			key: seq++,
			name,
			description,
			options: [{
				id: seq++,
				size: size1,
				price: price1
			}, {
				id: seq++,
				size: size2,
				price: price2
			}]
		}
		setDataSource(dataSource=>[...dataSource,...[data]])
		form.resetFields()
	}

	return (
		<Row justify={'space-between'}>
			<Col sm={20} md={12}>
				{renderNewPizza()}
			</Col>
			<Col sm={24} md={9}>
				<h3>菜单</h3>
				{renderMenuTable()}
			</Col>
		</Row>
	)
}

export default Index
