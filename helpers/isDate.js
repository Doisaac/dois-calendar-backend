import moment from 'moment'

export const isDate = (value) => {
  if (!value) {
    return false
  }

  const date = moment(value, 'MM-DD-YYYY')

  if (date.isValid()) {
    return true
  } else {
    return false
  }
}
