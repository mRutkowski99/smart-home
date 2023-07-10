import { Uuid } from '@smart-home/api/shared/domain';
import {UserRole} from "@prisma/client";
import * as bcrypt from 'bcrypt'
import * as crypto from "crypto";

export class User {
  constructor(
    public readonly id: Uuid,
    public readonly homeId: Uuid,
    public readonly login: string,
    private _passwordHash: string,
    public name: string,
    public readonly role: UserRole,
    private _hasChangedPassword: boolean
  ) {}

  static create(homeId: string, login: string, passwordHash: string, name: string, role: UserRole): User {
    return new User(new Uuid(crypto.randomUUID()), new Uuid(homeId), login, passwordHash, name, role, false)
  }

    get passwordHash(): string {
      return this._passwordHash
    }

    get hasChangedPassword(): boolean {
      return this._hasChangedPassword
    }

    async setPassword(password: string) {
      this._passwordHash = await bcrypt.hash(password, 10)
      this._hasChangedPassword = false
    }

    async changePassword(password: string, newPassword: string) {
      if (!bcrypt.compare(password, this._passwordHash)) throw new Error('Wrong password')
      this._passwordHash = await bcrypt.hash(newPassword, 10)
      this._hasChangedPassword = true
    }
}
