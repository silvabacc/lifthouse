import "antd/dist/reset.css";
import "./index.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "swiper/css";
import "pure-react-carousel/dist/react-carousel.es.css";
import "@splidejs/react-splide/css";
import "chart.js/auto";
import ReactDOM from "react-dom/client";
import dayjs from "dayjs";
import WeekDayPlugin from "dayjs/plugin/weekday";
import updateLocale from "dayjs/plugin/updateLocale";
import App from "./app";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppContextProvider } from "./context/AppContext";

dayjs.extend(WeekDayPlugin);
dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  weekStart: 1,
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </QueryClientProvider>
);
