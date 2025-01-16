import React, { useState } from "react";
import cl from "classnames";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BsCartCheckFill,
  BsFillEyeFill,
  BsPersonCheckFill,
} from "react-icons/bs";
import { FaMoneyBill, FaRegTrashAlt } from "react-icons/fa";
import { AdminPagination } from "./adminPages";
import { MdCurrencyExchange } from "react-icons/md";
const Dashbroad = () => {
  return (
    <section>
      <div className="wrapper px-5 py-7 text-black">
        {/* greet */}
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold ">Welcome Back Admin</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta,
            necessitatibus?
          </p>
        </div>
        <div className="flex gap-3 justify-between p-5">
          <DashCard
            title={"income"}
            count={235346}
            currency={true}
            icon={<FaMoneyBill color="blue" />}
          />
          <DashCard
            title={"Orders"}
            count={2356}
            icon={<BsCartCheckFill color="green" />}
          />
          <DashCard
            title={"Expenses"}
            count={23236}
            icon={<MdCurrencyExchange color="crimson" />}
          />
          <DashCard
            title={"customers"}
            count={2356}
            icon={<BsPersonCheckFill color="purple" />}
          />
        </div>
        <div className="flex gap-2">
          <Card style={"w-full h-full"}>
            <SalesChart />
          </Card>
        </div>
        <div className="flex gap-5 h-[50vh]">
          <Card>
            <ExpenseChart />
          </Card>
          <Card>
            <TopProduct />
          </Card>
          <Card>
            <TopCategory />
          </Card>
        </div>
        <div className="flex gap-4">
          <Card style="p-0 basis-2/3">
            <RecentOrders />
          </Card>
          <Card style="basis-1/3"></Card>
        </div>
      </div>
    </section>
  );
};

function DashCard({
  icon = "",
  title,
  count,
  currency = false,
  style = "",
  children,
}) {
  return (
    <div
      className={cl(
        "stats shadow rounded-btn  bg-white text-black w-60",
        style
      )}
    >
      <div className="stat gap-1">
        <div className="stat-title text-black font-medium flex items-center gap-1 capitalize">
          <span>{icon}</span>
          <span>{title}</span>
        </div>
        <div className="stat-value font-medium text-3xl">
          {currency ? "$" : ""}
          {count}
        </div>
        <div className="stat-desc flex gap-1 text-slate-800 font-medium">
          <span className="text-green-500">10%</span>
          <span>+$150 today</span>
        </div>
      </div>
    </div>
  );
}

