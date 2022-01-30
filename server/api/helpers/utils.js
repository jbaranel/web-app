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

export const sortDates = (array) => {
  array.sort(function(a, b) {    
    return new Date(b.created_at) - new Date(a.created_at);
  });
  return array
}

export const getCurrentTimestamp = () => {
  const date = new Date()
  const timestamp = date.toISOString().slice(0, 19).replace('T', ' ');
  return timestamp
}

export const getLocalTime = (timestamp) => {
  return timestamp
}