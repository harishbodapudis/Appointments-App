// Write your code here

import {Component} from 'react'

import './index.css'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {title: '', date: '', appointmentsList: [], status: false}

  updateTitle = event => {
    this.setState({title: event.target.value})
  }

  updateDate = event => {
    this.setState({date: new Date(event.target.value)})
  }

  updateAppointmentList = event => {
    event.preventDefault()
    const {title, date} = this.state

    if ((title, date)) {
      const newAppointment = {
        id: uuidv4(),
        title,
        date: format(date, 'dd MMMM yyyy, EEEE'),
        isStarred: false,
      }
      this.setState(prevState => ({
        appointmentsList: [...prevState.appointmentsList, newAppointment],
      }))
    }

    this.setState({title: '', date: ''})
  }

  changeIsStarred = id => {
    const {appointmentsList} = this.state
    const newAppointmentsList = appointmentsList.map(eachItem => {
      if (id === eachItem.id) {
        return {...eachItem, isStarred: !eachItem.isStarred}
      }
      return {...eachItem}
    })

    this.setState({appointmentsList: newAppointmentsList})
  }

  changeToStarredAndUnStarredList = () => {
    this.setState(prevState => ({status: !prevState.status}))
  }

  render() {
    const {title, date, appointmentsList, status} = this.state

    const starredList = appointmentsList.filter(
      eachItem => eachItem.isStarred === status,
    )
    const bgColor = status ? 'bg-star' : ''

    return (
      <div className="main-container">
        <div className="appointment-booking-box">
          <div>
            <h1 className="heading">Add Appointment</h1>
            <form onSubmit={this.updateAppointmentList} className="form-box">
              <label htmlFor="title" className="title">
                Title
              </label>

              <input
                name="title"
                type="text"
                placeholder="Title"
                className="input-title-box"
                value={title}
                onChange={this.updateTitle}
              />
              <br />
              <label htmlFor="date" className="date">
                Date
              </label>

              <input
                name="date"
                type="date"
                className="date-input-box"
                value={date}
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
            {status
              ? starredList.map(eachItem => (
                  <li className="list-item">
                    <AppointmentItem
                      key={eachItem.id}
                      appointmentsList={eachItem}
                      changeIsStarred={this.changeIsStarred}
                    />
                  </li>
                ))
              : appointmentsList.map(eachItem => (
                  <li className="list-item">
                    <AppointmentItem
                      key={eachItem.id}
                      appointmentsList={eachItem}
                      changeIsStarred={this.changeIsStarred}
                    />
                  </li>
                ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
