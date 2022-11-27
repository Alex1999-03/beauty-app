import { PromotionPage } from "./pages/PromotionPage";
import { PresentationPage } from "./pages/PresentationPage";
import { CategoryPage } from "./pages/CategoryPage";
import { BrandPage } from "./pages/BrandPage";
import { HomePage } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";

export const AppRoutes = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: "/marcas",
    element: <BrandPage />,
  },
  {
    path: "/categorias",
    element: <CategoryPage />,
  },
  {
    path: "/presentaciones",
    element: <PresentationPage />,
  },
  {
    path: "/promociones",
    element: <PromotionPage />
  },
  {
    path: "/productos",
    element: <ProductPage />
  }
];
