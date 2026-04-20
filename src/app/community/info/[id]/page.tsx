"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Header from "../../../../components/header";
import commentIcon from "/public/myComment.svg";
import send from "/public/send_comment.svg";
import {
  useGet,
  useGetAllPostComment,
} from "../../../../api/generated/post-controller/post-controller";
import { usePostComment } from "../../../../api/generated/post-comment-controller/post-comment-controller";
import { resolveImageSrc } from "../../../../utils/resolveImageSrc";
import {
  Author,
  AuthorImage,
  Body,
  CommentInput,
  CommentInputContainer,
  Container,
  Content,
  ContentWrapper,
  Count,
  EmptyMessage,
  Footer,
  HeaderRow,
  Nickname,
  NoComment,
  PostImage,
  PostWrapper,
  SubmitButton,
  Title,
} from "./styles";

const categoryLabelMap: Record<string, string> = {
  FUNERAL: "장례",
  PROGRAM: "프로그램",
  RECOVERY: "극복 사례",
  ETC: "기타",
};

export default function InfoPostDetailPage() {
  const params = useParams();
  const postId = Number(params?.id);
  const [newComment, setNewComment] = useState("");
  const {
    data: post,
    isLoading,
    isError,
  } = useGet(postId);
  const {
    data: comments = [],
    refetch: refetchComments,
  } = useGetAllPostComment(postId);
  const { mutate: createComment } = usePostComment({
    mutation: {
      onSuccess: () => {
        setNewComment("");
        refetchComments();
      },
    },
  });

  const categoryLabel = useMemo(() => {
    if (!post?.category) return "";
    return categoryLabelMap[post.category] ?? post.category;
  }, [post?.category]);

  const handleAddComment = () => {
    const content = newComment.trim();
    if (!content || !postId) return;
    createComment({ data: { postId, content } });
  };

  if (isLoading) {
    return (
      <Container>
        <Header title="정보 공유" backUrl="/community/info" />
        <EmptyMessage>게시글을 불러오고 있어요.</EmptyMessage>
      </Container>
    );
  }

  if (isError || !post) {
    return (
      <Container>
        <Header title="정보 공유" backUrl="/community/info" />
        <EmptyMessage>게시글을 불러오지 못했습니다.</EmptyMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Header title="정보 공유" backUrl="/community/info" />
      <PostWrapper>
        <HeaderRow>
          <Author>
            <AuthorImage src="/maru.svg" alt="" width={36} height={36} />
            <Nickname>{post.writer ?? "익명"}</Nickname>
          </Author>
          {categoryLabel && <Nickname>{categoryLabel}</Nickname>}
        </HeaderRow>

        <Body>
          <ContentWrapper>
            <Title>{post.title ?? "제목 없음"}</Title>
            <Content>{post.content ?? ""}</Content>
          </ContentWrapper>
          {post.img_url && (
            <PostImage src={resolveImageSrc(post.img_url)} alt="" width={328} height={328} />
          )}
        </Body>

        <Footer>
          <Count>
            <Image src={commentIcon} alt="" width={24} height={24} />
            {comments.length}
          </Count>
        </Footer>

        <CommentInputContainer>
          <CommentInput
            type="text"
            placeholder="댓글을 입력하세요..."
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") handleAddComment();
            }}
          />
          <SubmitButton onClick={handleAddComment}>
            <Image src={send} alt="" />
          </SubmitButton>
        </CommentInputContainer>

        {comments.length > 0 ? (
          comments.map((comment) => (
            <NoComment key={comment.comment_id}>
              {comment.writer_name ?? "익명"}: {comment.content}
            </NoComment>
          ))
        ) : (
          <NoComment>
            아직 댓글이 없어요.
            <br />
            가장 먼저 댓글을 남겨보세요.
          </NoComment>
        )}
      </PostWrapper>
    </Container>
  );
}
