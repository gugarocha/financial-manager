import dayjs from "dayjs";

export default function getCollectionName(datetime) {
  if(!dayjs(datetime).isValid()) {
    datetime = datetime.seconds * 1000;
  };

  return dayjs(datetime).format('YYYY-MMMM');
};