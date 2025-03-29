import { Session } from "next-auth";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Package, Truck, CheckCircle, Clock } from "lucide-react";

const TrackOrders = ({ user }: { user: Session["user"] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 2;

  const orders = [
    {
      status: "Delivered",
      message: "Delivered On 29 Feb 2024",
      color: "bg-green-500",
      actions: ["Buy Again"],
      awb: "123456789",
      products: [
        {
          productName: "Skull Haunted Sliders",
          size: "6",
          quantity: 1,
          productColor: "Black",
          price: 599,
          image: "/images/shoe1.png"
        }
      ],
      totalPrice: 599,
      orderDate: "25 Feb 2024",
      orderId: "ORD123456789",
      paymentMethod: "UPI",
      shippingAddress: {
        name: "John Doe",
        street: "123 Main Street",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        phone: "+91 9876543210"
      }
    },
    {
      status: "In Process",
      message: "Your Order Has Been In Process",
      color: "bg-yellow-500",
      actions: ["Cancel Order"],
      products: [
        {
          productName: "Skull Haunted Sliders",
          size: "7",
          quantity: 2,
          productColor: "White",
          price: 599,
          image: "/images/shoe1.png"
        },
        {
          productName: "Ghost Sliders",
          size: "8",
          quantity: 1,
          productColor: "Red",
          price: 699,
          image: "/images/shoe1.png"
        }
      ],
      totalPrice: 1897,
      orderDate: "1 March 2024",
      orderId: "ORD987654321",
      paymentMethod: "Credit Card",
      shippingAddress: {
        name: "Jane Smith",
        street: "456 Park Avenue",
        city: "Delhi",
        state: "Delhi",
        pincode: "110001",
        phone: "+91 9876543211"
      }
    },
    {
      status: "Shipping",
      message: "Expected Delivery On 19 March 2025",
      color: "bg-yellow-500",
      actions: ["Cancel Order"],
      awb: "987654321",
      products: [
        {
          productName: "Skull Haunted Sliders",
          size: "8",
          quantity: 1,
          productColor: "Red",
          price: 599,
          image: "/images/shoe1.png"
        }
      ],
      totalPrice: 599,
      orderDate: "5 March 2024",
      orderId: "ORD456789123",
      paymentMethod: "Cash on Delivery",
      shippingAddress: {
        name: "Mike Johnson",
        street: "789 Lake Road",
        city: "Bangalore",
        state: "Karnataka",
        pincode: "560001",
        phone: "+91 9876543212"
      }
    },
  ];

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "Shipping":
        return <Truck className="w-5 h-5 text-yellow-500" />;
      case "In Process":
        return <Package className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-coluna">My Orders</h2>
        <div className="text-sm text-gray-400 font-montserrat">
          Showing {currentOrders.length} of {orders.length} orders
        </div>
      </div>

      {currentOrders.length === 0 ? (
        <div className="text-center py-12 border border-gray-700 rounded-lg">
          <Package className="w-16 h-16 mx-auto text-gray-500 mb-4" />
          <h3 className="text-xl font-medium mb-2">No orders found</h3>
          <p className="text-gray-400 mb-6">You haven&apos;t placed any orders yet.</p>
          <Link href="/shop">
            <button className="bg-[#C2E53A] text-black px-6 py-3 rounded-sm hover:bg-[#a8c72f] transition">
              Start Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {currentOrders.map((order, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded-lg overflow-hidden bg-black/30 backdrop-blur-sm transition-all duration-300 hover:border-[#C2E53A]/50"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-700 bg-black/40">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">ORDER PLACED</p>
                    <p className="font-medium">{order.orderDate}</p>
                  </div>
                  <div className="hidden sm:block w-px h-10 bg-gray-700"></div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">ORDER ID</p>
                    <p className="font-medium font-mono">{order.orderId}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 mb-1">TOTAL</p>
                  <p className="text-xl font-medium">₹{order.totalPrice}</p>
                </div>
              </div>

              {/* Order Status */}
              <div className="flex items-center gap-2 px-6 py-3 bg-black/20 border-b border-gray-700">
                <div className="flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  <span className={`text-sm font-medium ${
                    order.status === "Delivered" ? "text-green-500" : 
                    order.status === "Shipping" ? "text-yellow-500" : 
                    "text-yellow-500"
                  }`}>
                    {order.status}
                  </span>
                </div>
                <span className="text-sm text-gray-400 ml-2">{order.message}</span>
                {order.awb && (
                  <a
                    href={`https://shiprocket.co/tracking//${order.awb}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto text-sm text-[#C2E53A] hover:underline flex items-center"
                  >
                    Track Package <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                )}
              </div>

              {/* Product Summary */}
              <div className="p-6">
                <div className="grid grid-cols-1 gap-6">
                  {order.products.map((product, productIndex) => (
                    <div key={productIndex} className="flex flex-col sm:flex-row gap-6">
                      <div className="w-full sm:w-24 h-24 bg-white rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.productName}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="text-lg font-medium mb-1">{product.productName}</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 text-sm text-gray-400 mb-3">
                          <p>Size: {product.size}</p>
                          <p>Color: {product.productColor}</p>
                          <p>Qty: {product.quantity}</p>
                          <p>Price: ₹{product.price}</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-3 mt-4">
                          <Link href={`/product-details/${product.productName.toLowerCase().replace(/\s+/g, '-')}`}>
                            <button className="border border-gray-600 px-4 py-2 rounded-sm hover:bg-gray-800 transition text-sm">
                              View Product
                            </button>
                          </Link>
                          
                          {productIndex === 0 && order.actions.map((action, i) => (
                            <button
                              key={i}
                              className={`px-4 py-2 rounded-sm text-sm ${
                                action === "Cancel Order"
                                  ? "bg-[#9C2918] hover:bg-[#7a1f12]"
                                  : "bg-[#C2E53A] hover:bg-[#a8c72f] text-black"
                              }`}
                            >
                              {action}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Link href={`/track-order/${order.orderId}`}>
                  <button className="w-full mt-6 py-3 border border-[#C2E53A] text-[#C2E53A] rounded-sm hover:bg-[#C2E53A]/10 transition flex items-center justify-center">
                    View Order Details <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Pagination */}
      {orders.length > ordersPerPage && (
        <div className="flex justify-center items-center mt-10">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-700 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition"
          >
            Previous
          </button>
          <div className="px-6 py-2 font-medium">
            {currentPage} of {totalPages}
          </div>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-700 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TrackOrders;
