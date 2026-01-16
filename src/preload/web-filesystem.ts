import * as fs from 'wasabio'

const fsPromises = (fs as any).promises

// Re-export all methods from fs.promises dynamically
export * from 'wasabio'
Object.assign(exports, fsPromises)

export default fsPromises
export const promises = fsPromises
