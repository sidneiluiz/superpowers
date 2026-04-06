export type ContentItem = {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnailUrl?: string;
  publishedAt: string;
  type: "video" | "article" | "devotional" | "email";
};

export abstract class ContentSource {
  abstract getLatest(count?: number): Promise<ContentItem[]>;
}

export class YouTubeAdapter extends ContentSource {
  private readonly channelId: string;
  private readonly apiKey: string;

  constructor(channelId: string, apiKey: string) {
    super();
    this.channelId = channelId;
    this.apiKey = apiKey;
  }

  async getLatest(count = 6): Promise<ContentItem[]> {
    const url = new URL("https://www.googleapis.com/youtube/v3/search");
    url.searchParams.set("key", this.apiKey);
    url.searchParams.set("channelId", this.channelId);
    url.searchParams.set("part", "snippet");
    url.searchParams.set("order", "date");
    url.searchParams.set("maxResults", String(count));
    url.searchParams.set("type", "video");

    const response = await fetch(url.toString());
    const data = (await response.json()) as {
      items?: Array<{
        id?: { videoId?: string };
        snippet?: {
          title?: string;
          description?: string;
          publishedAt?: string;
          thumbnails?: { medium?: { url?: string } };
        };
      }>;
    };

    return (data.items ?? [])
      .filter((item) => item.id?.videoId && item.snippet?.title)
      .map((item) => ({
        id: item.id!.videoId!,
        title: item.snippet!.title!,
        description: item.snippet?.description ?? "",
        url: `https://youtube.com/watch?v=${item.id!.videoId!}`,
        thumbnailUrl: item.snippet?.thumbnails?.medium?.url,
        publishedAt: item.snippet?.publishedAt ?? new Date().toISOString(),
        type: "video",
      }));
  }
}
