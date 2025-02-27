import { DollarSign, TrendingUp, ShoppingCart, Users } from "lucide-react"

export function SalesOverview() {
  const metrics = [
    { title: "Total Revenue", value: "$12,345", icon: DollarSign, change: "+15%", changeType: "positive" },
    { title: "Sales Growth", value: "23%", icon: TrendingUp, change: "+2.5%", changeType: "positive" },
    { title: "Total Orders", value: "1,234", icon: ShoppingCart, change: "-3%", changeType: "negative" },
    { title: "New Customers", value: "321", icon: Users, change: "+10%", changeType: "positive" },
  ]

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-medium mb-4 text-[#4f507f]">Sales Overview</h2>
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0 mr-4">
              <metric.icon className="h-8 w-8 text-[#4f507f]" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{metric.title}</p>
              <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
              <p className={`text-sm ${metric.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                {metric.change}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

