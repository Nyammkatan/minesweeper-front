import styled from "styled-components";
import TileSizeStyled from "./TileSizeStyled";

const TileEmptyStyled = styled(TileSizeStyled)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url('/images/tile_empty.png');
    font-family: "Lucida Console", "Courier New", monospace;
    font-size: 18px;
`;

export default TileEmptyStyled;