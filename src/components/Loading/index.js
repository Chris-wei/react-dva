import {Spin} from "antd";
import React from "react";
import styles from './index.scss'

function Index (props) {
	const { loading } = props
	return <>
		{
			loading ?
				<div className={styles.spin}>
					<Spin tip="提交中..." spinning={true} wrapperClassName={'login-box'}/>
				</div> : null
		}
	</>
}

export default Index
