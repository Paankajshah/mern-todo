import React, { Component } from 'react';
import { BrowserRouter as Router , Route , Link } from 'react-router-dom';
import Todo from './Components/TodoList'
import CreateTodo from './Components/CreateTodo'
import UpdateTodo from './Components/UpdateTodo'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';




class App extends Component{

  state ={
  
  }

  render(){
      const styles = {
          textDecoration: 'none' , 
          fontSize:'25px' , 
          color: 'red' , 
          margin: 'auto' ,
          
        }



  return (
   

      <Router >

<div >
      <AppBar position="static">
        <Toolbar>
          <Link to='/'        style={styles}> Todo List</Link>
          <Link to='/create'  style={styles}> Create Todo</Link>
         
        </Toolbar>
      </AppBar>
    </div>

     
          <Route path='/' exact component={Todo} />
          <Route path='/create' component={CreateTodo} />
          <Route path='/update' component={UpdateTodo} />
    

      </Router>

  );
 }

}




export default App;
