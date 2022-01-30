export const stringToDate = (unixString) => {
    const unixTime = parseInt(unixString);
    let date = new Date(unixTime)  
    date = convertToLocalDate(date)
    return date
  }

 export const convertToLocalDate = (timestamp) => {
    const localTimestamp = convertUTCDateToLocalDate(new Date(timestamp))
    
    let dayOptions = { month: 'short', day: 'numeric', year: 'numeric'};
    const day = localTimestamp.toLocaleString('us-EN', dayOptions);
    
    let timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    const time = localTimestamp.toLocaleString('us-EN', timeOptions);
    return (time + " - " + day)  
    
  }

  function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;   
}
  