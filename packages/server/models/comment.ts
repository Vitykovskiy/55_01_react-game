import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../db'
import { Topic } from './topic'

export type CommentAttributes = {
  id: number
  content: string
  userId: number
  topicId: number
  parentCommentId?: number | null
  createdAt?: Date
  updatedAt?: Date
}

type CommentCreationAttributes = Optional<
  CommentAttributes,
  'id' | 'parentCommentId'
>

export class Comment extends Model<
  CommentAttributes,
  CommentCreationAttributes
> {
  declare id: number
  declare content: string
  declare userId: number
  declare topicId: number
  declare parentCommentId: number | null
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Topic,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    parentCommentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'comments',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    tableName: 'comments',
    timestamps: true,
  }
)

export const Reply = Comment
