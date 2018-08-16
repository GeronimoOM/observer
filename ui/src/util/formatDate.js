import * as df from 'dateformat'

const DATE_FORMAT = 'mm.dd.yyyy hh:MM'

export default function formatDate(date) {
  return df(date, DATE_FORMAT)
} 

