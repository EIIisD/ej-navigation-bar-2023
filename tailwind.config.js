const { boxShadow, fontFamily } = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")
const plugin = require("tailwindcss/plugin")

const reverseBoxShadowDirection = (str) => {
  const negateY = (str) => {
    const [x, y, ...rest] = str.trim().split(" ")
    if (y.split("").includes("-")) {
      return `${x} ${y.replace("-", "")} ${rest.join(" ")}`
    } else {
      return `${x} -${y} ${rest.join(" ")}`
    }
  }
  return str.split(",").map(negateY).join(",")
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", ".ladle/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["easyJet Rounded", ...fontFamily.sans],
        display: ["easyJet Generation CY", ...fontFamily.sans],
      },
      fontSize: {
        "bp-sm": ["13px", "1"],
        "bp-base": ["14px", "1"],
        "bp-lg": ["16px", "1"],
        "bp-xl": ["32px", "1"],
      },
      screens: {
        "desktop-header-width": "1280px",
        "tablet-header-width": "960px",
      },
      colors: {
        gray: colors.neutral,
        orange: {
          light: "#FE8C00",
          DEFAULT: "#FF6600",
          dark: "#FF4500",
          darker: "#E64100",
        },
        primary: {
          DEFAULT: colors.neutral[950],
        },
        secondary: {
          DEFAULT: colors.neutral[500],
        },
        tertiary: {
          DEFAULT: colors.neutral[400],
        },
      },
      boxShadow: {
        "sm-up": reverseBoxShadowDirection(boxShadow.sm),
        up: reverseBoxShadowDirection(boxShadow.DEFAULT),
        "md-up": reverseBoxShadowDirection(boxShadow.md),
        "lg-up": reverseBoxShadowDirection(boxShadow.lg),
        "xl-up": reverseBoxShadowDirection(boxShadow.xl),
        "2xl-up": reverseBoxShadowDirection(boxShadow["2xl"]),
      },
      borderColor: (theme) => ({
        DEFAULT: theme("colors.gray.200"),
      }),
      borderRadius: {
        DEFAULT: "3.5px",
      },
      transitionTimingFunction: {
        "dev-test-transition": "cubic-bezier(1.000,0.000,0.995,-0.050)",
        "arrow-in-out": "cubic-bezier(0.215,0.61,0.355,1)",
        DEFAULT: "cubic-bezier(0.4,0,0.2,1)",
        standard: "cubic-bezier(0.4,0,0.2,1)",
        accelerate: "cubic-bezier(0.4,0,1,1)",
        decelerate: "cubic-bezier(0,0,0.2,1)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/container-queries"),
    require("tailwindcss-animate"),
    plugin(function ({ addVariant }) {
      addVariant("screen", "@media screen")
    }),
  ],
}
