import Link from "next/link"
import { AlertTriangle } from "lucide-react"

export function InventoryAlerts() {
  const alerts = [
    { product: "Product A", stock: 5, threshold: 10 },
    { product: "Product B", stock: 3, threshold: 15 },
    { product: "Product C", stock: 8, threshold: 20 },
    { product: "Product D", stock: 2, threshold: 5 },
  ]

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-medium mb-4 text-[#4f507f]">Inventory Alerts</h2>
      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-md">
            <div className="flex items-center gap-3">
              <AlertTriangle size={20} className="text-red-500" />
              <div>
                <p className="font-medium text-gray-900">{alert.product}</p>
                <p className="text-sm text-gray-500">
                  Stock: {alert.stock} (Threshold: {alert.threshold})
                </p>
              </div>
            </div>
            <Link href={`/admin/products/edit/${index}`} className="text-[#4f507f] hover:underline text-sm">
              Update Stock
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Link href="/admin/products/inventory" className="text-[#4f507f] hover:underline text-sm">
          View all inventory
        </Link>
      </div>
    </div>
  )
}

