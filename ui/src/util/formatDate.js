import * as df from 'dateformat'

const DATE_FORMAT = 'dd.mm.yyyy HH:MM'

export default function formatDate(date) {
  return df(date, DATE_FORMAT)
} 

