import styled from "styled-components";

const LinkStyled = styled.span`
    color:darkslateblue;
    text-decoration: underline;
    text-decoration-color: darkslateblue;
    &:hover {
        color:darkslateblue;
        text-decoration: underline;
        text-decoration-color: rgba(59, 0, 130, 0.692);
        cursor: pointer;
    }
`;

export default LinkStyled;