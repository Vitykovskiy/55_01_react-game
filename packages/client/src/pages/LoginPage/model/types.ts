import z from 'zod'
import { schema } from './schemas'
import { ApiResponse } from '@shared/lib'

export type Schema = z.infer<typeof schema>
export type YandexServiceIdResponse = ApiResponse<{ service_id: string }>
