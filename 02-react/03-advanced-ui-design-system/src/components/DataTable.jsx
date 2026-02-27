import React, { useState } from "react";
import { Table, Space, Tag, Button, Modal, Input, Form, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Section } from "../styles/theme";

const DataTable = () => {
  const [data, setData] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Manager", status: "active" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Developer", status: "active" },
    { id: 3, name: "Carol Davis", email: "carol@example.com", role: "Designer", status: "inactive" },
    { id: 4, name: "David Brown", email: "david@example.com", role: "Developer", status: "active" },
    { id: 5, name: "Eve Wilson", email: "eve@example.com", role: "Manager", status: "active" }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 60,
      sorter: (a, b) => a.id - b.id
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      filterSearch: true,
      filters: [...new Set(data.map(d => d.name))].map(name => ({ text: name, value: name })),
      onFilter: (value, record) => record.name === value
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      filters: [
        { text: "Manager", value: "Manager" },
        { text: "Developer", value: "Developer" },
        { text: "Designer", value: "Designer" }
      ],
      onFilter: (value, record) => record.role === value,
      render: (role) => {
        const colors = { Manager: "blue", Developer: "green", Designer: "purple" };
        return <Tag color={colors[role]}>{role}</Tag>;
      }
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      )
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      )
    }
  ];

  const handleEdit = (record) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Delete User",
      content: "Are you sure you want to delete this user?",
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        setData(data.filter(item => item.id !== id));
        message.success("User deleted successfully");
      }
    });
  };

  const handleAddNew = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleSubmit = (values) => {
    if (editingId) {
      setData(data.map(item => (item.id === editingId ? { ...item, ...values } : item)));
      message.success("User updated successfully");
    } else {
      const newId = Math.max(...data.map(d => d.id), 0) + 1;
      setData([...data, { id: newId, ...values }]);
      message.success("User added successfully");
    }
    setIsModalOpen(false);
  };

  return (
    <Section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2>📋 Ant Design Table</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNew}>
          Add User
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        bordered
        striped
        size="middle"
      />

      <Modal
        title={editingId ? "Edit User" : "Add New User"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input placeholder="Full name" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Role" name="role" rules={[{ required: true }]}>
            <Input placeholder="Role" />
          </Form.Item>
          <Form.Item label="Status" name="status" rules={[{ required: true }]}>
            <Input placeholder="active or inactive" />
          </Form.Item>
        </Form>
      </Modal>
    </Section>
  );
};

export default DataTable;
