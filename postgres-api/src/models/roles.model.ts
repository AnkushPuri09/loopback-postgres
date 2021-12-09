import {Entity, model, property, hasMany} from '@loopback/repository';
import {Users} from './users.model';
enum userRoll {
  Admin,
  SuperAdmin,
  Subscriber
}

@model()
export class Roles extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  rollName: string;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {
      enum: Object.values(userRoll),
    },
  })
  key: number;
  userRoll: userRoll;

  @property({
    type: 'string',
  })
  description?: string;

  @hasMany(() => Users)
  users: Users[];

  constructor(data?: Partial<Roles>) {
    super(data);
  }
}

export interface RolesRelations {
  // describe navigational properties here
}

export type RolesWithRelations = Roles & RolesRelations;
