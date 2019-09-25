import React, {Component} from 'react'
import {connect} from 'react-redux'
import {theUserThunk} from '../store/user'
import EditProfileForm from './EditProfileForm'

class Profiles extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editClicked: false,
      count: 0
    }
    this.editUser = this.editUser.bind(this)
  }
  componentDidMount() {
    let currentState = this.state
    this.setState({...currentState, count: 0})
  }
  editUser() {
    let currentCount = this.state.count
    currentCount++
    if (this.state.count % 2 === 0) {
      this.setState({editClicked: true, count: currentCount})
    } else {
      this.setState({editClicked: false, count: currentCount})
    }
  }

  render() {
    console.log('what the fuck is dis', this.state)
    return (
      <div>
        <p>First Name: {this.props.state.firstName}</p>
        <p>Last Name : {this.props.state.lastName}</p>
        <p>Address : {this.props.state.address}</p>
        <p>Email : {this.props.state.email}</p>
        <hr />
        <hr />
        <button type="submit" onClick={this.editUser}>
          Edit Profile
        </button>
        <div>{!this.state.editClicked ? <br /> : <EditProfileForm />}</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  state: state.user
})

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(theUserThunk())
})

const Profile = connect(mapStateToProps, mapDispatchToProps)(Profiles)

export default Profile
