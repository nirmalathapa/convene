import Space from "./Space.js";
/**
 * Merges extracted parameter types together for convenience within step definitions
 */
export default function linkParameters({
  space = new Space("System Test"),
  accessLevel,
  room,
}) {
  room.space = space;
  room.reinitialize({ accessLevel });
  return {
    space,
    accessLevel,
    room,
  };
};
