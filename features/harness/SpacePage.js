import Page from './Page.js';
import Room from '../lib/Room.js';
import RoomCardComponent from './RoomCardComponent.js';

export default class SpacePage extends Page {
  constructor(driver, space) {
    super(driver);
    this.space = space;
  }

  /**
   * @returns {string}
   */
  path() {
    return `/spaces/${this.space.slug}`
  }

  /**
   * @param {Room} room
   * @returns {RoomCardComponent}
   */
  roomCard(room) {
    return new RoomCardComponent(this.driver, room)
  }

  /**
   *
   * @param {*} filters
   * @returns {Promise<RoomCardComponent[]}
   */
  roomCardsWhere(filters) {
    const { accessLevel } = filters
    return this.driver.findElements(accessLevel.locator).then(
      (elements) => elements.map((e) => new RoomCardComponent(e))
    );
  }
}