function Card({ style = "", children }) {
  return (
    <div
      className={cl(
        "card rounded-xl my-3 bg-gray-50 shadow outline outline-1 p-3 ",
        style
      )}
    >
      {children}
    </div>
  );
}
function SalesChart() {
  const data = [
    {
      name: "Jan",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Feb",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Mar",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Apr",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "May",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "June",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "July",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: "Aug",
      uv: 4590,
      pv: 8000,
      amt: 2100,
    },
    {
      name: "Sep",
      uv: 4300,
      pv: 3950,
      amt: 2100,
    },
    {
      name: "Oct",
      uv: 3390,
      pv: 4100,
      amt: 2000,
    },
    {
      name: "Nov",
      uv: 4050,
      pv: 5000,
      amt: 2700,
    },
    {
      name: "Dec",
      uv: 3430,
      pv: 4150,
      amt: 2150,
    },
  ];
  return (
    <div className="wrapper w-full h-full">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="0 0" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="pv"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
function TopProduct() {
  let products = [
    {
      img: "",
      productName: "product 1",
      subCategory: "sub 1",
      SaleAmount: 23507,
    },
    {
      img: "",
      productName: "product 2",
      subCategory: "sub 2",
      SaleAmount: 23507,
    },
  ];
  return (
    <div className="p-3">
      <div className="flex flex-col">
        <h2>Top Product</h2>
        <p>Lorem ipsum dolor sit amet consectetur.</p>
      </div>
      <div className="flex flex-col">
        {products.map((ele) => (
          <>
            <div className="flex">
              <img
                src={ele.img}
                alt="product image"
                className="w-5 h-10 rounded-lg"
              />
              <p className="inline-flex flex-col">
                <span>{ele.productName}</span>
                <span className="text-sm">{ele.subCategory}</span>
              </p>
              <p className="ms-auto">${ele.SaleAmount}</p>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
function TopCategory() {
  let categoryData = [
    {
      img: "",
      categoryName: "T-shirts",
      totalSales: 234,
      SaleAmount: 23507,
      status: "grow",
      stat: "+12",
      bg: "green",
    },
    {
      img: "",
      categoryName: "Shirts",
      totalSales: 134,
      SaleAmount: 2507,
      status: "loss",
      stat: "-10",
      bg: "red",
    },
    {
      img: "",
      categoryName: "Shorts",
      totalSales: 234,
      SaleAmount: 23507,
      status: "netural",
      stat: "15",
      bg: "gray",
    },
  ];
  return (
    <div className="p-3">
      <div className="flex flex-col">
        <h2>Top Category</h2>
        <p>Lorem ipsum dolor sit amet consectetur.</p>
      </div>
      <div className="flex flex-col">
        {categoryData.map((ele) => (
          <>
            <div className="flex">
              <div className="p3 rounded-full bg-orange-200">
                <img
                  src={ele.img}
                  alt="product image"
                  className="w-5 h-10 rounded-lg"
                />
              </div>

              <p className="inline-flex flex-col items-center">
                <span>{ele.productName}</span>
                <span className="text-sm">{ele.subCategory}</span>
              </p>
              <div className="ms-auto flex items-center gap-2">
                <p>${ele.SaleAmount}</p>
                <p
                  className={cl(
                    "badge badge-sm outline-none border-none",
                    `bg-${ele.bg}-200 text-${ele.bg}-700`
                  )}
                >
                  {ele.stat}
                </p>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
function ExpenseChart() {
  const data02 = [
    {
      name: "Group A",
      value: 2400,
    },
    {
      name: "Group B",
      value: 4567,
    },
    {
      name: "Group C",
      value: 1398,
    },
    {
      name: "Group D",
      value: 9800,
    },
    {
      name: "Group E",
      value: 3908,
    },
    {
      name: "Group F",
      value: 4800,
    },
  ];
  return (
    <div className="wrapper w-full h-full">
      <div className="flex flex-col">
        <h2 className="text-lg font-bold">All Expenses</h2>
        <p className="text-sm">Lorem ipsum dolor sit amet consectetur.</p>
      </div>
      <ResponsiveContainer width={300}>
        <PieChart>
          <Pie
            data={data02}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#82ca9d"
            label
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

const RecentOrders: React.FC = () => {
  const [orders, setOrders] = useState([
    {
      id: "1",
      product: "Product A",
      customerName: "John Doe",
      email: "john.doe@example.com",
      totalAmount: 1200,
      status: "Pending",
    },
    {
      id: "2",
      product: "Product B",
      customerName: "Jane Smith",
      email: "jane.smith@example.com",
      totalAmount: 800,
      status: "Delivered",
    },
  ]);

  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleDelete = (id: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <>
      {/* Header */}
      <div className="flex p-3 justify-between items-center mb-6">
        <h2 className="text-2xl space-x-2 font-bold text-gray-800">
          <span>Recent Orders</span>
          <span className="rounded-btn text-sm bg-green-200 px-2 py-1">
            20 Orders
          </span>
        </h2>
        <div className="flex items-center space-x-4">
          {/* Date Filter */}
          <div
            role="tablist"
            className="tabs tabs-boxed bg-slate-200 font-medium"
          >
            <a role="tab" className="tab">
              5 Hours
            </a>
            <a role="tab" className="tab tab-active bg-white">
              3 Hours
            </a>
            <a role="tab" className="tab">
              2 Hours
            </a>
            <a role="tab" className="tab">
              1 Hour
            </a>
            <a role="tab" className="tab">
              3 Minute
            </a>
          </div>
          {/* See More Button */}
          <button className="btn btn-primary btn-md  transition">
            See More
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto text-black">
        <table className="table">
          {/* head */}
          <thead className="bg-slate-200 text-black text-md space-y-6">
            <tr>
              {/* <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th> */}
              <th>Product</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((ele) => (
              <tr>
                {/* <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th> */}
                <td>
                  <div className="flex gap-1">
                    <div className="avatar">
                      <div className="mask mask-squircle h-10 w-10">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <p className="inline-flex flex-col gap-1">
                      <span>{ele.product}</span>
                      <span>+3 products</span>
                    </p>
                  </div>
                </td>
                <td>
                  <div className="inline-flex flex-col gap-1">
                    <p className="font-medium">{ele.customerName}</p>
                    <span className="text-sm">Cus@gmail.com</span>
                  </div>
                </td>
                <td>{ele.totalAmount}</td>
                <td>{ele.status}</td>
                <td>
                  <div className="flex gap-1">
                    <button className="btn btn-sm btn-ghost rounded-full">
                      <BsFillEyeFill />
                    </button>
                    <button className="btn btn-sm btn-ghost hover:bg-red-500 rounded-full">
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {/* row 1 */}
          </tbody>
        </table>
      </div>
      <AdminPagination />
    </>
  );
};

export default Dashbroad;
