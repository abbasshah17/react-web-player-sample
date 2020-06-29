import React from 'react';
import { View } from 'react-native';
import { Link } from 'react-router-dom';

class HomePageComponent extends React.PureComponent{

   state = {
      isMuted: true,
      autoPlay: false
   }

   onSwitchMuted = () => this.setState ({
      isMuted: !this.state.isMuted
   });

   componentDidMount() {
  }

   render(){
      return(
         <View>
            <Link
               to='/next'
               title='Click'
               style={{fontSize: 48}}>
                  Clicked
            </Link>
         </View>
      );
   }
}
export default HomePageComponent;