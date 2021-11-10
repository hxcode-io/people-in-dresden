import axios from "axios";

export interface Interview {
  de: string;
  en: string;
  imageUrl: string;
  published_at: Date;
}

export class InterviewService {

  URL = "https://people.hxcode.io";
  ids:Array<number> | undefined = undefined; // Cache ids

  getIds(): Promise<Array<number>> {
    if (this.ids !== undefined) {
      return Promise.resolve(this.ids);
    }
    return axios.get(this.URL + '/ids.json').then(response => {
      if (response.data != undefined) {
        this.ids = (response.data as Array<number>).sort((id1: number, id2: number) => id2 - id1); // Cache
        return this.ids;
      }
      throw new Error("No ids found");
    });
  }

  getInterviews(page:number, size:number = 25): Promise<Array<Interview>> {
    return this.getIds().then((ids:Array<number>) =>
      Promise.all(this.getPage(ids, page, size).map((id:number) => this.loadInterview(id)))
    )
  }

  getMaxPage(size:number = 25): Promise<number> {
    return this.getIds().then((ids:Array<number>) =>
      Math.ceil(ids.length / size)
    )
  }

  getPage(ids:Array<number>, page:number, size:number): Array<number> {
    return ids.slice(page * size, (page + 1) * size);
  }

  loadInterview(id: number): Promise<Interview> {
    return axios.get(this.getInterviewUrl(id)).then(response => {
      return {
        de: response.data.de,
        en: response.data.en,
        imageUrl: this.getImageUrl(id),
        published_at: new Date(id * 1000)
      }
    });
  }

  getImageUrl(id: number): string {
    return `${this.getInterviewBaseUrl(id)}/${id}-image.jpg`;
  }

  getInterviewUrl(id: number): string {
    return `${this.getInterviewBaseUrl(id)}/${id}-interview.json`;
  }

  getInterviewBaseUrl(id: number): string {
    const date = new Date(id * 1000);
    return `${this.URL}/${date.getFullYear()}/${this.formatNumber(date.getMonth() + 1)}/${this.formatNumber(date.getDate())}`;
  }

  formatNumber(n:number): string {
    return n.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })
  }

}