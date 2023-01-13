const packageJson = require("../package.json");
const manifest = require("../public/manifest.json");

const serverPort = process.env.PORT || 3000;

const completeConfig = {
  default: {
    serverPort,
    appSlug: packageJson.name,
    appVersion: packageJson.version,
    // appUrl: process.env.NEXT_PUBLIC_APP_URL,
    appName: manifest.name,
    appTagline: manifest.description,
    appDescription: `${manifest.name} – ${manifest.description}`,
    locale: "en_US",
    googleAnalyticsId: "UA-..", // - Google Analytics ID
    googleSiteVerification: false,
    // apiUrl: "http://trynbuy.deliverable.services/customer/v1/",
    apiUrl: "https://portal.trythenbuy.in/customer/v1/",
    productbasepath: "https://portal.trythenbuy.in/assets/images/products/",
    categoriesBasePath:"https://portal.trythenbuy.in/assets/images/categories/",
    subCategoriesBasePath:"https://portal.trythenbuy.in/assets/images/subcategories/",
    childCategoriesBasePath:"https://portal.trythenbuy.in/assets/images/childcategories/",
    categoriesHomepageBasePath:
      "https://portal.trythenbuy.in/assets/images/homepage_categories/",
    blogImagePath: "https://portal.trythenbuy.in/assets/images/blogs/",
    bannerImagePath: "https://portal.trythenbuy.in/assets/images/banners/",
    sliderImagePath: "https://portal.trythenbuy.in/assets/images/sliders/",
    gallerySlider: "https://portal.trythenbuy.in/assets/images/galleries/",
    homepagePath : "https://portal.trythenbuy.in/assets/images/homepage/",
  },

  development: {
    appUrl: `http://localhost:${serverPort}/`,
    googleAnalyticsId: null,
  },

  production: {},
};

const config = {
  ...completeConfig.default,
  ...completeConfig[process.env.NODE_ENV],
};

export default config;
