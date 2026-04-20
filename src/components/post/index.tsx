"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Comment } from "../comment";
import { PostWrapper, PostImage, Author, LikeButton, Header, AuthorImage, Nickname, More, Body, ContentWrapper, Title, Content, Footer, LikeSection, Count, CommentInputContainer, SubmitButton, CommentInput, NoComment, EditInput, EditTextarea, EditActions, EditButton, EditFileInput } from "./styles";
import comment from "/public/myComment.svg";
import more from "/public/comment_more.svg";
import send from "/public/send_comment.svg";
import { useGetLoginedUserId } from "../../api/generated/member-controller/member-controller";
import { useCreateLikeMemoryStar, useDeleteLikeMemoryStar, useDeleteMemoryStar, useSelectMemoryStarByMemId } from "../../api/generated/memory-star-controller/memory-star-controller";
import { getGetMemCommentChildrenQueryKey, useCreateMemComment, useDeleteMemComment, useGetMemComment, useGetMemCommentChildren, useLikeMemComment, useUnLikeMemComment, useUpdateMemComment } from "../../api/generated/mem-comment-controller/mem-comment-controller";
import { MemCommentRepDto, MemoryStarRepDto } from "../../api/generated/model";
import { resolveImageSrc } from "../../utils/resolveImageSrc";
import ContextMenu from "../menu/ContextMenu";
import { useModalStore } from "../../store/useModalStore";
import { customInstance } from "../../api/custom-instance";

interface PostProps {
    post: MemoryStarRepDto;
}

interface MemoryCommentThreadProps {
    comment: MemCommentRepDto;
    currentUserId?: number | null;
    onReply: (id: number, name: string) => void;
    onDelete: (id: number, parentId?: number) => void;
    onSave: (id: number, content: string, parentId?: number) => void;
    onToggleLike: (id: number, liked: boolean, parentId?: number) => void;
}

const MemoryCommentThread = ({
    comment,
    currentUserId,
    onReply,
    onDelete,
    onSave,
    onToggleLike,
}: MemoryCommentThreadProps) => {
    const commentId = comment.comment_id ?? 0;
    const { data: replies = [] } = useGetMemCommentChildren(commentId, {
        query: {
            enabled: commentId > 0 && (comment.reply_count ?? 0) > 0,
        },
    });

    return (
        <Comment
            comment={{ ...comment, replies } as any}
            currentUserId={currentUserId}
            onReply={onReply}
            onDelete={onDelete}
            onSave={onSave}
            onToggleLike={onToggleLike}
        />
    );
};

