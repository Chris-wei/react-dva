import React from 'react'
import {connect} from "dva";
import styles from './index.scss'

function Index (props) {
	return (
		<div className={styles.home}>
			<div className={styles.background}>
				<h1>欢迎大家来到米斯特吴Pizza</h1>
				<h2>这里有大家喜欢的Pizza和小吃!</h2>
				<p>{props.text}</p>
			</div>
		</div>
	)
}

export default connect(({ home }) => ({ ...home }))(Index)
