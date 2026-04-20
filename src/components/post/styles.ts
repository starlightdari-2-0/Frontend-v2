import styled from "styled-components";
import Image from "next/image";

export const PostWrapper = styled.div`
  width: 100%;
  background-color: #1f2027;
  color: #fff;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Header = styled.div`
  display: flex;
  height: 36px;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  position: relative;
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
  cursor: pointer;
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
`;

export const Content = styled.div`
  width: 100%;
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
  font-size: 18px;
  line-height: 150%;
  outline: none;
`;

export const EditTextarea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  min-height: 120px;
  border: 1px solid #3c424b;
  border-radius: 8px;
  background: #2a2f39;
  color: #d9e0ed;
  padding: 10px 12px;
  font-family: Pretendard;
  font-size: 14px;
  line-height: 150%;
  outline: none;
  resize: vertical;
`;

export const EditActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const EditButton = styled.button`
  border: 1px solid #3c424b;
  border-radius: 8px;
  background: #2a2f39;
  color: #d9e0ed;
  padding: 8px 14px;
  cursor: pointer;
`;

export const EditFileInput = styled.input`
  display: none;
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
  min-width: 70px;
  height: 36px;
  padding-right: 16px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  font-family: Pretendard;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #5d636f;
`;

export const CommentInputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 0;
  gap: 8px;
`;

export const CommentInput = styled.input`
  flex: 1;
  border: none;
  font-size: 14px;
  background: #2a2f39;
  color: white; // 변경 필요
  outline: none;
  height: 24px;
  padding-top: 8px;
  padding-right: 16px;
  padding-bottom: 8px;
  padding-left: 16px;
  border-radius: 12px;

  &::placeholder {
    color: #7d8799;
    // font-family: "Pretendard-Regular", sans-serif;
    font-family: Pretendard;
    font-weight: 400;
    font-style: Regular;
    font-size: 14px;
    line-height: 150%;
  }
`;

export const SubmitButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const NoComment = styled.div`
  width: 100%;
  height: 42px;
  padding-top: 40px;
  padding-bottom: 40px;
  font-family: Pretendard;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  text-align: center;
  color: #7d8799;
`;
