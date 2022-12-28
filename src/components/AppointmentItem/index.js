// Write your code here

import './index.css'

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
    <div className="appointments-data">
      <div className="title-starred">
        <p className="appointment-title">{title}</p>
        <button
          type="button"
          className="star-btn"
          onClick={updatedIsStarred}
          testid="star"
        >
          <img src={starredImg} alt="star" className="star-img" />
        </button>
      </div>
      <p className="date-data">Date: {date}</p>
    </div>
  )
}

export default AppointmentItem
