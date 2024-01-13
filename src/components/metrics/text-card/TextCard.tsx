import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TextCard({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <Card className="rounded-xl w-64 md:w-72 lg:w-80 min-h-0">
      <CardHeader>
        <CardTitle className="font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="max-h-24 overflow-scroll">
        <div tabIndex={0}>{content}</div>
      </CardContent>
    </Card>
  );
}
