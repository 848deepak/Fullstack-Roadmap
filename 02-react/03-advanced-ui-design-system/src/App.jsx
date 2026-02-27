import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { ConfigProvider } from "antd";
import { muiTheme } from "./styles/theme";
import { PageContainer } from "./styles/theme";
import Dashboard from "./components/Dashboard";
import DataTable from "./components/DataTable";
import ReusableComponents from "./components/ReusableComponents";

const App = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <ConfigProvider theme={{ token: { colorPrimary: "#6c5ce7" } }}>
        <PageContainer>
          <header style={{ marginBottom: 40, textAlign: "center" }}>
            <h1 style={{ margin: 0, fontSize: 36, color: "#101828" }}>
              🎯 Advanced UI Design Patterns
            </h1>
            <p style={{ color: "#667085", marginTop: 8 }}>
              Material UI, Ant Design & Styled Components showcase
            </p>
          </header>

          <Dashboard />
          <DataTable />
          <ReusableComponents />
        </PageContainer>
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default App;
