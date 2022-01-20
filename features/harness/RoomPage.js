import { ThenableWebDriver } from "selenium-webdriver";
import Component from "./Component.js";
import Room from "../lib/Room.js";

import Page from "./Page.js";

class RoomPage extends Page {
  /**
   * @param {ThenableWebDriver} driver
   * @param {Room} room
   */
  constructor(driver, room) {
    super(driver);
    this.room = room;
  }

  /**
   * @returns {Promise<Boolean>}
   */
  isWaitingRoom() {
    return this.accessCodeForm().isDisplayed();
  }

  /**
   * @returns {Component}
   */
  accessCodeForm() {
    return this.component(".access-code-form");
  }

  videoPanel() {
    return this.component("[name*='jitsiConferenceFrame']");
  }

  path() {
    return `/spaces/${this.room.space.slug}/rooms/${this.room.slug}`;
  }
}

export default RoomPage;
