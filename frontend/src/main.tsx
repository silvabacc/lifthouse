import "antd/dist/reset.css";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "chart.js/auto";
import ReactDOM from "react-dom/client";
import dayjs from "dayjs";
import WeekDayPlugin from "dayjs/plugin/weekday";
import updateLocale from "dayjs/plugin/updateLocale";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import App from "./app";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppContextProvider } from "./context/AppContext";
import { ConfigProvider } from "./theme/configProvider";
import { BrowserRouter } from "react-router-dom";

dayjs.extend(WeekDayPlugin);
dayjs.extend(updateLocale);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.updateLocale("en", {
  weekStart: 1,
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <AppContextProvider>
      <ConfigProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConfigProvider>
    </AppContextProvider>
  </QueryClientProvider>
);
