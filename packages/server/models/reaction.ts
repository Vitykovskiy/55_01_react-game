import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../db'
import { Comment } from './comment'

export type ReactionType =
  | 'like'
  | 'dislike'
  | 'laugh'
  | 'angry'
  | 'sad'
  | 'love'

export type ReactionAttributes = {
  id: number
  type: ReactionType
  userId: number
  commentId: number
  createdAt?: Date
  updatedAt?: Date
}

type ReactionCreationAttributes = Optional<ReactionAttributes, 'id'>

export class Reaction extends Model<
  ReactionAttributes,
  ReactionCreationAttributes
> {
  declare id: number
  declare type: ReactionType
  declare userId: number
  declare commentId: number
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

Reaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.ENUM('like', 'dislike', 'laugh', 'angry', 'sad', 'love'),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Comment,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    tableName: 'reactions',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['userId', 'commentId', 'type'],
        name: 'reaction_user_comment_type_unique',
      },
    ],
  }
)
