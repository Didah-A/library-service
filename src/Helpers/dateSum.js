const addDays = (dateObj, numDays) => {
    dateObj.setDate(dateObj.getDate() + numDays);
    return dateObj;
 }

 module.exports = addDays;