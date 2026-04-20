import styled from "styled-components";
import Image from "next/image";

export const PostWrapper = styled.div<{ $clickable?: boolean }>`
  width: 328px;
  background-color: #1f2027;
  color: #fff;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
`;

export const Header = styled.div`
  display: flex;
  height: 36px;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
`;

export const Author = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const AuthorImage = styled(Image)`
  width: 36px;
  height: 36px;
  border-radius: 999px;
`;

export const Nickname = styled.span`
  font-family: Pretendard;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  color: #a5b4c5;
`;

export const More = styled.button`
  border: none;
  background: none;
`;

export const Body = styled.div`
  width: 100%;
  padding-top: 16px;
  padding-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Title = styled.div`
  width: 100%;
  font-family: Pretendard;
  font-weight: 500;
  font-size: 20px;
  line-height: 150%;
  color: #a5b4c5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Content = styled.div`
  width: 100%;
  font-family: Pretendard;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #d9e0ed;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PostImage = styled(Image)`
  width: 100%;
  border-radius: 24px;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LikeSection = styled.span`
  display: flex;
  gap: 12px;
`;

export const LikeButton = styled.button<{ $active: boolean }>`
  background: none;
  color: ${({ $active }) => ($active ? "#AFCBFB" : "#A5B4C5")};
  cursor: pointer;
  width: 70px;
  height: 36px;
  display: flex;
  gap: 3px;
  align-items: center;
  justify-content: center;
  padding-right: 16px;
  padding-left: 16px;
  border-radius: 999px;
  border: ${({ $active }) =>
    $active ? "1px solid #AFCBFB" : "1px solid #3c424b"};
  white-space: nowrap;
`;

export const Count = styled.span`
  width: 70px;
  height: 36px;
  padding-right: 16px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: Pretendard;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #5d636f;
`;
