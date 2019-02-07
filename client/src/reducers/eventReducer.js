
const eventReducer = (state = [], action) => {
	switch (action.type) {

		case 'FETCHED_EVENTS':
            return action.payload;

		case 'EVENT_CREATED':
           return [action.payload, ...state];
			
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

		default:
			return state;
	}
};

export default eventReducer;