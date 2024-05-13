export function getYearsRange() {
  const currentYear = new Date().getFullYear();
  const yearsRange = [];
  for (let i = currentYear - 10; i <= currentYear + 10; i++) {
    yearsRange.push(i.toString());
  }
  return yearsRange;
}

export const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
