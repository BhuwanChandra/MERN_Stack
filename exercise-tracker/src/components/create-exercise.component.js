import React from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

class CreateExercise extends React.Component{
  constructor(props){
    super();

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: []
    };
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    axios.get('http://localhost:5000/users/')
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            users: res.data.map(user => user.username),
            username: res.data[0].username
          });
        }
      })
  };

  onChangeUsername(e){
    this.setState({
      username: e.target.value
    });
  }

  onChangeDescription(e){
    this.setState({
      description: e.target.value
    });
  }

  onChangeDuration(e){
    this.setState({
      duration: e.target.value
    });
  }

  onChangeDate(date){
    this.setState({
      date: date
    });
  }

  onSubmit(e){
    e.preventDefault();
    
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    }

    window.location = '/';

    axios.post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data));

    console.log(exercise);
  }

  render() {
    return (
      <div>
        <h3> Create New Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              ref="userInput"
              required
              value={this.state.username}
              className="form-control"
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(user => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Duration: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
          <br />
          <div className="form-group">
            <input
              type="submit"
              className="btn btn-primary"
              value="Create Exercise Log"
            />
          </div>
        </form>
      </div>
    );
  }
}


export default CreateExercise;