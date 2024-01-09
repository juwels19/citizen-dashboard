import type { Meta, StoryObj } from "@storybook/react";
import KPICard from "./KPICard";

const meta = {
  title: "Metrics/KPI Card",
  component: KPICard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof KPICard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextMetric: Story = {
  args: {
    title: "Some metric title",
    metric: "$50,000",
  },
};
