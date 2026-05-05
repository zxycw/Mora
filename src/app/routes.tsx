import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import EmotionFlow from "./pages/EmotionFlow";
import GeneralOrder from "./pages/GeneralOrder";
import Recommendation from "./pages/Recommendation";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/emotion",
    Component: EmotionFlow,
  },
  {
    path: "/general",
    Component: GeneralOrder,
  },
  {
    path: "/recommendation",
    Component: Recommendation,
  },
]);
