import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../db'

export type TopicAttributes = {
  id: number
  title: string
  content: string
  userId: number
  createdAt?: Date
  updatedAt?: Date
}

type TopicCreationAttributes = Optional<TopicAttributes, 'id'>

export class Topic extends Model<TopicAttributes, TopicCreationAttributes> {
  declare id: number
  declare title: string
  declare content: string
  declare userId: number
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

Topic.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'topics',
    timestamps: true,
  }
)
