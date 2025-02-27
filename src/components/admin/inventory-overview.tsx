import { Package, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react"

export function InventoryOverview() {
  const metrics = [
    { title: "Total Products", value: "1,234", icon: Package, color: "bg-blue-100 text-blue-800" },
    { title: "Low Stock Items", value: "23", icon: AlertTriangle, color: "bg-yellow-100 text-yellow-800" },
    { title: "Out of Stock", value: "5", icon: TrendingDown, color: "bg-red-100 text-red-800" },
    { title: "Restock Alerts", value: "12", icon: TrendingUp, color: "bg-green-100 text-green-800" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <div key={index} className={`p-4 rounded-lg ${metric.color}`}>
          <div className="flex items-center">
            <metric.icon className="h-8 w-8 mr-3" />
            <div>
              <p className="text-sm font-medium">{metric.title}</p>
              <p className="text-2xl font-semibold">{metric.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

