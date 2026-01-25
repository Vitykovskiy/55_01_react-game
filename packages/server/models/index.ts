import { Comment, Reply } from './comment'
import { Reaction } from './reaction'
import { Topic } from './topic'

export const initModels = () => {
  Topic.hasMany(Comment, { foreignKey: 'topicId', as: 'comments' })
  Comment.belongsTo(Topic, { foreignKey: 'topicId', as: 'topic' })

  Comment.hasMany(Reply, {
    foreignKey: 'parentCommentId',
    as: 'replies',
  })
  Comment.belongsTo(Comment, {
    foreignKey: 'parentCommentId',
    as: 'parent',
  })

  Comment.hasMany(Reaction, { foreignKey: 'commentId', as: 'reactions' })
  Reaction.belongsTo(Comment, { foreignKey: 'commentId', as: 'comment' })

  return { Topic, Comment, Reaction, Reply }
}

export { Topic, Comment, Reaction, Reply }
