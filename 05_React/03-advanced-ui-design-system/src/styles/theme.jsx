import styled from "@emotion/styled";
import { createTheme } from "@mui/material/styles";

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#6c5ce7",
      light: "#a29bfe",
      dark: "#5f3dc4"
    },
    secondary: {
      main: "#00b4db",
      light: "#74b9ff",
      dark: "#0984e3"
    },
    success: {
      main: "#00b894"
    },
    warning: {
      main: "#fdcb6e"
    },
    error: {
      main: "#d63031"
    },
    background: {
      default: "#f5f6fa",
      paper: "#ffffff"
    }
  },
  typography: {
    fontFamily: "'Segoe UI', 'Roboto', sans-serif",
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 }
  }
});

export const StatsCard = styled.div`
  background: linear-gradient(135deg, ${props => props.color || "#6c5ce7"} 0%, ${props => props.colorDark || "#5f3dc4"} 100%);
  color: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  h3 {
    margin: 0 0 8px;
    font-size: 14px;
    opacity: 0.9;
    font-weight: 500;
  }

  .value {
    font-size: 32px;
    font-weight: 700;
    margin: 0;
  }

  .label {
    font-size: 12px;
    opacity: 0.8;
    margin-top: 8px;
  }
`;

export const PageContainer = styled.div`
  min-height: 100vh;
  background: #f5f6fa;
  padding: 32px 24px;

  @media (max-width: 600px) {
    padding: 16px 12px;
  }
`;

export const Section = styled.section`
  margin-bottom: 32px;

  h2 {
    font-size: 28px;
    margin: 0 0 16px;
    color: #101828;
  }

  @media (max-width: 600px) {
    h2 {
      font-size: 22px;
    }
  }
`;
