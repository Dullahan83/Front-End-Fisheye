import Picture from "../object/picture.js";
import Video from "../object/video.js";

export default class MediaType {
   constructor(data) {
      if (data.image) return new Picture(data);
      else if (data.video) return new Video(data);
   }
}
