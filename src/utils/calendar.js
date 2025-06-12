export const addToGoogleCalendar = (title, deadline, description) => {
  const date = new Date(deadline);
  const endDate = new Date(date.getTime() + (24 * 60 * 60 * 1000)); // Add 1 day

  const event = {
    title: `Deadline: ${title}`,
    date: date.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
    details: description,
  };

  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${date.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(event.details)}`;

  window.open(url, '_blank', 'noopener,noreferrer');
};