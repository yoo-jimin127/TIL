import React from 'react';
import "./CommentItem.css";

export default function CommentItem({title, content, likes}) {
    return (
        <div className="CommentItem">
            <span>{title}</span>
            <br />
            <span>{content}</span>
            <br />
            <span>{likes}</span>
            <br />
        </div>
    )
}
