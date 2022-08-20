import styled from "styled-components";
import TileSizeStyled from "./TileSizeStyled";

const TileStyled = styled(TileSizeStyled)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url('/images/tile_unchecked.png');
    &:hover {
        background-image: url('/images/tile_unchecked_dark.png');
        cursor: pointer;
    }
`;

export default TileStyled;