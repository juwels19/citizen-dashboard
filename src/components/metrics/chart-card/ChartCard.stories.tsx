import type { Meta, StoryObj } from "@storybook/react";
import ChartCard from "./ChartCard";

const meta = {
  title: "Metrics/Chart Card",
  component: ChartCard,
  parameters: {
    layout: "centered",
  },
  // tags: ["autodocs"],
} satisfies Meta<typeof ChartCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    lineType: "monotone",
  },
};

export const Loading: Story = {
  args: {
    lineType: "monotone",
    loading: true,
  },
};
