import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/userApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";
import { useState, useEffect } from "react";
import Orderlist from "./Orderlist";
import Loader from "../../components/Loader";
import {
  FaDollarSign,
  FaUsers,
  FaShoppingCart,
  FaChartLine,
} from "react-icons/fa";
import { FiTrendingUp } from "react-icons/fi";

const Dashboard = () => {
  const { data: sales, isLoading, refetch } = useGetTotalSalesQuery();
  const { data: users, isLoading: loading } = useGetUsersQuery();
  const {
    data: orders,
    isLoading: loadingTwo,
    refetch: ordersRefetch,
  } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  console.log(orders, salesDetail);
  const [state, setState] = useState({
    options: {
      chart: {
        type: "area",
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
          },
        },
        background: "transparent",
        foreColor: "#fff",
      },
      theme: {
        mode: "dark",
      },
      tooltip: {
        theme: "dark",
        x: {
          format: "dd MMM yyyy",
        },
        y: {
          formatter: function (value) {
            return "$" + value.toFixed(2);
          },
        },
      },
      colors: ["#ec4899", "#8b5cf6"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.2,
          stops: [0, 90, 100],
        },
      },
      title: {
        text: "Sales Analytics",
        align: "left",
        style: {
          fontSize: "24px",
          fontWeight: "bold",
          color: "#fff",
        },
      },
      grid: {
        borderColor: "#374151",
        strokeDashArray: 4,
      },
      markers: {
        size: 5,
        colors: ["#ec4899"],
        strokeColors: "#fff",
        strokeWidth: 2,
        hover: {
          size: 7,
        },
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
          style: {
            color: "#9ca3af",
            fontSize: "14px",
          },
        },
        labels: {
          style: {
            colors: "#9ca3af",
          },
        },
      },
      yaxis: {
        title: {
          text: "Revenue ($)",
          style: {
            color: "#9ca3af",
            fontSize: "14px",
          },
        },
        labels: {
          style: {
            colors: "#9ca3af",
          },
          formatter: function (value) {
            return "$" + value.toFixed(0);
          },
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
        labels: {
          colors: "#fff",
        },
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            ...prevState.options.xaxis,
            categories: formattedSalesDate.map((item) => item.x),
          },
        },
        series: [
          { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  useEffect(() => {
    const refetchAll = async () => {
      await Promise.all([refetch(), ordersRefetch()]);
    };

    refetchAll();
  }, []);

  const stats = [
    {
      title: "Total Revenue",
      value: sales?.totalSales,
      format: "currency",
      icon: FaDollarSign,
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-500/20 to-rose-500/20",
      loading: isLoading,
      change: "+12.5%",
      changeType: "increase",
    },
    {
      title: "Total Customers",
      value: users?.length,
      format: "number",
      icon: FaUsers,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/20 to-cyan-500/20",
      loading: loading,
      change: "+8.2%",
      changeType: "increase",
    },
    {
      title: "Total Orders",
      value: orders?.totalOrders,
      format: "number",
      icon: FaShoppingCart,
      gradient: "from-purple-500 to-indigo-500",
      bgGradient: "from-purple-500/20 to-indigo-500/20",
      loading: loadingTwo,
      change: "+23.1%",
      changeType: "increase",
    },
    {
      title: "Avg Order Value",
      value: orders?.totalOrders ? sales?.totalSales / orders?.totalOrders : 0,
      format: "currency",
      icon: FiTrendingUp,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-500/20 to-emerald-500/20",
      loading: isLoading || loadingTwo,
      change: "+5.4%",
      changeType: "increase",
    },
  ];

  const formatValue = (value, format) => {
    if (format === "currency") {
      return `$${Number(value || 0).toFixed(2)}`;
    }
    return value || 0;
  };

  return (
    <div className="min-h-screen bg-black lg:ml-20 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <FaChartLine className="text-pink-500" />
            Dashboard
          </h1>
          <p className="text-gray-400">
            Welcome back! Here's what's happening with your store.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group overflow-hidden"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300`}
              ></div>

              <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-br ${stat.gradient}`}
                  >
                    <stat.icon className="text-white text-2xl" />
                  </div>
                  {stat.changeType === "increase" && (
                    <span className="text-green-500 text-sm font-semibold flex items-center gap-1">
                      <FiTrendingUp size={12} />
                      {stat.change}
                    </span>
                  )}
                </div>

                <h3 className="text-gray-400 text-sm font-medium mb-2">
                  {stat.title}
                </h3>

                {stat.loading ? (
                  <Loader />
                ) : (
                  <p
                    className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                  >
                    {formatValue(stat.value, stat.format)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div
          className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mb-8"
          style={{
            animation: "fadeInUp 0.5s ease-out 0.4s both",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500">
              <FaChartLine className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                Sales Performance
              </h2>
              <p className="text-gray-400 text-sm">
                Track your revenue over time
              </p>
            </div>
          </div>

          <Chart
            options={state.options}
            series={state.series}
            type="area"
            height={400}
          />
        </div>

        {/* Recent Orders Section */}
        <div
          className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
          style={{
            animation: "fadeInUp 0.5s ease-out 0.6s both",
          }}
        >
          <Orderlist />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
