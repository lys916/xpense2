// import React, { Component } from 'react';
// import Camera from 'react-html5-camera-photo';
// import 'react-html5-camera-photo/build/css/index.css';
 
// class CameraCom extends Component {

//     state = {
//         image: null
//     }

//   onTakePhoto (dataUri) {
//     // Do stuff with the dataUri photo...
//     console.log('takePhoto', dataUri);
//     this.setState({image: dataUri});
//   }
 
//   render () {
//     return (
//       <div className="App">
//         {this.state.image ? 
//         <div>
//             <div><img src={this.state.image} /></div>
//             <button>Cancel</button>
//             <button onClick={()=>{this.props.acceptPhoto(this.state.image)}}>Ok</button>
//         </div> : 
//         <Camera
//           onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
//         />}
        
//       </div>
//     );
//   }
// }
 
// export default CameraCom;