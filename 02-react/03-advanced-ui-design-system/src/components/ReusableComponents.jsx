import React from "react";
import styled from "@emotion/styled";
import { Section } from "../styles/theme";

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

const CustomCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border-left: 4px solid ${props => props.borderColor || "#6c5ce7"};

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  .card-header {
    background: linear-gradient(135deg, ${props => props.bgColor || "#6c5ce7"} 0%, ${props => props.bgColorDark || "#5f3dc4"} 100%);
    color: white;
    padding: 16px;

    h3 {
      margin: 0 0 4px;
      font-size: 16px;
      font-weight: 600;
    }

    p {
      margin: 0;
      font-size: 12px;
      opacity: 0.9;
    }
  }

  .card-body {
    padding: 16px;

    p {
      margin: 0 0 12px;
      color: #555;
      line-height: 1.6;
    }
  }

  .card-footer {
    background: #f9f9f9;
    padding: 12px 16px;
    display: flex;
    gap: 8px;
    border-top: 1px solid #eee;

    button {
      flex: 1;
      padding: 8px 12px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.2s ease;

      &.primary {
        background: ${props => props.bgColor || "#6c5ce7"};
        color: white;

        &:hover {
          background: ${props => props.bgColorDark || "#5f3dc4"};
        }
      }

      &.secondary {
        background: #f0f0f0;
        color: #333;

        &:hover {
          background: #e0e0e0;
        }
      }
    }
  }
`;

const Badge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => {
    switch (props.type) {
      case "success":
        return "#d4edda";
      case "warning":
        return "#fff3cd";
      case "danger":
        return "#f8d7da";
      default:
        return "#d1ecf1";
    }
  }};
  color: ${props => {
    switch (props.type) {
      case "success":
        return "#155724";
      case "warning":
        return "#856404";
      case "danger":
        return "#721c24";
      default:
        return "#0c5460";
    }
  }};
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &.primary {
    background: #6c5ce7;
    color: white;
    &:hover { background: #5f3dc4; }
  }

  &.secondary {
    background: #f0f0f0;
    color: #333;
    &:hover { background: #e0e0e0; }
  }

  &.danger {
    background: #d63031;
    color: white;
    &:hover { background: #b71c1c; }
  }
`;

const ReusableComponents = () => {
  const products = [
    {
      id: 1,
      title: "Premium Design Kit",
      desc: "Complete UI kit with 500+ components",
      badge: "Popular",
      color: "#6c5ce7",
      colorDark: "#5f3dc4"
    },
    {
      id: 2,
      title: "React Template",
      desc: "Production-ready React dashboard",
      badge: "New",
      color: "#00b894",
      colorDark: "#00a383"
    },
    {
      id: 3,
      title: "Icon Library",
      desc: "2000+ beautiful SVG icons",
      badge: "Best",
      color: "#00b4db",
      colorDark: "#0984e3"
    }
  ];

  return (
    <Section>
      <h2>🎨 Reusable Styled Components</h2>

      <CardContainer>
        {products.map(product => (
          <CustomCard
            key={product.id}
            bgColor={product.color}
            bgColorDark={product.colorDark}
            borderColor={product.color}
          >
            <div className="card-header">
              <h3>{product.title}</h3>
              <p>{product.badge}</p>
            </div>
            <div className="card-body">
              <p>{product.desc}</p>
              <Badge type={product.badge === "Popular" ? "success" : product.badge === "New" ? "warning" : "danger"}>
                {product.badge}
              </Badge>
            </div>
            <div className="card-footer">
              <button className="primary">View</button>
              <button className="secondary">Learn</button>
            </div>
          </CustomCard>
        ))}
      </CardContainer>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Button className="primary">Primary Button</Button>
        <Button className="secondary">Secondary Button</Button>
        <Button className="danger">Danger Button</Button>
      </div>
    </Section>
  );
};

export default ReusableComponents;
