import App from './ms/src/components/App';


const desktopRoutes = [
  {
    path: "/",
    component: App,
    exact: GlobalConfig.isServer() ? true : false
  },{
    path: `${PRODUCT_DETAIL_URL}/:url/p/:id`,
    component: DesktopProductDescriptionComponent,
    exact: true
  },{
    path: `${PRODUCT_LIST_URL}/:url/c/:categoryId`,
    component: DesktopProductListingComponent,
    exact: true
  }
];
