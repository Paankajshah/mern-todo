import React, { Component } from 'react'
import {TextField , Button , Radio ,FormLabel , FormControlLabel , RadioGroup  , Checkbox} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import axios from 'axios';


export class UpdateTodo extends Component {

    state={
        todoDescription : '',
        todoResponsible : '',
        todoPriority : '',
        todoCompleted : false,
        

    }

    componentDidMount(){
        if(this.props.location.state !== undefined){
        this.setState({
            todoDescription : this.props.location.state.desc,
            todoResponsible : this.props.location.state.resp,
            todoPriority : this.props.location.state.prio,
            todoCompleted : this.props.location.state.comp,
        })
    }
    console.log('triggered')
    }

    descriptionHandler=(event)=>{
        event.preventDefault()
        this.setState({
            todoDescription: event.target.value
        })
        console.log(this.state.todoDescription)
    }
    resposibleHandler=(event)=>{
        event.preventDefault()
        this.setState({
            todoResponsible: event.target.value
        })
        console.log(this.state.todoResponsible)
    }
    handleChange=(event)=>{
        event.preventDefault()
        console.log(event.target.value)

        this.setState({
            todoPriority: event.target.value
        })
        console.log(this.state.todoPriority)
    }
    handleChecked=(event)=>{
        event.preventDefault()
        console.log(event.target.checked)

        this.setState({
            todoCompleted: event.target.checked
        })
        console.log(this.state.todoCompleted)
    }
    completedHandler=(event)=>{
        event.preventDefault()
        this.setState({
            todoCompleted: false
        })
        console.log(this.state.todoCompleted)
    }

    submitHandler =()=>{
        const newData =  {

            description : this.state.todoDescription,
            responsible : this.state.todoResponsible,
            priority : this.state.todoPriority,
            completed : this.state.todoCompleted
            

        }

        console.log(newData)

        axios.put('http://localhost:5000/todos/' + this.props.location.state._id , newData)
            .then(res =>{
                console.log(res)
            })
            .catch(err=>{
                console.log(err)
            })

            this.props.history.goBack();
    }
    render() {
        console.log(this.props)

        const styles ={
            margin:'auto' , 
            width:'500px'

        }
        return (
            <div  style={{margin:' 0 auto' , width:'500px'}}>
                <h1>UpdateTodo</h1>
                <form  noValidate autoComplete="off" >
                    <TextField id="standard-basic" label="Description" style={styles} value={this.state.todoDescription}  onChange={this.descriptionHandler}/>
                    <br/>
                    
                    <TextField id="standard-basic"  style={styles} label="Responsible" value={this.state.todoResponsible} onChange={this.resposibleHandler} />
                    <br/>
                    <br/>
                   
                    <div>
                        <RadioGroup row aria-label="position" name="position" defaultValue="top">
                            <FormControlLabel
                            value="top"
                            control={<Radio 
                                color="primary"
                                checked={this.state.todoPriority === 'low'}
                                onChange={this.handleChange}
                                value='low' />}
                            label="Low"
                            labelPlacement="start"
                            />
                            <FormControlLabel
                            value="start"
                            control={<Radio 
                                color="primary"
                                checked={this.state.todoPriority === 'medium'}
                                onChange={this.handleChange}
                                value='medium' />}
                            label="Meduim"
                            labelPlacement="start"
                            />
                            <FormControlLabel
                            value="bottom"
                            control={<Radio 
                                color="primary"
                                checked={this.state.todoPriority === 'high'}
                                onChange={this.handleChange}
                                value='high' />}
                            label="High"
                            labelPlacement="start"
                            />
                        </RadioGroup>
                             
                    </div>
                    <FormControlLabel
                        control={
                        <Checkbox
                            checked={this.state.todoCompleted}
                            onChange={this.handleChecked}
                            name="Completed"
                            color="primary"
                        />
                    }
                    label="Completed"
                  />
                    <br/>
                    
                    <Button variant="contained" color="primary" onClick={this.submitHandler}>
                        Submit
                    </Button>
                </form>
            </div>
        )
    }
}

export default UpdateTodo
