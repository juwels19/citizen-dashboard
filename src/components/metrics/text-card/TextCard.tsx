import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TextCard({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  // w-64 md:w-72 lg:w-80
  return (
    <Card className="rounded-xl col-span-4">
      <CardHeader>
        <CardTitle className="font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="max-h-24 overflow-scroll">
        <div tabIndex={0}>{content}</div>
      </CardContent>
    </Card>
  );
}
