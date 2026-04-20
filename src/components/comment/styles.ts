import styled from "styled-components";
import Image from "next/image";

export const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 16px;
  padding-bottom: 16px;
  gap: 16px;
`;

export const Header = styled.div`
  display: flex;
  height: 36px;
  gap: 12px;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  padding-right: 12px;
  padding-left: 12px;
  font-family: Pretendard;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #d9e0ed;
`;

export const EditInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #3c424b;
  border-radius: 8px;
  background: #2a2f39;
  color: #d9e0ed;
  padding: 10px 12px;
  font-family: Pretendard;
  font-size: 14px;
  line-height: 150%;
  outline: none;
`;

export const EditActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

export const EditButton = styled.button`
  border: 1px solid #3c424b;
  border-radius: 8px;
  background: #2a2f39;
  color: #d9e0ed;
  padding: 8px 14px;
  font-family: Pretendard;
  font-size: 13px;
  line-height: 150%;
  cursor: pointer;

  &:hover {
    background: #383a40;
  }
`;

export const AuthorImage = styled(Image)`
  width: 36px;
  height: 36px;
  border-radius: 999px;
`;

export const Nickname = styled.div`
  font-family: Pretendard;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  color: #a5b4c5;
`;

export const Date = styled.div`
  font-family: Pretendard;
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0%;
  color: #7d8799;
`;

export const Bottom = styled.div`
  width: 100%;
  min-height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Reaction = styled.div`
  display: flex;
`;

export const Item = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding-right: 12px;
  padding-left: 12px;
  font-family: Pretendard;
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;
  color: ${({ $active }) => ($active ? "#AFCBFB" : "#7d8799")};
  background: none;
  border: none;
  cursor: pointer;
`;

export const More = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
`;

export const Menu = styled.div`
  position: absolute;
  right: 0;
  top: 38px;
  width: 96px;
  background: #2b2d31;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 20;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.45);
`;

export const MenuItem = styled.button`
  background: none;
  border: none;
  color: #a5b4c5;
  padding: 10px 14px;
  font-family: Pretendard;
  font-size: 13px;
  line-height: 150%;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: #383a40;
  }
`;

export const Reply = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;

  /* ㄴ자 아이콘 뒤에 오는 Comment 컴포넌트의 너비 조절 */
  & > div:last-child {
      flex: 1;
      /* 대댓글은 부모보다 좁아져야 하므로 들여쓰기만큼 계산 */
      width: calc(100% - 36px); 
  }
`;
