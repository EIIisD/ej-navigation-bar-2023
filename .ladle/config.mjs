/** @type {LadleConfig} */
export default {
  stories: "components/**/*.stories.{ts,tsx}",
  addons: {
    rtl: {
      enabled: false,
    },
    darkMode: {
      enabled: false,
    },
    width: {
      options: {
        sm: 425,
        md: 960,
        lg: 1280,
      },
      enabled: true,
      defaultValue: 0,
    },
  },
  hotkeys: {
    search: ["/", "meta+p"],
    nextStory: ["alt+arrowright"],
    previousStory: ["alt+arrowleft"],
    nextComponent: ["alt+arrowdown"],
    previousComponent: ["alt+arrowup"],
    control: ["c"],
    darkMode: ["-"],
    fullscreen: ["f"],
    width: ["-"],
    rtl: ["r"],
    source: ["s"],
    a11y: ["a"],
  },
}
