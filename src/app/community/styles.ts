import styled from "styled-components";

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 360px;
  height: calc(100vh - 90px);
  margin: 0 auto;
  color: #fff;
  position: relative;
`;

export const Container = styled.div`
  height: 100%;
  width: 328px;
  position: relative;
  overflow-y: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const MemoryStarList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
`;

export const EmptyMessage = styled.p`
  margin: 40px 0 0;
  color: #a5b4c5;
  font-family: Pretendard;
  font-size: 14px;
  line-height: 150%;
  text-align: center;
`;
