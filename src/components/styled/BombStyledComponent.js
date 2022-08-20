import styled, { css, keyframes } from "styled-components";
import TileSizeStyled from "./TileSizeStyled";

const bombAnimationKeyFrames = keyframes`
    0% {transform: rotate(0deg)}
    100% {transform: rotate(360deg)}
`

const bombAnimation = () => css`${bombAnimationKeyFrames} 1s infinite`;

const BombStyledComponent = styled(TileSizeStyled)`
    animation: ${(props) => props.rotating ? bombAnimation : "none"};
    animation-timing-function: ${(props) => props.rotating ? "linear" : "none"};
    transform: ${(props) => props.rotating ? "scale(0.9)" : "none"};
`;

export default BombStyledComponent;