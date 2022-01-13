import moment from "moment";

const dateFormatter = {
  formatDateToHuman: function (date: string): string {
    return moment(date).format("dd/MM/YYYY");
  },

  getHourFromStringDateTime: function (datetime: string): string {
    return moment(datetime).format("HH:mm");
  },
  getHourFromDateTime: function (datetime: Moment): string {
    return datetime.format("HH:mm");
  },
  addSecondsToStringDateTime: function (
    datetime: string,
    seconds: number
  ): Moment {
    return moment(datetime).add(seconds, "seconds");
  },
  dateToTextFormat: function (date: string): string {
    return moment(date).format("Do MMMM YYYY");
  },
};

export default dateFormatter;
