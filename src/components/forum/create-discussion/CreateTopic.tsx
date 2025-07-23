"use client";
import { Button, Form, FormProps, Input, Select, message } from "antd";
import React from "react";
import TinyMCEEditor from "../../ui/TinyMCEEditor";
import ForumService from "@/services/forum.service";

type CreateTopicType = {
  title: string;
  body: string;
  tag: string[];
};

interface CreateTopicProps {
  onSuccess?: () => void;
}

const CreateTopic: React.FC<CreateTopicProps> = ({ onSuccess }) => {
  const [form] = Form.useForm();

  const onFinish: FormProps<CreateTopicType>["onFinish"] = async (values) => {
    try {
      console.log("Form values:", values);

      const result = await ForumService.addPost({
        title: values.title,
        body: values.body,
        tag: values.tag,
      });

      message.success("Topic created successfully!");
      form.resetFields();
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error creating topic:", error);
      message.error("Failed to create topic. Please try again.");
    }
  };

  const handleEditorChange = (value: string, fieldName: string) => {
    form.setFieldValue(fieldName, value);
  };

  return (
    <Form
      form={form}
      name="createTopic"
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
      className="max-w-full"
    >
      <Form.Item<CreateTopicType>
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: "Please enter a title for your discussion",
          },
        ]}
      >
        <Input placeholder="What is your discussion about in one brief sentence?" />
      </Form.Item>

      <Form.Item<CreateTopicType>
        label="Content"
        name="body"
        rules={[
          {
            required: true,
            message: "Please enter the content of your discussion",
          },
        ]}
        getValueFromEvent={(content) => content}
      >
        <TinyMCEEditor
          placeholder="Write your discussion content here..."
          // Không cần onChange ở đây nữa
          height={300}
          disabled={false}
        />
      </Form.Item>

      <Form.Item<CreateTopicType>
        label="Tags"
        name="tag"
        rules={[{ required: true, message: "Please add at least one tag" }]}
      >
        <Select
          mode="tags"
          style={{ width: "100%" }}
          placeholder="Add tags related to your discussion"
          tokenSeparators={[","]}
          options={[
            { label: "General", value: "general" },
            { label: "Technology", value: "technology" },
            { label: "Health", value: "health" },
            { label: "Education", value: "education" },
            { label: "Lifestyle", value: "lifestyle" },
          ]}
        />
      </Form.Item>

      <Form.Item className="flex justify-end">
        <Button
          type="primary"
          htmlType="submit"
          className="bg-[#2F1667] hover:bg-[#ac92e4]"
        >
          Create Discussion
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateTopic;
