
export default function useDateTimeFormat(timestamp) {
  const date = new Date(timestamp);
  const language = 'es-ES';

  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  return new Intl.DateTimeFormat(language, options).format(date);
}
