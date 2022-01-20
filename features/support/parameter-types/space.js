import { defineParameterType } from '@cucumber/cucumber';
import Space from '../../lib/Space.js';

// This injects a Space class into steps with named Spaces (i.e.)
// `the "Convene Demo" Space` and steps that mention `Space` in
// isolation.
defineParameterType({
  name: "space",
  regexp: /("[^"]*" )?Space/,
  transformer: (name = "System Test") => new Space(name.trim().replace(/\"/g,'')),
});
