import { ContentItem, YouTubeAdapter } from "@/adapters/content-source";

const fallbackItems: ContentItem[] = [
  {
    id: "sample-1",
    title: "Mensagem de esperança para hoje",
    description: "Uma reflexão curta para começar o dia com fé e direção.",
    url: "https://youtube.com",
    publishedAt: new Date().toISOString(),
    type: "video",
  },
  {
    id: "sample-2",
    title: "Devocional da semana",
    description: "Estudo guiado com aplicação prática para a rotina.",
    url: "https://youtube.com",
    publishedAt: new Date().toISOString(),
    type: "devotional",
  },
];

export async function getLatestContent(count = 6): Promise<ContentItem[]> {
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!channelId || !apiKey) {
    return fallbackItems.slice(0, count);
  }

  const adapter = new YouTubeAdapter(channelId, apiKey);
  const items = await adapter.getLatest(count);
  return items.length > 0 ? items : fallbackItems.slice(0, count);
}
