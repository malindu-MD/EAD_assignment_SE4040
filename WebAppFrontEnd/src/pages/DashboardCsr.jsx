import React from "react";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { useState } from "react";
import Dashboard from "./Dashboard";

const columns = [
  {
    title: "Order No.",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product Count",
    dataIndex: "product",
  },
  {
    title: "Total Price",
    dataIndex: "price",
  },
  {
    title: "Total Orde Items  ",
    dataIndex: "dprice",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const DashboardCsr = () => {
  const dispatch = useDispatch();
  const monthlyDataState = useSelector((state) => state?.auth?.monthlyData);
  const yearlyDataState = useSelector((state) => state?.auth?.yearlyData);
  const orderState = useSelector((state) => state?.auth?.orders?.orders);
  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataMonthlySales, setDataMonthlySales] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [userdata,setUserdata]=useState();


  useEffect(() => {


    
  }, []);

  useEffect(() => {
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let data = [];
    let monthlyOrderCount = [];
    for (let index = 0; index < monthlyDataState?.length; index++) {
      const element = monthlyDataState[index];
      data.push({
        type: monthNames[element?._id?.month],
        income: element?.amount,
      });
      monthlyOrderCount.push({
        type: monthNames[element?._id?.month],
        sales: element?.count,
      });
    }
    data.sort((a, b) => {
      return monthNames?.indexOf(a.type) - monthNames?.indexOf(b.type);
    });

    monthlyOrderCount.sort((a, b) => {
      return monthNames?.indexOf(a.type) - monthNames?.indexOf(b.type);
    });

    setDataMonthly(data);
    setDataMonthlySales(monthlyOrderCount);

    const data1 = [];
    for (let i = 0; i < orderState?.length; i++) {
      data1.push({
        key: i,
        name:
          orderState[i]?.user?.firstName + " " + orderState[i]?.user?.lastName,
        product: orderState[i]?.orderItems?.length,
        price: orderState[i]?.totalPrice,
        dprice: orderState[i]?.totalPriceAfterDiscount,
        status: orderState[i]?.orderStatus,
      });
    }
    setOrderData(data1);
  }, [monthlyDataState, yearlyDataState, orderState]);

  const config = {
    data: dataMonthly,
    xField: "type",
    yField: "income",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",

      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };

  const config2 = {
    data: dataMonthlySales,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",

      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Sales",
      },
    },
  };
  return (
    <div>
      <h3 className="mb-4">CSR Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total Orders</p>
            <h4 className="mb-0 sub-title">15 </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p className="mb-0 desc"></p>
          </div>
        </div>
        <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total Customers</p>
            <h4 className="mb-0 sub-title">11</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p className="mb-0 desc"></p>
          </div>
        </div>
        
      </div>

      <div className="d-flex justify-content-between align-items-center gap-3 mt-5">
        <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">New Customers</p>
            <h4 className="mb-0 sub-title">2</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p className="mb-0 desc"></p>
          </div>
        </div>
        <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Order Cancellation </p>
            <h4 className="mb-0 sub-title">0</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p className="mb-0 desc"></p>
          </div>
        </div>
        
      </div>
      {/* <div className="d-flex justify-content-between gap-3">
        <div className="mt-4 flex-grow-1 w-50">
          <h3 className="mb-5 title">Income Statistics</h3>
          <div>
            <Column {...config} />
          </div>
        </div>
        <div className="mt-4 flex-grow-1 w-50">
          <h3 className="mb-5 title">Sales Statistics</h3>
          <div>
            <Column {...config2} />
          </div>
        </div>
      </div> */}
      <div className="mt-4">
        <h3 className="mb-5 title">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={orderData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCsr;
