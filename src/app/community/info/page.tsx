"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../components/CommunityHeader";
import { CategoryBar } from "../../../components/CommunityCategories";
import { CommunityTabs } from "../../../components/CommunityTabs";
import { WriteButton } from "../../../components/NewPostButton";
import { PostCard } from "../../../components/PostCard";
import NavBar from "../../../components/navBar";
import { useGetAll } from "../../../api/generated/post-controller/post-controller";
import { PostPreviewType } from "../../../types/postPreviewType";
import { Body, Container, EmptyMessage, MemoryStarList } from "./styles";

const categoryMap: Record<string, string | undefined> = {
  전체: undefined,
  장소: "PLACE",
  보험: "INSURANCE",
  장례: "FUNERAL",
  기타: "ETC",
};

export default function InfoCommunityPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("전체");
  const category = categoryMap[activeCategory];
  const { data: posts = [], isLoading, isError } = useGetAll(
    category ? { category } : undefined,
  );

  const postList = useMemo<PostPreviewType[]>(
    () =>
      posts.map((post) => ({
        id: post.post_id ?? 0,
        author: "익명",
        title: post.title ?? "제목 없음",
        content: post.content ?? "",
        likes: {
          like1: 0,
          like2: 0,
          like3: 0,
        },
        comments: 0,
      })),
    [posts],
  );

  return (
    <>
      <Header title="커뮤니티" onTitleClick={() => router.push("/search")} />
      <Body>
        <CommunityTabs
          activeTab="info"
          onChange={(tab) => {
            if (tab === "memory") router.push("/community/memory");
          }}
        />
        <CategoryBar
          activeTab="info"
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        <Container>
          {isLoading && <EmptyMessage>게시글을 불러오고 있어요.</EmptyMessage>}
          {isError && <EmptyMessage>게시글을 불러오지 못했습니다.</EmptyMessage>}
          {!isLoading && !isError && postList.length === 0 && (
            <EmptyMessage>아직 등록된 정보 공유 글이 없어요.</EmptyMessage>
          )}
          <MemoryStarList>
            {postList.map((postItem, index) => (
              <PostCard
                key={`${postItem.id}-${index}`}
                post={postItem}
                onClick={() => router.push(`/community/info/${postItem.id}`)}
              />
            ))}
          </MemoryStarList>
        </Container>

        <WriteButton onClick={() => router.push("/write")} />
        <NavBar />
      </Body>
    </>
  );
}
