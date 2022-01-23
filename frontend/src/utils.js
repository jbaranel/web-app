export const stringToDate = (unixString) => {
    const unixTime = parseInt(unixString);
    let date = new Date(unixTime)  
    date = convertToLocalDate(date)
    return date
  }

  const convertToLocalDate = (date) => {
    let dayOptions = { month: 'short', day: 'numeric', year: 'numeric'};
    const day = date.toLocaleString('us-EN', dayOptions);
  
    let timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    const time = date.toLocaleString('us-EN', timeOptions);
    return (time + " " + day)  
  }
  