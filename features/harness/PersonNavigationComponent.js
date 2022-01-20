import Component from "./Component.js";
export default class PersonNavigationComponent extends Component {
  /**
   * @returns {Promise<PersonNavigationComponent>}
   */
  signOut() {
    return this.signOutLink().click().then(() => this )
  }

  /**
   * @returns {Promise<Component>}
   */
  signOutLink() {
    return this.component(".sign-out");
  }
}
