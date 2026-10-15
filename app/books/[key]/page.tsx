import { Suspense } from "react";
import DetailBook from "./detail";
export const instant = false;
type Props = {
  params: Promise<{ key: string }>;
};
export default async function Page({ params }: Props) {
  <Suspense fallback={<p>loading....</p>}></Suspense>;
  const { key } = await params;
  return <DetailBook bookTitle={key} />;
}
