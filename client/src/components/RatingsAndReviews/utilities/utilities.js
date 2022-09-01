const utils = {
  ATELIER_API: "https://app-hrsei-api.herokuapp.com/api/fec2/rfp",

  getAvgReviewValue: (meta) => {
    let statsObj = {};
    statsObj.starTotal = 0;
    statsObj.voteTotal = 0;
    for (let [star, count] of Object.entries(meta.ratings)) {
      statsObj.starTotal += star * count;
      statsObj.voteTotal += Number(count);
    }
    return statsObj;
  },

  getFormattedDate: (messyDate) => {
    let dateOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    };
    //date constructor to apply dateOptions
    let date = new Date(messyDate).toLocaleDateString("en-US", dateOptions);
    //removing weekday from date
    let formattedDate = date.split(", ").slice(1).join(", ");
    return formattedDate;
  },
};

export default utils;
