import axios from "axios";

export interface Interview {
  de: string;
  en: string;
  imageUrl: string;
  published_at: Date;
}

export class InterviewService {

  URL = "https://people.hxcode.io";
  ids:Array<number> | undefined = undefined;

  getIds(): Promise<Array<number>> {
    if (this.ids !== undefined) {
      console.log("Return ids from cache")
      return Promise.resolve(this.ids);
    }
    return axios.get(this.URL + '/ids.json').then((response: any) => {
      this.ids = response.data;
      if (this.ids !== undefined) return this.ids;
      throw new Error("No ids found");
    });
  }

  getInterviews(page:number, size:number = 25): Promise<Array<Interview>> {
    return this.getIds().then((ids:Array<number>) => {
      const pageIds = this.getPage(ids, page, size);
      return pageIds.map((id:number) => {
        return {
          de: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
          en: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
          imageUrl: this.getImageUrl(id),
          published_at: new Date(id * 1000)
        }
      })
    })
  }

  getPage(ids:Array<number>, page:number, size:number): Array<number> {
    return ids.slice(page * size, (page + 1) * size);
  }

  getImageUrl(id: number): string {
    const date = new Date(id * 1000);
    return `${this.URL}/${date.getFullYear()}/${this.formatNumber(date.getMonth() + 1)}/${this.formatNumber(date.getDate())}/${id}-image.jpg`;
  }

  formatNumber(n:number): string {
    return n.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })
  }
}