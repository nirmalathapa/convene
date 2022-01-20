import slugify from './slugify.js';
import AccessLevel from './AccessLevel.js';

class Room {

  /**
   * @type {AccessLevel | undefined}
   */
  accessLevel;

  /**
   * @param {string} roomName
   */
  constructor(roomName) {
    this.name = roomName;
    if(roomName !== "Room") {
      this.slug = slugify(roomName);
    }
  }


  reinitialize({ accessLevel }) {
    this.accessLevel = accessLevel
  }
}


export default Room;
