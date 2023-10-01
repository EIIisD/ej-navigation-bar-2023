const runAsProduction = false
export const LOCAL_ENV = runAsProduction ? false : process.env.NODE_ENV !== "production"

if (LOCAL_ENV) console.warn("LOCAL_ENV", LOCAL_ENV)
