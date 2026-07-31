export type RequestAccessResult = {
  accepted: true
}

export type RequestAccessService = {
  requestAccess: (email: string) => Promise<RequestAccessResult>
}
