import React, { useMemo , useEffect, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
// eslint-disable-next-line import/no-unresolved
import { getRequestHandler } from 'src/apiHandler/customApiHandler';
import Typography from '@mui/material/Typography';



const data = [
  {
    order:'234sdf78734',
    date: '20-06-2023',
    customer: 'Hasan',
    vendorName: 'Kentucky',
    paymentStatus: 'cash on delivery',
    deliveryStatus: 'Pending',
    total:100,
  },
  {
    order:'234sdf78739',
    date: '20-06-2023',
    customer: 'Hasan',
    vendorName: 'Kentucky',
    paymentStatus: 'cash on delivery',
    deliveryStatus: 'Delivered',
    total:400,
  },
  {
    order:'234sdf78735',
    date: '22-06-2023',
    customer: 'orasur',
    vendorName: 'rahman',
    paymentStatus: 'cash on delivery',
    deliveryStatus: 'Pending',
    total:100,
  },
  {
    order:'234s6fh8732',
    date: '23-06-2023',
    customer: 'Ar',
    vendorName: 'john',
    paymentStatus: 'cash on delivery',
    deliveryStatus: 'Active',
    total:300,
  },
];




const Example = () => {
  const [orList, setOrList] = useState([]);
  useEffect(()=>{
    async function getData() {
      const categoriesData = await getRequestHandler("https://marpapi.techanalyticaltd.com/admin/ordermanagement?page=1&items=10&deliveryStatus=queued");
      setOrList(categoriesData.data);
      console.log("categoriesData",typeof(categoriesData.data.orders),categoriesData.data.orders);
    }
    getData();
  },[])
console.log("orList data ", typeof(orList.orders), typeof(data));

  const columns = useMemo(
    () => [
      {
        accessorKey: 'order',
        header: 'Order',
        size: 100,
      },
      {
        accessorKey: 'date',
        header: 'Date',
        size: 120,
      },
      {
        accessorKey: 'customer',
        header: 'Customer',
        size: 120,
      },
      {
        accessorKey: 'vendorName',
        header: 'Vendor Name',
        size: 120,
      },
      {
        accessorKey: 'paymentStatus',
        header: 'Payment Status',
        size: 100,
      },
      {
        accessorKey: 'deliveryStatus',
        header: 'Delivery Status',
        size: 100,
      },
      {
        accessorKey: 'total',
        header: 'Total',
        size: 100,
      },
    ],
    [],
  );

  return <>
    {/* <Typography>Hello</Typography> */}
{/* {
  orList?.orders?.length ===0 ?
  <>
  <Typography>
  No User Found
  </Typography>
  </>
  :
  <>
  <MaterialReactTable columns={columns} data={data} />
  </>
} */}
<MaterialReactTable columns={columns} data={data} />
</>
};

export default Example;
