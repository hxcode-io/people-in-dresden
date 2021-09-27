import json from '../posts_1.json';

export interface PostText {
  de: string;
  en: string;
}

export interface Post {
  imgSrc: string;
  text: PostText;
  published_at: Date;
}

export class PostService {

  getPosts(): Array<Post> {
    return (json as Array<object>).map((jsonPost: any) => {
      return {
        imgSrc: this.extractImageSrc(jsonPost),
        text: this.extractText(jsonPost),
        published_at: new Date(jsonPost.timestamp * 1000)
      }
    });
  }

  private extractImageSrc(jsonPost: any): string {
    const uri = jsonPost.attachments[0].data[0].media.uri;
    return "/images/" + uri.slice(uri.lastIndexOf("/")).slice(1)
  }

  private extractText(jsonPost: any): PostText {
    const text = this.decodeText(jsonPost.data[0].post as string);
    return {
      de: text.slice(0, text.indexOf("\n--\n")),
      en: text.slice(text.indexOf("\n--\n") + 4)
    }
  }

  private decodeText(text: string): string {
    let textDecode = text.replaceAll("\u00c3\u00a4", "ä")
    textDecode = textDecode.replaceAll("\u00c3\u00bc", "ü")
    textDecode = textDecode.replaceAll("\u00c3\u00b6", "ö")
    textDecode = textDecode.replaceAll("\u00e2\u0080\u0099", "'")
    textDecode = textDecode.replaceAll("\u00e2\u0080\u0093", "–")
    textDecode = textDecode.replaceAll("\u00c3\u009f", "ß")
    textDecode = textDecode.replaceAll("\u00c3\u009c", "Ü")
    textDecode = textDecode.replaceAll("\u00c3\u0084", "Ä")
    textDecode = textDecode.replaceAll("\u00c3\u00a9", "é")
    textDecode = textDecode.replaceAll("\u00e2\u0080\u009d", "“")
    textDecode = textDecode.replaceAll("\u00e2\u0080\u009c", "”")
    textDecode = textDecode.replaceAll("\u00e2\u0080\u009e", "„")
    return textDecode;
  }

}