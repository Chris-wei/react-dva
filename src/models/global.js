export default {

	namespace: 'global',

	state: {
		userInfo: {
			username: null,
			password: null,
			id: 0
		}
	},

	subscriptions: {
		setup ({ dispatch, history }) {  // eslint-disable-line
		}
	},

	effects: {
		* setUserInfo ({ payload }, { put }) {
			yield put({ type: 'set_user_info', payload })
		}
	},

	reducers: {
		set_user_info (state, { payload }) {
			return { ...state, userInfo: payload }
		}
	}

};
