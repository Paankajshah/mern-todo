import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';


export class TodoList extends Component {

    state = {

        todo : [],
        todoDescription : '',
        todoResponsible : '',
        todoPriority : '',
        todoCompleted : '',
        check: false

    }

    componentDidMount(){
        axios.get('http://localhost:5000/todos/')
            .then(response => {
                // handle success
                this.setState({
                    todo : response.data
                })
                console.log(this.state.todo);
             })
            .catch(function (error) {
            // handle error
            console.log(error);
             })
    }

    componentDidUpdate(prevProps , prevState){

      if(prevState.todo === this.state.todo ){
      axios.get('http://localhost:5000/todos/')
            .then(response => {
                // handle success
                this.setState({
                    todo : response.data
                })
                console.log(this.state.todo);
             })
            .catch(function (error) {
            // handle error
            console.log(error);
             })
            }

      

    }

    deleteHandler =(id) =>{

      axios.delete('http://localhost:5000/todos/' + id )
      .then(response => {
          // handle success
          
          console.log(response);
       })
      .catch(function (error) {
      // handle error
      console.log(error);
       })

       this.setState({
         check : true
       })


    }


    render() {
      console.log('TodoList'  , this.props)

        const { todo } = this.state;

        const rows = todo.map(data =>({
            id : data._id,
            desc : data.todoDescription,
            resp : data.todoResponsible,
            prio : data.todoPrority,
            comp : data.todoCompleted


        }))
        return (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead className ="thead-dark">
                  <tr>
                    <th scope="col">Description</th>
                    <th scope="col">Responsible</th>
                    <th scope="col">Priority</th>
                    <th scope="col">Completed</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>

                  {rows.map((row) => (
                    <tr key={row.id} >
                      <td >{row.desc}</td>
                      <td >{row.resp}</td>
                      <td >{row.prio}</td>
                      <td >{row.comp.toString()}</td>
                      <td ><Link to={{
                                  pathname: '/update',
                                  state: {
                                   _id : row.id,
                                   desc: row.desc,
                                   resp:row.resp,
                                   prio:row.prio,
                                   comp:row.comp

                                  }
                                }} >Edit</Link></td>
                      <td ><button onClick={()=>this.deleteHandler(row.id)}>Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
        )
    }
}

export default TodoList
