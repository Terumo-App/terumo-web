import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --background: #F7F7F7;
    --sub-background: #F0F2F5;
    --ligth-grey: #f0f0f0;
    --orange: #FF681E;
    --dark-grey: #707070;
    --white: #FFF;
    --grey: #858585;
    --dark-red: #702331;
    --ligth-wine: #A33B4E;
    --active-red: #610111;
    --red: #FF300F;
    --brown: #473D3D;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }

    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
    background: var(--background);
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ButtonSecondary = styled.button`
  width: 220px;
  height: 40px;
  border: 1px solid;
  border-radius: 10px;

  background-color: var(--white);
  color: var(--ligth-wine);

  font-size: medium;
  font-weight: 600;

  &:hover {
    color: var(--white);
    border-color: var(--ligth-wine);
    background-color: var(--ligth-wine);
  }

  margin-bottom: 20px;
`;

export const contentStyle: React.CSSProperties = {
  minHeight: "560px",
  textAlign: "center",
  color: "#f0f0f0",
  backgroundColor: "#FFF",
  borderRadius: "10px",
  border: `1px solid #f0f0f0`,
  marginTop: 16,
  paddingBottom: 40,
};
