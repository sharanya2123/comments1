import CommentItem from '../CommentItem'

import{v4} from 'uuid';

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here


class Comments extends Component{
  state={
    nameInput: '',
    commentInput: '',
    commentList: [],
  }
  
  deleteComment = commentId => {
    const {commentsList} = this.state

    this.setState({
      commentsList:commentsList.filter(comment => comment.id === commentId),
    })
  }

  toggleIsLiked = id => {
    this.setState(prevSate => ({
      commentsList:prevSate.commentsList.map(eachComment => {
        if(id === eachComment.id){
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }
  renderCommentList =() => {
    const {commentsList} = this.state 

    return commentsList.map(eachComment => (
      <CommentItem key={eachComment.id} commentDetails={eachComment}
      toggleIsLiked={this.toggleIsLiked}
      deleteComment={this.deleteComment} 
      />
    ))
  }
  onAddComment = event => {
    event.prevDefault() 
    const {nameInput, commentInput} = this.state
    const initialContainerBackgroundClassNames =`initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length -1,
        )
      ]
    }`
    const newComment ={
      id:v4(),
      name:nameInput,
      comment:commentInput,
      date:new Date(),
      isLiked:false,
      initialClassName: initialContainerBackgroundClassNames,
    }
    this.setState(prevSate => ({
      commentsList:[...prevSate.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  onChangeCommentInput = event => {
    this.setState({
      commentInput:event.target.value,
    })
  }
  render(){
   const {nameInput, commentInput, commentsList} = this.state 

   return (
    <div className="app-container">
    <div className="comments-container">
    <h1 className="app-heading">Comments</h1>
    <div className="comments-inputs">
    <form className="form" onSubmit={this.onAddComment}>
    <p className="form-description">
    Say something about 4.0 Technologies
    </p>
    <input className="name-input" type="text" placeholder="Your Name" value ={nameInput} onChange={this.onChangeNameInput} rows="6" />
    <textArea placeholder="Your Comment" className="comment-input" value={commentInput} onChange={this.onChangeCommentInput} rows="6">
    </textArea>
    <button className="add-button" type="submit">Add Comment</button>
    </form>
    <img className="image" src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png" alt="comments" />

    </div>
    <hr className="ling" />
    <p className="heading">
    <span className="comments-count">{commentsList.length}</span>
    Comments
    </p>
    <ul className="comments-list">{this.renderCommentsList}</ul>
    
    </div>
    
    
    
    </div>
   )
  }
}

export default Comments