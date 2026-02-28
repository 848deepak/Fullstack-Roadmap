import React from "react";
import {
  Grid,
  Paper,
  Card,
  CardContent,
  CardHeader,
  LinearProgress,
  Box,
  Typography
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import { StatsCard, Section } from "../styles/theme";

const Dashboard = () => {
  const statsData = [
    { label: "Total Users", value: "2,481", color: "#6c5ce7", colorDark: "#5f3dc4" },
    { label: "Revenue", value: "$48.5K", color: "#00b894", colorDark: "#00a383" },
    { label: "Orders", value: "1,234", color: "#00b4db", colorDark: "#0984e3" },
    { label: "Growth", value: "+23%", color: "#fdcb6e", colorDark: "#fab1a0" }
  ];

  const chartData = [
    { month: "Jan", sales: 4000, users: 2400 },
    { month: "Feb", sales: 3000, users: 1398 },
    { month: "Mar", sales: 2000, users: 9800 },
    { month: "Apr", sales: 2780, users: 3908 },
    { month: "May", sales: 1890, users: 4800 },
    { month: "Jun", sales: 2390, users: 3800 }
  ];

  const tasks = [
    { name: "Website Redesign", progress: 75, status: "In Progress" },
    { name: "API Integration", progress: 40, status: "In Progress" },
    { name: "Testing", progress: 90, status: "Near Complete" },
    { name: "Deployment", progress: 20, status: "Pending" }
  ];

  return (
    <Section>
      <h2>📊 Material UI Dashboard</h2>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsData.map((stat, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <StatsCard color={stat.color} colorDark={stat.colorDark}>
              <h3>{stat.label}</h3>
              <p className="value">{stat.value}</p>
              <p className="label">+2.5% from last month</p>
            </StatsCard>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardHeader title="Sales Trend" subheader="Last 6 months" />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#6c5ce7" />
                  <Line type="monotone" dataKey="users" stroke="#00b894" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardHeader title="Revenue" subheader="Monthly comparison" />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#6c5ce7" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tasks */}
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Project Tasks
        </Typography>
        {tasks.map((task, idx) => (
          <Box key={idx} sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {task.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "20px",
                  background: task.progress > 70 ? "#d4edda" : "#fff3cd",
                  color: task.progress > 70 ? "#155724" : "#856404"
                }}
              >
                {task.status}
              </Typography>
            </Box>
            <LinearProgress variant="determinate" value={task.progress} sx={{ height: 6, borderRadius: 3 }} />
            <Typography variant="caption" sx={{ color: "#666", mt: 0.5 }}>
              {task.progress}%
            </Typography>
          </Box>
        ))}
      </Paper>
    </Section>
  );
};

export default Dashboard;
