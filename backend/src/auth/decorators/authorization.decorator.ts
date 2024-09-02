import { SetMetadata } from '@nestjs/common'
import { Action, Subject } from '../authorization'

export interface AuthorizationMetadata {
  action: Action
  subject: Subject
}

export const authorizationKey = 'authorization'

export const Authorization = (action: Action, subject: Subject) =>
  SetMetadata(authorizationKey, { action, subject })
