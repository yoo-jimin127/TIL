import React, {useState} from 'react'
import Comments from './Comments';


const CommentList = [
    { title : "comment1", content: "message1", likes: 1 },
    { title : "comment2", content: "message2", likes: 2 },
    { title : "comment3", content: "message3", likes: 3 }
]
export default function Memo() {
    const [comments, setComments] = useState(CommentList);
    return (
        <div>
            <Comments commentList={comments} />
        </div>
    )
}
