import styled, { css, keyframes } from "styled-components";

const warningAnimationKeyFrames = keyframes`
    0% {transform: scale(0.8)}
    50% {transform: scale(1.0)}
    100% {transform: scale(0.8)}
`

const warningAnimation = () => css`${warningAnimationKeyFrames} 1s infinite`;

const WarningSignMarkedStyledComponent = styled.div`
    animation: ${warningAnimation};
`;

export default WarningSignMarkedStyledComponent;