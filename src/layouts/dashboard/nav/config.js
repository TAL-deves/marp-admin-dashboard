// component
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import CategoryIcon from '@mui/icons-material/Category';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LoginIcon from '@mui/icons-material/Login';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import SvgColor from '../../../components/svg-color';
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
    title: 'user',
    path: '/dashboard/user',
    icon: <PersonAddAltIcon/>,
  },
  {
    title: 'category',
    path: '/dashboard/category',
    icon: icon('Category'),
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: <ShoppingCartIcon/>,
  },
//   { accessToken ?
// "hasan"
//     :
//  "ar"
//   },
  {
    title: 'login',
    path: '/login',
    icon: <LoginIcon/>,
  },
  // {
  //   title: 'logout',
  //   path: '/login',
  //   icon: <LogoutIcon/>,
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
