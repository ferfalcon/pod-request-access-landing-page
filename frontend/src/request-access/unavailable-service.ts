import type { RequestAccessService } from './service.ts'

export const unavailableRequestAccessService: RequestAccessService = {
  requestAccess: async () => {
    throw new Error('Request access service is unavailable')
  },
}
