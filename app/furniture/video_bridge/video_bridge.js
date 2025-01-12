import { EventTarget } from 'event-target-shim';

const eventBus = new EventTarget()
export default class VideoBridge {
  constructor(domain, parentNode) {
    this.domain = domain;
    this.parentNode = parentNode;
    this.connectJitsiApi();
  }

  enterRoom(roomName) {
    this.roomName = roomName;
    this.connectJitsiApi();
    this.dispatchEvent(new CustomEvent("enteredRoom"));
  }

  exitRoom() {
    this.jitsi.dispose();
    this.dispatchEvent(new CustomEvent("exitedRoom"));
  }

  addEventListener(type, listener, option) {
    eventBus.addEventListener(type, listener, option);
  }

  dispatchEvent(event) {
    eventBus.dispatchEvent(event);
  }

  connectJitsiApi() {
    if (!this.roomName) return;
    this.jitsi = new JitsiMeetExternalAPI(this.domain, this.jitsiApiOption());
    this.jitsi.on('readyToClose', () => this.exitRoom(true));
  }

  jitsiApiOption() {
    return {
      roomName: this.roomName,
      parentNode: this.parentNode,
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: ['microphone', 'camera', 'desktop', 'tileview', 'hangup'],
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
        DISABLE_PRESENCE_STATUS: true,
        MOBILE_APP_PROMO: false,
        APP_NAME: 'Convene',
        DISABLE_RINGING: true,
        SETTINGS_SECTIONS: [],
        DEFAULT_REMOTE_DISPLAY_NAME: 'Participants',
      },
      configOverwrite: {
        disableDeepLinking: true,
      },
    };
  }
}
