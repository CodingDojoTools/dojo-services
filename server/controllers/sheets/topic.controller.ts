import { TopicDateUpdater } from '@server/crawlers';
import { Week } from '@server/interfaces';
import { Http } from '@status/codes';

class TopicController {
  async update(request, response) {
    const { weeks }: { weeks: Week[] } = request.body;

    try {
      const updater = new TopicDateUpdater(weeks);
      await updater.crawl();

      response.sendStatus(Http.NoContent);
    } catch (e) {
      console.log('Error processing topic updates', e.message);
      response.status(Http.InternalServerError).json(e.message);
    }
  }
}

export const topicController = new TopicController();
