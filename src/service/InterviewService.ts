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
          imageUrl: "https://people.hxcode.io/2019/01/02/1546448085-image.jpg",
          published_at: new Date(id * 1000)
        }
      })
    })
  }

  getPage(ids:Array<number>, page:number, size:number): Array<number> {
    return ids.slice(page * size, (page + 1) * size);
  }
}