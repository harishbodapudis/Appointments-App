// Write your code here

import './index.css'
import {format} from 'date-fns'

const AppointmentItem = props => {
  const {appointmentsList, changeIsStarred} = props
  const {id, title, date, isStarred} = appointmentsList

  const updatedIsStarred = () => {
    changeIsStarred(id)
  }

  const starredImg = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="appointments-data">
      <div className="title-starred">
        <p className="appointment-title">{title}</p>
        <button type="button" className="star-btn" onClick={updatedIsStarred}>
          <img src={starredImg} alt="star" className="star-img" />
        </button>
      </div>
      <p className="date-data">Date: {format(date, 'dd MMMM yyyy, EEEE')}</p>
    </li>
  )
}

export default AppointmentItem
