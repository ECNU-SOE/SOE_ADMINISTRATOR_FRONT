import HttpRequest from '@/lib/request'
export const backendServer = "http://47.101.58.72:8888/user-server"
export const jwtServerInstance = new HttpRequest(backendServer)
// export const newBackendServer = "http://localhost:8002"
export const newBackendServer = "http://47.101.58.72:8888"
export const newJwtServerInstance = new HttpRequest(newBackendServer)