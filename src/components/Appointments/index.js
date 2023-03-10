// Write your code here

import {Component} from 'react'

import './index.css'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {title: '', date: '', appointmentsList: [], status: false}

  updateTitle = event => {
    this.setState({title: event.target.value})
  }

  updateDate = event => {
    this.setState({date: event.target.value})
  }

  updateAppointmentList = event => {
    event.preventDefault()
    const {title, date} = this.state

    if (title && date) {
      const newAppointment = {
        id: uuidv4(),
        title,
        date: new Date(date),
        isStarred: false,
      }
      this.setState(prevState => ({
        appointmentsList: [...prevState.appointmentsList, newAppointment],
      }))
    }

    if (title && date) {
      this.setState({title: '', date: '', status: false})
    } else {
      this.setState({title: '', date: ''})
    }
  }

  changeIsStarred = id => {
    const {appointmentsList, status} = this.state

    if (!status) {
      const newAppointmentsList = appointmentsList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return {...eachItem}
      })

      this.setState({appointmentsList: newAppointmentsList})
    }
  }

  changeToStarredAndUnStarredList = () => {
    this.setState(prevState => ({status: !prevState.status}))
  }

  render() {
    const {title, date, appointmentsList, status} = this.state
    console.log(title, date)
    let newList = []
    if (status) {
      newList = appointmentsList.filter(
        eachItem => eachItem.isStarred === status,
      )
    } else {
      newList = appointmentsList
    }

    const bgColor = status ? 'bg-star' : ''

    return (
      <div className="main-container">
        <div className="appointment-booking-box">
          <div>
            <h1 className="heading">Add Appointment</h1>
            <form onSubmit={this.updateAppointmentList} className="form-box">
              <label htmlFor="title" className="title">
                TITLE
              </label>

              <input
                id="title"
                type="text"
                value={title}
                placeholder="Title"
                className="input-title-box"
                onChange={this.updateTitle}
              />
              <br />
              <label htmlFor="date" className="date">
                DATE
              </label>

              <input
                id="date"
                type="date"
                value={date}
                className="date-input-box"
                onChange={this.updateDate}
              />

              <button type="submit" className="submit-btn">
                Add
              </button>
            </form>
          </div>
          <div className="appointments-img">
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-theme-img"
            />
          </div>
        </div>
        <div className="appointment-details-box">
          <div className="appointment-starred-container">
            <h1 className="appointments-name">Appointments</h1>
            <button
              type="button"
              className={`starred-btn ${bgColor}`}
              onClick={this.changeToStarredAndUnStarredList}
            >
              Starred
            </button>
          </div>
          <ul className="list-container">
            {newList.map(eachItem => (
              <AppointmentItem
                key={eachItem.id}
                appointmentsList={eachItem}
                changeIsStarred={this.changeIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
