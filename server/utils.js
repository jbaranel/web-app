export const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

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

export const sortDates = (dates) => {
  dates.sort(function(a, b) {
    var keyA = new Date(a.updated_at),
      keyB = new Date(b.updated_at);
    // Compare the 2 dates
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });
  return dates
}