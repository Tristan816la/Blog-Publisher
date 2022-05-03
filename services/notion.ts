import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

export default class NotionService {
  client: Client;

  n2m: NotionToMarkdown;

  urlConvert: (url: string) => string;

  constructor() {
    this.client = new Client({ auth: process.env.NOTION_ACCESS_TOKEN });
    this.n2m = new NotionToMarkdown({ notionClient: this.client });
    this.urlConvert = (url: string) => {
      const idPart = url.split('/').slice(-1)[0];
      const converted = `${idPart.slice(0, 8)}-${idPart.slice(
        8,
        12,
      )}-${idPart.slice(12, 16)}-${idPart.slice(16, 20)}-${idPart.slice(
        20,
        32,
      )}`;
      return converted;
    };
  }

  /** Search */
  async searchPostsOrDataBases(query: string): Promise<any> {
    try {
      const response = await this.client.search({
        query,
        sort: {
          direction: 'ascending',
          timestamp: 'last_edited_time',
        },
      });
      return response.results;
    } catch (err: unknown) {
      return err;
    }
  }

  /** Get a Block */
  async getBlock(bid: string): Promise<any> {
    try {
      const response = await this.client.blocks.retrieve({
        block_id: bid,
      });
      return response;
    } catch (err) {
      return err;
    }
  }

  /** Get a Page */
  async getPage(pid: string): Promise<any> {
    try {
      const response = await this.client.blocks.children.list({
        block_id: pid,
      });
      return response.results;
    } catch (err) {
      return err;
    }
  }

  /** Get the page content */
  async getPageContent(pid: string): Promise<any> {
    const page = await this.client.pages.retrieve({
      page_id: pid,
    });
    const mdblocks = await this.n2m.pageToMarkdown(pid);
    const mdString = this.n2m.toMarkdownString(mdblocks);
    const post = NotionService.pageToPostTransformer(page);
    return { markdown: mdString, post };
  }

  /** Get Database */
  async getDatabase(did: string): Promise<any> {
    try {
      const response = await this.client.databases.query({
        database_id: did,
      });
      return response.results;
    } catch (err) {
      return err;
    }
  }

  private static pageToPostTransformer(page: any) {
    let { cover } = page;
    if (cover) {
      switch (cover.type) {
        case 'file':
          cover = page.cover.file;
          break;
        case 'external':
          cover = page.cover.external.url;
          break;
        default:
          // Add default cover image if you want...
          cover = '';
      }
    }

    return {
      id: page.id,
      cover,
      title: page.properties.title.title[0].plain_text,
      date: page.last_edited_time,
    };
  }
}
