const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export function getDatabaseDate(displayDate) {
  const cleanDate = displayDate.trim();
  let day;
  let month;
  let year;

  if (/^\d{4}-\d{2}-\d{2}$/.test(cleanDate)) {
    [year, month, day] = cleanDate.split('-').map(Number);
  } else {
    const parts = cleanDate.split('/').map((part) => part.trim());
    if (parts.length !== 3) {
      return null;
    }
    [day, month, year] = parts.map(Number);
  }

  const date = new Date(year, month - 1, day);
  const isRealDate =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;

  if (!isRealDate) {
    return null;
  }

  const savedMonth = String(month).padStart(2, '0');
  const savedDay = String(day).padStart(2, '0');
  return `${year}-${savedMonth}-${savedDay}`;
}

export function getDisplayDate(databaseDate) {
  if (!databaseDate) {
    return '';
  }

  const [year, month, day] = databaseDate.split('-').map(Number);
  return `${String(day).padStart(2, '0')} / ${String(month).padStart(2, '0')} / ${year}`;
}

export function getCardDate(databaseDate) {
  if (!databaseDate) {
    return '';
  }

  const [year, month, day] = databaseDate.split('-').map(Number);
  return `${String(day).padStart(2, '0')} ${monthNames[month - 1]} ${year}`;
}

export function getDaysLeft(databaseDate) {
  const [year, month, day] = databaseDate.split('-').map(Number);
  const expiryDate = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const oneDay = 1000 * 60 * 60 * 24;
  return Math.round((expiryDate.getTime() - today.getTime()) / oneDay);
}

export function getTodayDatabaseDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
