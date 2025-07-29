import React, { useState } from 'react';
import ReplyForm from './ReplyForm';

const CommentItem = ({ comment, onReply, onDelete, onUpdate }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editContent, setEditContent] = useState(comment?.content || '');
  const [children, setChildren] = useState(comment.children || []);

  const handleReply = async (text) => {
    console.log('🧾 대댓글 등록 시도:', { parentId: comment.commentId, text });
    const newChild = await onReply(text, comment.commentId);
    if (newChild) setChildren((prev) => [...prev, newChild]);
    setShowReplyForm(false);
  };

  const handleUpdate = async () => {
    if (!editContent.trim()) return;
    await onUpdate(comment.commentId, editContent);
    setShowEditForm(false);
  };

  const authorName = comment?.user?.nickname || comment?.writer || '익명';

  return (
    <div className="border p-3 rounded-md bg-white shadow-sm">
      <div className="text-sm font-bold">{authorName}</div>
      {!showEditForm ? (
        <div className="text-sm text-gray-700 whitespace-pre-wrap">{comment.content}</div>
      ) : (
        <textarea
          className="w-full border rounded p-1 text-sm mt-1"
          rows={3}
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
        />
      )}
      <div className="text-xs text-gray-400 mt-1">{comment.createdAt}</div>

      <div className="flex gap-2 text-sm mt-1">
        <button onClick={() => setShowReplyForm((v) => !v)} className="text-blue-500">
          답글
        </button>
        <button onClick={() => setShowEditForm((v) => !v)} className="text-yellow-500">
          수정
        </button>
        <button onClick={() => onDelete(comment.commentId)} className="text-red-500">
          삭제
        </button>
        {showEditForm && (
          <button onClick={handleUpdate} className="text-green-600 ml-2">
            저장
          </button>
        )}
      </div>

      {showReplyForm && (
        <div className="mt-2 ml-4">
          <ReplyForm
            onSubmit={handleReply}
            onCancel={() => setShowReplyForm(false)}
          />
        </div>
      )}

      {children.length > 0 && (
        <div className="mt-3 ml-6 pl-4 border-l border-gray-200 space-y-3">
          {children.map((child) => (
            <CommentItem
              key={child.commentId || `${child.content}-${Math.random()}`}
              comment={child}
              onReply={onReply}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
