import { Session } from "next-auth";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Package,
  Truck,
  CheckCircle,
  Clock,
  Loader,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Order, orderApi, OrderItems } from "@/lib/api/orders";

export const formateDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-In", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const TrackOrders = ({ user }: { user: Session["user"] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentOrders, setCurrentOrders] = useState<Order[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const ordersPerPage = 2;
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  // const orders = [
  //   {
  //     status: "Delivered",
  //     message: "Delivered On 29 Feb 2024",
  //     color: "bg-green-500",
  //     actions: ["Buy Again"],
  //     awb: "123456789",
  //     products: [
  //       {
  //         productName: "Skull Haunted Sliders",
  //         size: "6",
  //         quantity: 1,
  //         productColor: "Black",
  //         price: 599,
  //         image: "/images/shoe1.png",
  //       },
  //     ],
  //     totalPrice: 599,
  //     orderDate: "25 Feb 2024",
  //     orderId: "ORD123456789",
  //     paymentMethod: "UPI",
  //     shippingAddress: {
  //       name: "John Doe",
  //       street: "123 Main Street",
  //       city: "Mumbai",
  //       state: "Maharashtra",
  //       pincode: "400001",
  //       phone: "+91 9876543210",
  //     },
  //   },
  //   {
  //     status: "In Process",
  //     message: "Your Order Has Been In Process",
  //     color: "bg-yellow-500",
  //     actions: ["Cancel Order"],
  //     products: [
  //       {
  //         productName: "Skull Haunted Sliders",
  //         size: "7",
  //         quantity: 2,
  //         productColor: "White",
  //         price: 599,
  //         image: "/images/shoe1.png",
  //       },
  //       {
  //         productName: "Ghost Sliders",
  //         size: "8",
  //         quantity: 1,
  //         productColor: "Red",
  //         price: 699,
  //         image: "/images/shoe1.png",
  //       },
  //     ],
  //     totalPrice: 1897,
  //     orderDate: "1 March 2024",
  //     orderId: "ORD987654321",
  //     paymentMethod: "Credit Card",
  //     shippingAddress: {
  //       name: "Jane Smith",
  //       street: "456 Park Avenue",
  //       city: "Delhi",
  //       state: "Delhi",
  //       pincode: "110001",
  //       phone: "+91 9876543211",
  //     },
  //   },
  //   {
  //     status: "Shipping",
  //     message: "Expected Delivery On 19 March 2025",
  //     color: "bg-yellow-500",
  //     actions: ["Cancel Order"],
  //     awb: "987654321",
  //     products: [
  //       {
  //         productName: "Skull Haunted Sliders",
  //         size: "8",
  //         quantity: 1,
  //         productColor: "Red",
  //         price: 599,
  //         image: "/images/shoe1.png",
  //       },
  //     ],
  //     totalPrice: 599,
  //     orderDate: "5 March 2024",
  //     orderId: "ORD456789123",
  //     paymentMethod: "Cash on Delivery",
  //     shippingAddress: {
  //       name: "Mike Johnson",
  //       street: "789 Lake Road",
  //       city: "Bangalore",
  //       state: "Karnataka",
  //       pincode: "560001",
  //       phone: "+91 9876543212",
  //     },
  //   },
  // ];

  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders", user.email],
    queryFn: async () =>
      await orderApi.getOrders(
        currentPage.toString(),
        ordersPerPage.toString(),
        ""
      ),
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      setCurrentOrders(() =>
        data.orders.slice(indexOfFirstOrder, indexOfLastOrder)
      );
      setTotalPages(Math.ceil(data!.orders.length / ordersPerPage));
    }
  }, [data,indexOfFirstOrder, indexOfLastOrder]);

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen font-montserrat text-white">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    <div className="flex items-center justify-center h-screen font-montserrat text-white">
      <h1 className="text-2xl">Something went wrong</h1>
      <Link href="/shop">
        <button className="bg-[#C2E53A] text-black px-4 py-2 sm:px-6 sm:py-3 rounded-sm hover:bg-[#a8c72f] transition text-sm sm:text-base">
          Go Back And Continue Shopping
        </button>
      </Link>
    </div>;
  }

  return (
    data &&
    data.orders.length > 0 && (
      <div className="max-w-6xl mx-auto px-4 py-8 font-montserrat ">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <h2 className="text-4xl font-coluna mb-2 sm:mb-0">My Orders</h2>
          <div className="text-xs sm:text-sm text-gray-400 ">
            Showing {currentOrders.length} of {data.orders.length} orders
          </div>
        </div>

        {currentOrders && currentOrders.length === 0 ? (
          <div className="text-center py-12 border border-gray-700 rounded-lg">
            <Package className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-500 mb-4" />
            <h3 className="text-lg sm:text-xl font-medium mb-2">
              No orders found
            </h3>
            <p className="text-gray-400 mb-6 text-sm sm:text-base">
              You haven&apos;t placed any orders yet.
            </p>
            <Link href="/shop">
              <button className="bg-[#C2E53A] text-black px-4 py-2 sm:px-6 sm:py-3 rounded-sm hover:bg-[#a8c72f] transition text-sm sm:text-base">
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
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-6 border-b border-gray-700 bg-black/40">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 w-full sm:w-auto">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">ORDER PLACED</p>
                      <p className="font-medium text-sm sm:text-base">
                        {formateDate(order.createdAt || "")}
                      </p>
                    </div>
                    <div className="hidden sm:block w-px h-10 bg-gray-700"></div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">ORDER ID</p>
                      <p className="font-medium font-mono text-sm sm:text-base">
                        {order.id}
                      </p>
                    </div>
                  </div>
                  <div className="text-start sm:text-right mt-4 sm:mt-0 w-full sm:w-auto">
                    <p className="text-xs text-gray-400 mb-1">TOTAL</p>
                    <p className="text-lg sm:text-xl font-medium">
                      ₹{order.total}
                    </p>
                  </div>
                </div>

                {/* Order Status */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 px-4 sm:px-6 py-3 bg-black/20 border-b border-gray-700">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span
                      className={`text-sm font-medium ${
                        order.status === "Delivered"
                          ? "text-green-500"
                          : order.status === "Shipping"
                          ? "text-yellow-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  {/* <span className="text-xs sm:text-sm text-gray-400 ml-0 sm:ml-2 mt-2 sm:mt-0">
                    {order?.message || "Delivered on 24 Date"}
                  </span> */}
                  {order?.awb && (
                    <a
                      href={`https://shiprocket.co/tracking//${order.awb}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-0 sm:ml-auto text-xs sm:text-sm text-[#C2E53A] hover:underline flex items-center mt-2 sm:mt-0"
                    >
                      Track Package <ChevronRight className="w-4 h-4 ml-1" />
                    </a>
                  )}
                </div>

                {/* Product Summary */}
                <div className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 gap-6">
                    {order.items.map(
                      (product: OrderItems, productIndex: number) => (
                        <div
                          key={productIndex}
                          className="flex flex-col sm:flex-row gap-6"
                        >
                          <div className="w-full sm:w-24 h-24 bg-white rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={product.productImage}
                              alt={product.productName}
                              width={96}
                              height={96}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-grow">
                            <h3 className="text-base sm:text-lg font-medium mb-1">
                              {product.productName}
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 text-xs sm:text-sm text-gray-400 mb-3">
                              <p>Size: {product.size.split("_")[1]}</p>
                              <p>Color: {product.color}</p>
                              <p>Qty: {product.quantity}</p>
                              <p>Price: ₹{product.priceAtOrder}</p>
                            </div>

                            <div className="flex flex-wrap gap-3 mt-4">
                              <Link href={`/product/${product.productId}`}>
                                <button className="border border-gray-600 px-3 py-1 sm:px-4 sm:py-2 rounded-sm hover:bg-gray-800 transition text-xs sm:text-sm">
                                  View Product
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  <Link href={`/track-order/${order.id}`}>
                    <button className="w-full mt-6 py-2 sm:py-3 border border-[#C2E53A] text-[#C2E53A] rounded-sm hover:bg-[#C2E53A]/10 transition flex items-center justify-center text-sm sm:text-base">
                      View Order Details{" "}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {data.orders.length > ordersPerPage && (
          <div className="flex flex-col sm:flex-row justify-center items-center mt-10 gap-4 sm:gap-0">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 sm:px-4 sm:py-2 border border-gray-700 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition text-sm sm:text-base"
            >
              Previous
            </button>
            <div className="px-4 sm:px-6 py-2 font-medium text-sm sm:text-base">
              {currentPage} of {totalPages}
            </div>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages || 0))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 sm:px-4 sm:py-2 border border-gray-700 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition text-sm sm:text-base"
            >
              Next
            </button>
          </div>
        )}
      </div>
    )
  );
};

export default TrackOrders;
