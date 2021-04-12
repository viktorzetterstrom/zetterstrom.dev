import firebase from "firebase/app";
import "firebase/database";

enum HackerNewsEndpoint {
  TOP_STORIES = "topstories",
  ITEM = "item",
}

interface HackerNewsItem {
  id: number;
  deleted?: boolean;
  type?: "job" | "story" | "comment" | "poll" | "pollopt";
  by?: string;
  time?: number;
  text?: string;
  dead?: boolean /*  */;
  parent?: number;
  poll?: number;
  kids?: number[];
  url?: string;
  score?: number;
  title?: number;
  parts?: number[];
  descendants?: number;
}

type HackerNewsStory = Required<
  Pick<
    HackerNewsItem,
    | "by"
    | "descendants"
    | "id"
    | "kids"
    | "score"
    | "time"
    | "title"
    | "type"
    | "url"
  >
>;

export class HackerNews {
  private HN_URL = "https://hacker-news.firebaseio.com/";
  private HN_VERSION = "v0";
  private FIREBASE_APP_NAME = "hacker-news";
  private _db: firebase.database.Database;

  constructor() {
    const app = firebase.initializeApp(
      { databaseURL: this.HN_URL },
      this.FIREBASE_APP_NAME
    );
    this._db = app.database();
  }

  private async fetch<T = unknown>(endpoint: string) {
    return new Promise<T>((resolve, reject) => {
      this._db
        .ref(`${this.HN_VERSION}/${endpoint}`)
        .once("value", (dataSnapshot) => resolve(dataSnapshot.val()))
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  async topStories(numberOfStories: number) {
    const topStoryIds = await this.fetch<number[]>(
      HackerNewsEndpoint.TOP_STORIES
    );

    const topStories = await Promise.all(
      topStoryIds
        .slice(0, numberOfStories)
        .map((storyId) =>
          this.fetch<HackerNewsStory[]>(`${HackerNewsEndpoint.ITEM}/${storyId}`)
        )
    );

    return topStories;
  }
}
