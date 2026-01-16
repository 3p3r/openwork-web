import { EventEmitter } from "events";

export default {}

// Mock thread data
const mockThread = {
  thread_id: 'mock-thread-1',
  created_at: new Date(),
  updated_at: new Date(),
  metadata: {},
  status: 'idle' as const,
  thread_values: {},
  title: 'Demo Thread'
}

// Mock responses for different channels
const mockResponses: Record<string, any> = {
  'threads:list': [mockThread],
  'threads:create': mockThread,
  'threads:get': mockThread,
  'threads:update': mockThread,
  'threads:delete': null,
  'threads:history': [],
  'models:list': [],
  'models:current': null,
  'models:listProviders': [],
  'models:getDefault': null,
  'workspace:get': null,
  'workspace:set': null,
  'agent:invoke': null
}

export const ipcRenderer = new EventEmitter()

Object.defineProperty(ipcRenderer, 'send', {
  value: (channel: string, ...args: unknown[]): void => {
    console.log(`ipcRenderer.send called with channel: ${channel}`, ...args)
  }
})

Object.defineProperty(ipcRenderer, 'invoke', {
  value: async (channel: string, ...args: unknown[]): Promise<unknown> => {
    console.log(`ipcRenderer.invoke called with channel: ${channel}`, ...args)
    
    // Return mock data based on channel
    if (mockResponses.hasOwnProperty(channel)) {
      return mockResponses[channel]
    }
    
    // Default: return empty array for list operations, null for others
    if (channel.includes(':list')) {
      return []
    }
    
    return null
  }
})

export const contextBridge = {
  exposeInMainWorld: (key: string, api: unknown): void => {
    if (typeof window !== 'undefined') {
      ;(window as any)[key] = api
    }
    if (typeof globalThis !== 'undefined') {
      ;(globalThis as any)[key] = api
    }
  }
}
