import React from "react";
import axios from "axios";


class CreateUser extends React.Component{
    constructor(props) {
        super();

        this.state = {
            username: ""
        };
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }


    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username
        }

        console.log(user);

        axios.post('http://localhost:5000/users/add',user)
            .then(res => console.log(res.data));

        this.setState({
            username: ""
        });
    }
    render() {
        return (
          <div>
              <h3> Create New User</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Username: </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Create User"
                />
              </div>
            </form>
          </div>
        );
    }
}


export default CreateUser;