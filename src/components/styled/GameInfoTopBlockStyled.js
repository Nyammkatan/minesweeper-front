import styled from "styled-components";

export const GameInfoTopBlockStyled = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 12px;
`;

export const GameInfoTopBlockElementStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    background-image: url('/images/info-block.png');
    font-family: "Lucida Console", "Courier New", monospace;
    font-size: 22px;
    position: relative;
`;

export const GameInfoTopBlockElementPressableStyled = styled(GameInfoTopBlockElementStyled)`
    &:hover {
        cursor: pointer;
        background-image: url('/images/info-block-dark.png');
    }
`;