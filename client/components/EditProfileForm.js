import React, {Component} from 'react'
import {connect} from 'react-redux'
import {theUserThunk} from '../store/user'

class EditProfileForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: this.props.state.firstName,
      lastName: this.props.state.lastName,
      address: this.props.state.address,
      email: this.props.state.email
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    event.preventDefault()
    let currentState = this.state
    this.setState({...currentState, [event.target.name]: event.target.value})
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.editUser(this.state)
  }

  render() {
    console.log(this.state)
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
          />
        </label>

        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
          />
        </label>

        <label>
          Address:
          <input
            type="text"
            name="address"
            value={this.state.address}
            onChange={this.handleChange}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </label>

        <button type="submit">Submit Updates</button>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  state: state.user
})

const mapDispatchtToProps = dispatch => ({
  editUser: payload => dispatch(theUserThunk(payload))
})

export default connect(mapStateToProps, mapDispatchtToProps)(EditProfileForm)
