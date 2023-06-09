// component
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import CategoryIcon from '@mui/icons-material/Category';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LoginIcon from '@mui/icons-material/Login';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import SvgColor from '../../../components/svg-color';
// import {bucketImg} from "../../../img/Storage 1.png"
import bucketImg from "../../../img/Storage 1.png";
// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

// const accessToken=localStorage.getItem("accessToken");
// console.log("accessToken", accessToken);

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: <HomeOutlinedIcon/>,
  },
  {
    title: 'Order List',
    path: '/dashboard/orderList',
    icon: <FormatAlignLeftIcon/>,
  },
  {
    title: 'Assign order',
    path: '/dashboard/assignOrder',
    icon: icon('Layer2'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('Icon'),
  },
  {
    title: 'category',
    path: '/dashboard/category',
    icon: icon('Category'),
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: icon('Group246'),
  },
  {
    title: 'shipper',
    path: '/dashboard/shipper',
    icon: <LocalShippingIcon/>,
  },
  // {
  //   title: 'bucket',
  //   path: '/dashboard/bucket',
  //   // icon: <LocalShippingIcon/>,
  //   icon: <img src={bucketImg} alt=""/>,
  // },
  {
    // title: 'login',
    // path: '/login',
    // icon: <LoginIcon/>,
    title: 'Vendor',
    path: '/dashboard/vendor',
    icon: icon('Layer'),
  },
  {
    title: 'Storage Bucket',
    path: '/dashboard/bucket',
    icon: icon('Storage'),
  },
];

export default navConfig;
