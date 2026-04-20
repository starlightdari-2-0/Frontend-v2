"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Body, Container, MemoryStarList } from "./styles";
import Header from "../../components/CommunityHeader";
import { CommunityTabs } from "../../components/CommunityTabs";
import { CategoryBar } from "../../components/CommunityCategories";
import { PostCard } from "../../components/PostCard";
import { PostPreviewType } from "../../types/postPreviewType";
import NavBar from "../../components/navBar";
import { WriteButton } from "../../components/NewPostButton";
import { useGetPublicStars } from "../../api/generated/memory-star-controller/memory-star-controller";
import { GetPublicStarsCategory } from "../../api/generated/model";

const categoryMap: Record<string, GetPublicStarsCategory | undefined> = {
  전체: undefined,
  강아지: "DOG",
  고양이: "CAT",
  어류: "FISH",
  조류: "BIRD",
  파충류: "REPTILE",
  기타: "OTHER",
};

const MemoryPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'memory' | 'info'>("memory");
  const [activeCategory, setActiveCategory] = useState("전체");
  const category = categoryMap[activeCategory];
  const { data, isLoading, isError } = useGetPublicStars(
    category ? { category } : undefined,
  );

  const handleTabChange = (newTab: 'memory' | 'info') => {
    setActiveTab(newTab);
    setActiveCategory("전체");
  };

  const postList = useMemo<PostPreviewType[]>(
    () =>
      (data?.content ?? []).map((star) => ({
        id: star.memoryId ?? 0,
        author: star.writerName ?? "익명",
        title: star.name ?? "제목 없음",
        content: star.content ?? "",
        imageUrl: star.imgUrl,
        likes: {
          like1: star.reactions?.LIKE1?.count ?? 0,
          like2: star.reactions?.LIKE2?.count ?? 0,
          like3: star.reactions?.LIKE3?.count ?? 0,
        },
        comments: star.commentNumber ?? 0,
      })),
    [data?.content],
  );

  return (
    <>
      <Header title={"커뮤니티"} onTitleClick={() => router.push("/search")} />
      <Body>
        <CommunityTabs activeTab={activeTab} onChange={handleTabChange} />
        <CategoryBar
          activeTab={activeTab}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        <Container>
          {isLoading && <p style={{ textAlign: "center", marginTop: 40 }}>추억을 불러오고 있어요.</p>}
          {isError && <p style={{ textAlign: "center", marginTop: 40 }}>추억을 불러오지 못했습니다.</p>}
          {!isLoading && !isError && postList.length === 0 && (
            <p style={{ textAlign: "center", marginTop: 40 }}>아직 공개된 추억들이 없어요.</p>
          )}
          <MemoryStarList>
            {postList.map((postItem, index) => (
              <PostCard
                key={`${postItem.id}-${index}`}
                post={postItem}
                onClick={() => router.push(`/community/memory/${postItem.id}`)}
              />
            ))}
          </MemoryStarList>
        </Container>
        <WriteButton onClick={() => router.push("/write")} />
        <NavBar />

      </Body>
    </>
  );
};

export default MemoryPage;
