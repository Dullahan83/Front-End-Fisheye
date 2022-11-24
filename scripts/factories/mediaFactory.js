import Picture from "../object/picture.js";
import Video from "../object/video.js";

// if the data contain a video return a new video object, else return a picture one
export default class MediaType {
   constructor(data) {
      if (data.image) return new Picture(data);
      else if (data.video) return new Video(data);
   }
}
