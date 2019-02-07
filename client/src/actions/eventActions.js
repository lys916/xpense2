import axios from 'axios';

export const createEvent = (event, history) => {
	console.log('creating event');
	return (dispatch) => {
		//   dispatch({
		// 	  type: 'CREATING_CUSTOM_FOOD'
		//   });
		axios.post(`/event/create`, event).then(res => {
			console.log('create', res.data);
			dispatch({
				type: 'EVENT_CREATED',
				payload: res.data
			});
			history.push('/events');
		});
	}
}


export const getEvents = () => {
  	return (dispatch) => {
		  // dispatch({type: 'GETTING_DAILY_FOODS'});
		axios.get('/event').then(res => {
			console.log('got events', res.data);
			dispatch({
				type: 'FETCHED_EVENTS',
				payload: res.data
			});
		});
	}
}

// export const getEvents = () => {
// 	axios.get('/event').then(res => {
// 			console.log('got events', res.data);
// 			return {type: 'FETCHED_EVENTS', payload: res.data};
// 		});
	
// }


// // export const signIn = (user) => {
// // 	return (dispatch) => {
// // 		fireAuth.signInWithEmailAndPassword(user.email, user.password)
// // 		.then(function(res){
// // 			localStorage.setItem('user', JSON.stringify(res.user));
// // 			const user = localStorage.getItem('user');
// // 			console.log('local user', user);
// // 			dispatch({
// // 				type: 'LOGGED_IN',
// // 				payload: res.user
// // 			});

// // 		}).catch(function(error) {
// // 		// Handle Errors here.
// // 		var errorCode = error.code;
// // 		var errorMessage = error.message;
// // 		if (errorCode == 'auth/weak-password') {
// // 			alert('The password is too weak.');
// // 		} else {
// // 			alert(errorMessage);
// // 		}
// // 		console.log(error);
// // 		});
// // 	}
// // }

// // export const signOut = (history) => {
// // 	return (dispatch) => {
// // 		fireAuth.signOut().then(function() {
// // 			localStorage.removeItem('user');
// // 			dispatch({ type: 'LOGGED_OUT' });
// // 			history.push('/login');
// // 		 }).catch(function(error) {
// // 			// An error happened.
// // 			alert('Unable to sign out');
// // 			console.log(error);
// // 		});
// // 	}
// //   }
