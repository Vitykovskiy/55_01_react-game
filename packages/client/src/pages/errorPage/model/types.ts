export enum ErrorCode {
  BadRequest = 400,
  NotFound = 404,
  ServerError = 500,
}
export type ErrorData = { heading: string; text: string }
