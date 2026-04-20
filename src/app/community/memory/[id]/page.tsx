"use client";

import { useParams } from "next/navigation";
import Header from "../../../../components/header";
import { Post } from "../../../../components/post";
import { useSelectMemoryStarByMemId } from "../../../../api/generated/memory-star-controller/memory-star-controller";
import { MemoryStarRepDto } from "../../../../api/generated/model";
import { Container } from "./styles";

export default function MemoryPostDetailPage() {
  const params = useParams();
  const memoryId = Number(params?.id);
  const { data: postData, isLoading, isError, error } = useSelectMemoryStarByMemId(memoryId);

  if (isLoading) {
    return (
      <Container>
        <Header title="추억 저장소" backUrl="/community/memory" />
        <div style={{ padding: "20px", textAlign: "center" }}>추억을 불러오는 중입니다...</div>
      </Container>
    );
  }

  if (isError || !postData) {
    return (
      <Container>
        <Header title="추억 저장소" backUrl="/community/memory" />
        <div style={{ padding: "20px", textAlign: "center" }}>
          추억을 불러오지 못했습니다.
          <br />
          {error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다."}
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Header title="추억 저장소" backUrl="/community/memory" />
      <Post post={postData as MemoryStarRepDto} />
    </Container>
  );
}
