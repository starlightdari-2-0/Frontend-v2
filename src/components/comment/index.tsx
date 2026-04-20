import React, { useState } from "react";
import { CommentType } from "../../types/commentType";
import Image from "next/image";
import more from "/public/comment_more.svg";
import like from "/public/comment_like.svg";
import likeFilled from "/public/comment_like_filled.svg";
import re from "/public/comment_re.svg";
import icon from "/public/comment_reply_icon.svg";
import { CommentWrapper, Header, AuthorImage, Content, Nickname, Date, Bottom, Reaction, Item, More, Reply, Menu, MenuItem, EditInput, EditActions, EditButton } from "./styles";

interface CommentProps {
    comment: CommentType;
    currentUserId?: number | null;
    onDelete?: (id: number, parentId?: number) => void;
    onSave?: (id: number, content: string, parentId?: number) => void;
    // 답글 달기 버튼 클릭 시 호출될 콜백 추가
    onReply?: (id: number, name: string) => void;
    onToggleLike?: (id: number, liked: boolean, parentId?: number) => void;
    parentId?: number;
}

export const Comment: React.FC<CommentProps> = ({ comment, currentUserId = null, onDelete, onSave, onReply, onToggleLike, parentId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [editText, setEditText] = useState<string>(comment.content || "");

    const writerName = comment.writer_name || "";
    const dateText = comment.date || "";
    const commentId = comment.comment_id;
    const writerId = comment.writer_id;
    const isOwner = comment.mine ?? (currentUserId !== null && writerId === currentUserId);
    const liked = comment.like ?? false;

    const handleSave = () => {
        if (onSave && commentId) {
            onSave(commentId, editText, parentId);
        }
        setIsEditing(false);
    };

    const handleDelete = () => {
        setShowMenu(false);
        if (onDelete && commentId != null) onDelete(commentId, parentId);
    };

    return (
        <CommentWrapper>
            <Header>
                {/* 댓글쓴이 이미지 받아와야 함 */}
                <AuthorImage src={"/maru.svg"} alt="" width={36} height={36} />
                <Nickname>{writerName}</Nickname> {comment.date && <Date>{comment.date}</Date>}
            </Header>

            <div>
                {isEditing ? (
                    <>
                        <Content>
                            <EditInput
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                            />
                        </Content>
                        <Bottom>
                            <Reaction />
                            <EditActions>
                                <EditButton type="button" onClick={() => setIsEditing(false)}>취소</EditButton>
                                <EditButton type="button" onClick={handleSave}>저장</EditButton>
                            </EditActions>
                        </Bottom>
                    </>
                ) : (
                    <>
                        <Content>{comment.content}</Content>
                        <Bottom>
                            <Reaction>
                                <Item
                                    type="button"
                                    $active={liked}
                                    onClick={() => onToggleLike?.(commentId, liked, parentId)}
                                >
                                    <Image src={liked ? likeFilled : like} alt="" width={24} height={24} /> {comment.like_count || 0}
                                </Item>
                                <Item
                                    type="button"
                                    onClick={() => onReply?.(commentId, writerName)}
                                >
                                    <Image src={re} alt="" width={24} height={24} /> 답글 달기
                                </Item>
                            </Reaction>
                            {isOwner && (
                                <More type="button" onClick={() => setShowMenu((prev) => !prev)}>
                                    <Image src={more} alt="" width={48} height={48} />
                                    {showMenu && (
                                        <Menu>
                                            <MenuItem
                                                type="button"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    setShowMenu(false);
                                                    setIsEditing(true);
                                                }}
                                            >
                                                편집
                                            </MenuItem>
                                            <MenuItem
                                                type="button"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    handleDelete();
                                                }}
                                            >
                                                삭제
                                            </MenuItem>
                                        </Menu>
                                    )}
                                </More>
                            )}
                        </Bottom>
                    </>
                )}
            </div>

            {comment.replies && comment.replies.length > 0 && (
                <>
                    {comment.replies.map((reply: any) => (
                        <Reply key={reply.comment_id || reply.id}>
                            <Image src={icon} alt="" width={24} height={24} />
                            <Comment
                                comment={reply}
                                currentUserId={currentUserId}
                                onDelete={onDelete}
                                onSave={onSave}
                                onReply={onReply}
                                onToggleLike={onToggleLike}
                                parentId={commentId}
                            />
                        </Reply>
                    ))}
                </>
            )}
        </CommentWrapper>
    );
};
