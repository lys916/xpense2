
const userListReducer = (state = [], action) => {
	switch (action.type) {

		case 'FETCHED_USERS':
            return action.payload;

		// case 'EVENT_CREATED':
        //    return [action.payload, ...state];

		// case 'EVENT_DELETED':
		// 	const filterDeleted = state.filter(event=>{
		// 		return event._id !== action.payload._id;
		// 	});
        //    return filterDeleted;
			
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

export default userListReducer;