export const Post: React.FC<PostProps> = ({ post }) => {
    const commentInputRef = useRef<HTMLInputElement>(null);
    const editImageInputRef = useRef<HTMLInputElement>(null);
    const queryClient = useQueryClient();
    const router = useRouter();
    const { openModal, closeModal } = useModalStore();
    const [newComment, setNewComment] = useState("");
    const [showMenu, setShowMenu] = useState(false);
    const [isEditingPost, setIsEditingPost] = useState(false);
    const [editTitle, setEditTitle] = useState(post.name ?? "");
    const [editContent, setEditContent] = useState(post.content ?? "");
    const [editImageFile, setEditImageFile] = useState<File | null>(null);
    const [editImagePreview, setEditImagePreview] = useState("");
    const [isUpdatingPost, setIsUpdatingPost] = useState(false);
    // 어떤 댓글에 답글을 다는지 저장 (null이면 일반 댓글, id가 있으면 대댓글)
    const [replyTo, setReplyTo] = useState<{ id: number; name: string } | null>(null);
    const memoryId = post.memory_id!;
    // 1. 유저 정보 및 포스트 상세 데이터 가져오기
    const { data: loginUserId } = useGetLoginedUserId();
    const { data: starData, refetch: refetchStarInfo } = useSelectMemoryStarByMemId(memoryId);
    const { data: rawComments, refetch: refetchComments } = useGetMemComment(memoryId);
    const currentPost = starData || post;
    const isPostOwner = currentPost.writer_id !== undefined && currentPost.writer_id === loginUserId;

    useEffect(() => {
        if (!isEditingPost) {
            setEditTitle(currentPost.name ?? "");
            setEditContent(currentPost.content ?? "");
            setEditImageFile(null);
            setEditImagePreview("");
        }
    }, [currentPost.name, currentPost.content, isEditingPost]);

    useEffect(() => {
        if (!editImageFile) return;

        const nextPreview = URL.createObjectURL(editImageFile);
        setEditImagePreview(nextPreview);

        return () => {
            URL.revokeObjectURL(nextPreview);
        };
    }, [editImageFile]);

    const refreshComments = async (parentId?: number) => {
        if (parentId) {
            await queryClient.invalidateQueries({
                queryKey: getGetMemCommentChildrenQueryKey(parentId),
            });
            return;
        }

        await refetchComments();
    };

    // 2. 좋아요 관련 Mutation 훅
    const { mutate: addLike } = useCreateLikeMemoryStar();
    const { mutate: cancelLike } = useDeleteLikeMemoryStar();

    // 3. 댓글 작성 Mutation 훅
    const { mutate: createComment } = useCreateMemComment({
        mutation: {
            onSuccess: async (_data, variables) => {
                setNewComment("");
                setReplyTo(null);
                await refetchComments(); // 목록 갱신
                refetchStarInfo(); // 댓글 개수 갱신
                const parentId = variables.data.parent_id;
                if (parentId) {
                    queryClient.invalidateQueries({
                        queryKey: getGetMemCommentChildrenQueryKey(parentId),
                    });
                }
            }
        }
    });

    // 4. 댓글 삭제 Mutation 훅
    const { mutate: deleteCommentAction } = useDeleteMemComment({
        mutation: {
            onSuccess: () => {
                refetchComments();
                refetchStarInfo();
            }
        }
    });

    // 5. 댓글 수정 Mutation 훅
    const { mutate: saveCommentAction } = useUpdateMemComment({
        mutation: {
            onSuccess: () => refetchComments()
        }
    });

    const { mutate: likeComment } = useLikeMemComment();
    const { mutate: unlikeComment } = useUnLikeMemComment();
    const { mutate: deleteMemoryStar } = useDeleteMemoryStar({
        mutation: {
            onSuccess: () => {
                closeModal();
                router.push("/community/memory");
            },
        },
    });

    // 좋아요 토글 로직 대체
    const toggleLike = (type: "LIKE1" | "LIKE2" | "LIKE3") => {
        const isCurrentlyLiked = currentPost.reactions?.[type]?.isLiked;

        if (isCurrentlyLiked) {
            cancelLike({ memoryId, type }, { onSuccess: () => refetchStarInfo() });
        } else {
            addLike({ memoryId, type }, { onSuccess: () => refetchStarInfo() });
        }
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            createComment({
                data: {
                    content: newComment.trim(),
                    memory_id: memoryId,
                    parent_id: replyTo ? replyTo.id : null,
                }
            });
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleAddComment();
        }
    };

    const handleReplyClick = (id: number, name: string) => {
        setReplyTo({ id, name });
        if (commentInputRef.current) {
            commentInputRef.current.focus();
            commentInputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    const handleToggleCommentLike = (commentId: number, liked: boolean, parentId?: number) => {
        const mutationOptions = {
            onSuccess: () => {
                refreshComments(parentId);
            },
        };

        if (liked) {
            unlikeComment({ commentId }, mutationOptions);
        } else {
            likeComment({ commentId }, mutationOptions);
        }
    };

    const handleEditPost = () => {
        if (!isPostOwner) return;
        setShowMenu(false);
        setEditTitle(currentPost.name ?? "");
        setEditContent(currentPost.content ?? "");
        setEditImageFile(null);
        setEditImagePreview("");
        setIsEditingPost(true);
    };

    const handleSelectEditImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setEditImageFile(file);
    };

    const handleUpdatePost = async () => {
        if (!isPostOwner) return;
        if (!editTitle.trim() || !editContent.trim()) return;

        const formData = new FormData();
        formData.append("name", editTitle.trim());
        formData.append("content", editContent.trim());
        if (currentPost.activityCtg) {
            formData.append("activityCtg", currentPost.activityCtg);
        }
        if (currentPost.shared !== undefined) {
            formData.append("shared", String(currentPost.shared));
        }
        if (editImageFile) {
            formData.append("img_url", editImageFile);
        }

        setIsUpdatingPost(true);
        try {
            await customInstance({
                url: `/memory-stars/${memoryId}`,
                method: "PATCH",
                data: formData,
            });
            setIsEditingPost(false);
            setEditImageFile(null);
            setEditImagePreview("");
            refetchStarInfo();
        } catch (error) {
            console.error("추억글 수정 중 오류 발생:", error);
            alert("추억글 수정에 실패했습니다.");
        } finally {
            setIsUpdatingPost(false);
        }
    };

    const postImageSrc = editImagePreview || (currentPost.img_url ? resolveImageSrc(currentPost.img_url) : "");

    const handleDeletePost = () => {
        if (!isPostOwner) return;
        setShowMenu(false);
        openModal("CONFIRM", {
            title: "추억글을 삭제하시겠습니까?",
            description: "삭제한 추억글은 되돌릴 수 없습니다.",
            onConfirm: () => deleteMemoryStar({ memoryId }),
        });
    };

    // 일반 댓글 목록은 별도로 받고, 각 댓글의 답글은 /memory-comments/{commentId}/replies로 조회한다.
    const organizedComments = useMemo(() => {
        return rawComments?.content || [];
    }, [rawComments]);

    return (
        <PostWrapper>
            <Header>
                {/* 글쓴이 이미지 받아와야 함 */}
                <Author><AuthorImage src={"/maru.svg"} alt="" width={36} height={36} />
                    <Nickname>{currentPost.writer_name}</Nickname></Author>
                {isPostOwner && (
                    <>
                        <More onClick={() => setShowMenu((prev) => !prev)}>
                            <Image src={more} alt="" width={48} height={48} />
                        </More>
                        {showMenu && (
                            <ContextMenu
                                $top="40px"
                                onEdit={handleEditPost}
                                onDelete={handleDeletePost}
                            />
                        )}
                    </>
                )}
            </Header>
            <Body>
                <ContentWrapper>
                    {isEditingPost ? (
                        <>
                            <EditInput
                                value={editTitle}
                                onChange={(event) => setEditTitle(event.target.value)}
                                placeholder="제목을 입력하세요."
                            />
                            <EditTextarea
                                value={editContent}
                                onChange={(event) => setEditContent(event.target.value)}
                                placeholder="내용을 입력하세요."
                            />
                            <EditFileInput
                                ref={editImageInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleSelectEditImage}
                            />
                            <EditActions>
                                <EditButton type="button" onClick={() => editImageInputRef.current?.click()}>
                                    이미지 변경
                                </EditButton>
                            </EditActions>
                            <EditActions>
                                <EditButton type="button" onClick={() => setIsEditingPost(false)}>
                                    취소
                                </EditButton>
                                <EditButton type="button" onClick={handleUpdatePost} disabled={isUpdatingPost}>
                                    {isUpdatingPost ? "저장 중" : "저장"}
                                </EditButton>
                            </EditActions>
                        </>
                    ) : (
                        <>
                            <Title>{currentPost.name}</Title>
                            <Content>{currentPost.content}</Content>
                        </>
                    )}
                </ContentWrapper>
                {postImageSrc && <PostImage src={postImageSrc} alt="" width={328} height={328} />}
            </Body>
            <Footer>
                <LikeSection>
                    <LikeButton $active={currentPost.reactions?.["LIKE1"]?.isLiked ?? false} onClick={() => toggleLike("LIKE1")}>
                        🥰 {currentPost.reactions?.["LIKE1"]?.count || 0}
                    </LikeButton>
                    <LikeButton $active={currentPost.reactions?.["LIKE2"]?.isLiked ?? false} onClick={() => toggleLike("LIKE2")}>
                        😮 {currentPost.reactions?.["LIKE2"]?.count || 0}
                    </LikeButton>
                    <LikeButton $active={currentPost.reactions?.["LIKE3"]?.isLiked ?? false} onClick={() => toggleLike("LIKE3")}>
                        😢 {currentPost.reactions?.["LIKE3"]?.count || 0}
                    </LikeButton>
                </LikeSection>
                <Count>
                    <Image src={comment} alt="" width={24} height={24} /> {currentPost.commentNumber || 0}
                </Count>
            </Footer>
            {/* 이 사이에 검은색 구분선 넣어야 함 */}
            <CommentInputContainer>
                {replyTo && (
                    <div style={{ fontSize: "12px", color: "gray", marginBottom: "4px" }}>
                        <span>{replyTo.name}님께 답글 남기는 중...</span>
                        <button onClick={() => setReplyTo(null)}>취소</button>
                    </div>
                )}
                <CommentInput
                    ref={commentInputRef}
                    type="text"
                    placeholder={replyTo ? "답글을 입력하세요..." : "댓글을 입력하세요..."}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <SubmitButton onClick={handleAddComment}><Image src={send} alt="" /></SubmitButton>
            </CommentInputContainer>
            <div>
                {organizedComments.length > 0 ? (
                    organizedComments.map((comment) => (
                        <MemoryCommentThread
                            key={comment.comment_id}
                            comment={comment}
                            currentUserId={loginUserId}
                            onReply={handleReplyClick}
                            onDelete={(id, parentId) => {
                                deleteCommentAction(
                                    { commentId: id },
                                    {
                                        onSuccess: () => {
                                            refreshComments(parentId);
                                            refetchStarInfo();
                                        },
                                    },
                                );
                            }}
                            onSave={(id, content, parentId) => {
                                saveCommentAction(
                                    { data: { comment_id: id, content } },
                                    { onSuccess: () => refreshComments(parentId) },
                                );
                            }}
                            onToggleLike={handleToggleCommentLike}
                        />
                    ))
                ) : (
                    <NoComment>아직 댓글이 없어요. <br />가장 먼저 댓글을 남겨보세요.</NoComment>
                )}
            </div>
        </PostWrapper>
    );
};
