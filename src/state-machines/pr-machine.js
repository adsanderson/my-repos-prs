import { Machine } from "xstate";

export const prMachine = Machine({
  id: "prs",
  initial: "initialize",
  context: {
    token: ""
  },
  states: {
    initialize: {
      invoke: {
        src: "getPrs",
        onDone: {
          target: "showPrs",
          actions: "prsLoaded"
        }
      }
    },
    showPrs: {},
    error: {}
  }
});
