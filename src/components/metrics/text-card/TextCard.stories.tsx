import { Meta, StoryObj } from "@storybook/react";
import TextCard from "./TextCard";

const meta = {
  title: "Metrics/Text Card",
  component: TextCard,
  parameters: {
    layout: "centered",
  },
  // tags: ["autodocs"],
} satisfies Meta<typeof TextCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Testing a title",
    content: "This is some text content",
  },
};

export const LongerContent: Story = {
  args: {
    title: "Long Content Card",
    content:
      "This is some really long content that hopefully wraps onto a new line. We still need to decide if the card grows in height, or if the card body scrolls. This is right at the end of the content so hopefully it scrolls when setting the correct property. ",
  },
};
