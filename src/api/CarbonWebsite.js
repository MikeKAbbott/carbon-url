import axios from 'axios';

import Carbon from '@/models/Carbon';

export default class CarbonWebsite {

  #baseUrl = 'https://api.websitecarbon.com/';
  
  /** @return {Promise<object>} */
  async get(url) {
    try {
      const response = (await axios.get(`${this.#baseUrl}site?url=${url}`));
      return new Carbon(response.data);
    } catch (e) {
      throw new Error(e);
    }
  }
}
