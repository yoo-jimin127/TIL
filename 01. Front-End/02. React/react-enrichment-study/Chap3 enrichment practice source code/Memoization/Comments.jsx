import React, {useCallback} from 'react'
import CommentItem from './CommentItem'

export default function Comments({commentList}) {
    const handleChange = useCallback(() => {
        console.log("clicked");
    }, []);

    return (
        <div>
            {commentList.map(comment => 
            <CommentItem
                key={comment.title}
                title={comment.title}
                content={comment.content}
                likes={comment.likes}
                onClick={handleChange}
            />)}
        </div>
    )
}
