import styled, { css } from "styled-components";

interface HeadingProps {
  as: "h1" | "h2" | "h3";
}

const Heading = styled.h1<HeadingProps>`
  ${({ as }) =>
    as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}
  ${({ as }) =>
    as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
  ${({ as }) =>
    as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}
  line-height: 1.4;
`;

export default Heading;
