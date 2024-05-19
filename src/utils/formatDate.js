export const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(dateObj);
  };