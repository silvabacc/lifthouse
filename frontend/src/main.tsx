import "antd/dist/reset.css";
import "./index.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReactDOM from "react-dom/client";
import App from "./app";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppContextProvider } from "./context/AppContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </QueryClientProvider>
);
