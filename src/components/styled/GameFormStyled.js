import styled, {css, keyframes} from "styled-components";

const fadeInKeyFrames = keyframes`
    from { opacity: 0; }
    to   { opacity: 1; }
`

const fadeIn = () => css`${fadeInKeyFrames} 0.5`;

const GameFormStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 1px 5px black;
    width: 300px;
    animation: ${fadeIn};
`;

export default GameFormStyled;