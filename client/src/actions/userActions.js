import axios from 'axios';

export const signIn = (user, history) => {
	if(user.email !== '' || user.password !== ''){
    console.log('action user logging in', user);
	   return (dispatch) => {
		   dispatch({
		      type: 'LOGGING_IN'
		   });
		   axios.post(`/user/login`, user).then(res => {
		      if(res.data.errorMessage){
               dispatch({
                  type: 'USER_ERROR_MESSAGE',
                  payload: res.data.errorMessage
               });
		      }else{
			      localStorage.setItem('user', JSON.stringify(res.data));
			      dispatch({
              type: 'LOGGED_IN',
              payload: res.data
					  });
            history.push('/transactions');
		  		}
			});
	  	}
	}else{
	  	return({
			type: 'USER_ERROR_MESSAGE',
			payload: 'Please enter username and password.'
	  	});
	}
}

export const signUp = (user, history) => {
   console.log('action user signing up', user);
	if(user.emailPhone !== '' || user.name !== '' || user.password !== ''){
	  	return (dispatch) => {
			dispatch({
		  		type: 'SIGNING_UP'
			});
			axios.post(`/user/signup`, user).then(res => {
				if(res.data.errorMessage){
					dispatch({
						type: 'USER_ERROR_MESSAGE',
						payload: res.data.errorMessage
					});
				}else{
          alert("You have registered, welcome!");

          // if require user to confirm email
          //  alert('User need to confirm');
          //  dispatch({
          //     type: 'TEMP_USER',
          //     payload: res.data
          //  });
          //  history.push('/confirm');
            
          localStorage.setItem('user', JSON.stringify(res.data));
          dispatch({
            type: 'LOGGED_IN',
            payload: res.data
          });
          history.push('/transactions');
				}
			});
	  	}
	}else{
	 	 return({
			type: 'USER_ERROR_MESSAGE',
			payload: 'Please enter username and password.'
	  	});
	}
}

export const getUsers = () => {
  	return (dispatch) => {
		  dispatch({type: 'LOADING', payload: 'Loading users'});
		axios.get('/user').then(res => {
			console.log('got events', res.data);
			dispatch({
				type: 'FETCHED_USERS',
				payload: res.data
			});
		});
	}
}


// export const confirmUser = (user) => {
// 	if(user.emailPhone !== '' || user.name !== '' || user.password !== ''){
// 	  	return (dispatch) => {
// 			dispatch({
// 		  		type: 'SIGNING_UP'
// 			});
// 			axios.post(`user/signup`, user).then(res => {
// 				if(res.data.errorMessage){
// 					dispatch({
// 						type: 'USER_ERROR_MESSAGE',
// 						payload: res.data.errorMessage
// 					});
// 				}else{
//                // alert("You have successfully signed up and logged in.");
//                alert('User need to confirm');
//                      dispatch({
//                         type: 'SIGNED_UP',
//                         payload: res.data
//                      });
                  
//                      // localStorage.setItem('user', JSON.stringify(res.data));
//                      // dispatch({
//                      //    type: 'LOGGED_IN',
//                      //    payload: res.data
//                      // });
                  
					
// 				}
// 			});
// 	  	}
// 	}else{
// 	 	 return({
// 			type: 'USER_ERROR_MESSAGE',
// 			payload: 'Please enter username and password.'
// 	  	});
// 	}
// }

export const signOut = (history) => {
  console.log('user signing out');
	localStorage.removeItem('user');
	return ({ type: 'LOGGED_OUT' });
  history.push('/login');
}