import React from 'react';
import HomePageComponent from './screens/HomePageComponent';
import NextPageComponent from './screens/NextPageComponent';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

class App extends React.PureComponent{

   render(){
      return(
         <BrowserRouter>
            <Switch>
               <Route exact path="/" render={(props) => (<HomePageComponent {...props}/>)} />
               <Route exact path="/next" render={(props) => (<NextPageComponent {...props}/>)} />
            </Switch>
         </BrowserRouter>
      );
   }
}
export default App;