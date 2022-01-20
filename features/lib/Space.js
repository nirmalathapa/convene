export default class Space {
  constructor(spaceName) {
    this.name = spaceName;
    this.slug = spaceName.replace(/\s+/g, '-').toLowerCase();
  }
}
