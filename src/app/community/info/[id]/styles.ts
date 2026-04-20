export {
  Author,
  AuthorImage,
  Body,
  CommentInput,
  CommentInputContainer,
  Content,
  ContentWrapper,
  Count,
  Footer,
  Nickname,
  NoComment,
  PostImage,
  PostWrapper,
  SubmitButton,
  Title,
} from "../../../../components/post/styles";

export { Header as HeaderRow } from "../../../../components/post/styles";

import styled from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  color: #a5b4c5;
  display: flex;
  flex-direction: column;
  width: 360px;
  min-height: 100vh;
  min-width: 360px;
  max-width: 767px;
  opacity: 1;
  padding-right: 16px;
  padding-left: 16px;
  background-color: #1f2027;
  position: relative;
`;

export const EmptyMessage = styled.div`
  padding: 40px 0;
  text-align: center;
  color: #a5b4c5;
  font-family: Pretendard;
  font-size: 14px;
  line-height: 150%;
`;
