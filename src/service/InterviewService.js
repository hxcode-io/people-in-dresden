import axios from "axios";

export class InterviewService {

  URL = "https://people.hxcode.io";
  ids = undefined; // Cache ids

  getIds() {
    if (this.ids !== undefined) {
      return Promise.resolve(this.ids);
    }
    return axios.get(this.URL + '/ids.json').then(response => {
      if (response.data != undefined) {
        this.ids = response.data.sort((id1, id2) => id2 - id1); // Cache
        return this.ids;
      }
      throw new Error("No ids found");
    });
  }

  getInterviews(page, size = 25) {
    console.log("Get interviews, page ", page);
    return this.getIds().then((ids) =>
      Promise.all(this.getPage(ids, page, size).map((id) => this.loadInterview(id)))
    )
  }

  getMaxPage(size = 25) {
    return this.getIds().then((ids) =>
      Math.ceil(ids.length / size)
    )
  }

  getPage(ids, page, size) {
    // console.log("getPage", ids.length, page, size);
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