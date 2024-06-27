export const dateFormat = (dateStr) => {
    // Split the input date string
  const [day, month, year] = dateStr.split('-');
  // Create a Date object
  const date = new Date(`${year}-${month}-${day}`);
  // Format the Date object to the desired output format
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-GB', options);

  return formattedDate;
} 