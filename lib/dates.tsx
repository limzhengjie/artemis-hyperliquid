export const getISOStringWithoutTime = (date: Date) => {
  if (isNaN(date.getTime())) {
    return undefined
  }
  return date.toISOString().split('T')[0]
}

export const getCurrentDate = () => {
  let date = new Date()
  return getISOStringWithoutTime(date)
}

export const getStartDate = (daysBack: number) => {
  let startDate = new Date()
  startDate.setDate(startDate.getDate() - daysBack)
  return getISOStringWithoutTime(startDate)
}
