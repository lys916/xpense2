
const eventReducer = (state = [], action) => {
	switch (action.type) {

		case 'FETCHED_TRANSACTIONS':
            return action.payload;

		case 'TRANSACTION_CREATED':
           return [action.payload, ...state];

		case 'TRANSACTION_DELETED':
			const filterDeleted = state.filter(tran=>{
				return tran._id !== action.payload._id;
			});
           return filterDeleted;
			
		// case "REMOVE_FROM_CART":
		// 	const removeItem = state.filter(item=>{
		// 		return item.id !== action.payload
		// 	});
		// 	localStorage.setItem('cart', JSON.stringify(removeItem));
		// 	return removeItem;

		// case 'ORDER_MADE':
		// 	console.log(action.payload);
		// 	localStorage.removeItem('cart');
		// 	return [];

		case 'LOGGED_OUT':
		return [];


		default:
			return state;
	}
};

export default eventReducer;