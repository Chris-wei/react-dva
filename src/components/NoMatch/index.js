import React from 'react'

export default function NoMatch (props) {
	const {status} = props;

	return <div>{status}，please confirm your url is correct!</div>
}
