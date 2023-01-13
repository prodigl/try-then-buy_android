const formatableDate = (date) => {
  const data = new Date(date).toLocaleString("en-us", {
    //    weekday:'long',
    year: "numeric",
    month: "long",
    day: "numeric",
    //    hour:'2-digit',
    //    minute:'2-digit',
  });

  return data;
};

const dateformat = ({ date }) => {
  return <>{formatableDate(date)}</>;
};

export default dateformat;
