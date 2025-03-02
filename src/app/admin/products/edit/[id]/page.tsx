// app/admin/products/edit/[id]/page.tsx
import {EditProductForm} from '@/components/admin/edit-product-form';

export default function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-[#1c1c1c] mb-6">
        Edit Product
      </h1>
      <EditProductForm productId={params.id} />
    </div>
  );
}