import React, {useMemo, useState,useEffect} from 'react'
import {Button, Col, message, Row, Table} from "antd";
import styles from './index.scss'
import Request from '../../utils/Request'

function Index () {
	const [cart, setCart] = useState([])
	const [dataSource, setDataSource] = useState([])

	useEffect(()=>{
		Request('/mock/menu.json').then(res=>{
			if(res.err_code === 0){
				const {data} = res;
				let dataSource = [];
				data.forEach((item, idx) => {
					dataSource.push({
						size: `${item.name}`,
						key: item.name
					})
					item.options.forEach((ele, index) => {
						dataSource.push({ ...ele, name: item.name, key: idx + '-' + index })
					})
				})
				setDataSource(dataSource)
			}
		})
	},[])


	const totalPrice = useMemo(() => {
		return cart.reduce((prev, curr) => (
			prev += curr.price * curr.count
		), 0)
	}, [cart])

	const renderMenuTable = () => {
		const columns = [{
			title: '尺寸',
			dataIndex: 'size',
			align: 'center',
			width: 100,
			render: (text, record) => {
				if ( record.price ) return <span>{text}</span>
				return {
					children: <strong style={{ textAlign: 'left' }}>{text}</strong>,
					props: {
						colSpan: 2
					}
				}
			}
		}, {
			title: '价格',
			dataIndex: 'price',
			align: 'center',
			width: 100
		}, {
			title: '操作',
			align: 'center',
			width: 120,
			render: (text, record) => {
				const obj = {
					children: <Button type="primary"
									  size={"small"}
									  onClick={() => handleAddBtnClick(record)}
					>添加</Button>,
					props: []
				}
				if ( !record.price ) obj.props.colSpan = 0;
				return obj;
			}
		}]
		return <Table columns={columns} size={'small'} dataSource={dataSource} pagination={false}/>
	}

	const renderCartTable = () => {
		const columns = [{
			key: 'count',
			title: '数量',
			dataIndex: 'count',
			align: 'center',
			width: 140,
			render: (text, record) => (
				<span>
					<Button type={"text"} className={styles['cart-btn']}
							onClick={() => handleDecrease(record)}>-</Button>
					<span>{record.count}</span>
					<Button type={"text"} className={styles['cart-btn']}
							onClick={() => handleIncrease(record)}>+</Button>
				</span>
			)
		}, {
			key: 'name',
			title: '名称',
			align: 'center',
			dataIndex: 'name',
		}, {
			key: 'size',
			title: '尺寸',
			align: 'center',
			dataIndex: 'size',
		},{
			key: 'price',
			title: '价格',
			align: 'center',
			dataIndex: 'price',
		}]
		return <Table columns={columns} size={'small'} locale={{ emptyText: '购物车暂无任何商品' }}
					  dataSource={cart} pagination={false}/>
	}


	const handleAddBtnClick = (el) => {
		let index = cart.findIndex(item => item.id === el.id)

		if ( index > -1 ) {
			cart[index].count++;
			setCart(() => [...cart])
		} else {
			setCart(cart => [...cart, { ...el, count: 1 }])
		}

	}

	const handleDecrease = (el) => {
		let index = cart.findIndex(item => item.id === el.id)
		cart[index].count--;
		setCart(cart.filter(item => item.count > 0))
	}

	const handleIncrease = (el) => {
		let index = cart.findIndex(item => item.id === el.id)
		cart[index].count++
		setCart(() => [...cart])
	}

	const handleSubmitBtnClick = (e) => {
		e.preventDefault()
		message.success('提交成功')
		setCart([])
	}

	return (
		<Row justify={'space-between'}>
			<Col sm={20} md={12}>
				{renderMenuTable()}
			</Col>
			<Col sm={24} md={9}>
				{renderCartTable()}
				<div className={styles.bot}>
					<p className={styles['total-price']}>总价：{totalPrice}</p>
					<Button type={"primary"} size={"small"}
							className={styles['submit-btn']}
							disabled={!(cart.length > 0)}
							onClick={handleSubmitBtnClick}>提交</Button>
				</div>
			</Col>
		</Row>

	)
}

export default Index
