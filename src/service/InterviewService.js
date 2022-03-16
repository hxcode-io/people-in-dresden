import axios from "axios";

export class InterviewService {

  URL = "https://people.hxcode.io";

  getIds(yearsFilter, monthsFilter) {
    console.log("Start fetching Ids with axios");
    return axios.get(this.URL + '/ids.json').then(response => {
      if (response.data !== undefined) {
        console.log("Response data length", response.data.length);
        let ids = this.filterIds(response.data, yearsFilter, monthsFilter);
        ids = ids.sort((id1, id2) => id2 - id1);
        console.log("Sort ids finished", ids.length);
        return ids;
      }
      throw new Error("No ids found");
    });
  }

  getInterviews(page, size = 25, ids) {
    console.log("Get interviews, page ", page);
    return Promise.all(this.getPage(ids, page, size).map((id) => this.loadInterview(id)))
  }

  filterIds(ids, yearsFilter, monthFilter) {
    console.log("Filter ids ", yearsFilter, monthFilter);
    if (yearsFilter.length === 0 && monthFilter.length === 0) return ids;
    return ids.filter(id => {
      const date = new Date(id * 1000);
      if (yearsFilter.length > 0) {
        if (yearsFilter.find(year => year === date.getFullYear()) === undefined) return false;
      }
      if (monthFilter.length > 0) {
        if (monthFilter.find(month => month === date.getMonth()) === undefined) return false;
      }
      return true
    });
  }

  getPage(ids, page, size) {
    return ids.slice(page * size, (page + 1) * size);
  }

  loadInterview(id) {
    return axios.get(this.getInterviewUrl(id)).then(response => {
      return {
        id: id,
        de: response.data.de,
        en: response.data.en,
        imageUrl: this.getImageUrl(id),
        published_at: new Date(id * 1000)
      }
    });
  }

  getImageUrl(id) {
    return `${this.getInterviewBaseUrl(id)}/${id}-image.jpg`;
  }

  getInterviewUrl(id) {
    return `${this.getInterviewBaseUrl(id)}/${id}-interview.json`;
  }

  getInterviewBaseUrl(id) {
    const date = new Date(id * 1000);
    return `${this.URL}/${date.getFullYear()}/${this.formatNumber(date.getMonth() + 1)}/${this.formatNumber(date.getDate())}`;
  }

  formatNumber(n) {
    return n.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })
  }

}