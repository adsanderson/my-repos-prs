import { Machine } from "xstate";

export const authMachine = Machine({
  id: "auth",
  initial: "unknown",
  context: {
    token: ""
  },
  states: {
    unknown: {
      on: {
        SIGN_IN: "authorize"
      }
    },
    authorize: {
      invoke: {
        src: "authenticate",
        onDone: {
          target: "authenticated",
          actions: "setToken"
        }
      }
    },
    authenticated: {}
  }
});
