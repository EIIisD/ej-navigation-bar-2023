/** @type {LadleConfig} */
export default {
  stories: "components/**/*.stories.{ts,tsx}",
  addons: {
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
}
