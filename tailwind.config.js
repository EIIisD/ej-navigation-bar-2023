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

const cqi = (value) => {
  const scale = 1.675
  return `${value * scale}cqw`
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", ".ladle/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "desktop-header-width": "1280px",
        "tablet-header-width": "960px",
      },
      fontFamily: {
        sans: ["easyJet Rounded", ...fontFamily.sans],
        display: ["easyJet Generation CY", ...fontFamily.sans],
      },
      fontSize: {
        "xs-cqi": [cqi(0.75), cqi(1)],
        "sm-cqi": [cqi(0.875), cqi(1.25)],
        "base-cqi": [cqi(1), cqi(1.5)],
        "lg-cqi": [cqi(1.125), cqi(1.75)],
        "xl-cqi": [cqi(1.25), cqi(1.75)],
        "2xl-cqi": [cqi(1.5), cqi(2)],
        "3xl-cqi": [cqi(1.875), cqi(2.25)],
        "4xl-cqi": [cqi(2.25), cqi(2.5)],
        "5xl-cqi": [cqi(3), "1"],
      },
      spacing: {
        "print-bleed": "20mm",
        "0-cqi": cqi(0),
        "0.5-cqi": cqi(0.125),
        "1-cqi": cqi(0.25),
        "1.5-cqi": cqi(0.375),
        "2-cqi": cqi(0.5),
        "2.5-cqi": cqi(0.625),
        "3-cqi": cqi(0.75),
        "3.5-cqi": cqi(0.875),
        "4-cqi": cqi(1),
        "5-cqi": cqi(1.25),
        "6-cqi": cqi(1.5),
        "7-cqi": cqi(1.75),
        "8-cqi": cqi(2),
        "9-cqi": cqi(2.25),
        "10-cqi": cqi(2.5),
        "11-cqi": cqi(2.75),
        "12-cqi": cqi(3),
        "14-cqi": cqi(3.5),
        "16-cqi": cqi(4),
        "20-cqi": cqi(5),
        "24-cqi": cqi(6),
        "28-cqi": cqi(7),
        "32-cqi": cqi(8),
        "36-cqi": cqi(9),
        "40-cqi": cqi(10),
        "44-cqi": cqi(11),
        "48-cqi": cqi(12),
        "52-cqi": cqi(13),
        "56-cqi": cqi(14),
        "60-cqi": cqi(15),
        "64-cqi": cqi(16),
        "72-cqi": cqi(18),
        "80-cqi": cqi(20),
        "96-cqi": cqi(24),
      },
      lineHeight: {
        "3-cqi": cqi(0.75),
        "4-cqi": cqi(1),
        "5-cqi": cqi(1.25),
        "6-cqi": cqi(1.5),
        "7-cqi": cqi(1.75),
        "8-cqi": cqi(2),
        "9-cqi": cqi(2.25),
        "10-cqi": cqi(2.5),
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
        cqi: cqi(0.21875),
        "sm-cqi": cqi(0.125),
        "md-cqi": cqi(0.375),
        "lg-cqi": cqi(0.5),
        "xl-cqi": cqi(0.75),
        "2xl-cqi": cqi(1),
        "3xl-cqi": cqi(1.5),
      },
      transitionTimingFunction: {
        "dev-test-transition": "cubic-bezier(1.000,0.000,0.995,-0.050)",
        "arrow-in-out": "cubic-bezier(0.215,0.61,0.355,1)",
        DEFAULT: "cubic-bezier(0.4,0,0.2,1)",
        standard: "cubic-bezier(0.4,0,0.2,1)",
        accelerate: "cubic-bezier(0.4,0,1,1)",
        decelerate: "cubic-bezier(0,0,0.2,1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
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
