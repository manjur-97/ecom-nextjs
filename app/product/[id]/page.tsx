import ProductDetailsClient from '@/components/ui/ProductDetailsClient';

type Props = {
  params: { id: string } | Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  // `params` can be a Promise in RSC mode — await it before reading.
  const resolved = (await params) as { id: string };
  const id = String(resolved?.id ?? "");
  return <ProductDetailsClient id={id} />;
}
