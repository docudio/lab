import { parseISO, format } from 'date-fns'
import React from 'react'

export default function DateFormatter (props) {
  const date = parseISO(props.dateString)
  return <time dateTime={props.dateString}>{format(date, 'LLLL	d, yyyy')}</time>
}
