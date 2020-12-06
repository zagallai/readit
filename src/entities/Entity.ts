import {
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { classToPlain, Exclude } from 'class-transformer'

export default abstract class Entity extends BaseEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  createdOn: Date

  @UpdateDateColumn()
  modifiedOn: Date

  toJSON() {
    return classToPlain(this)
  }
}
