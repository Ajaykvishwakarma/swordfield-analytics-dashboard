import { ThemeProvider, CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Toast from "./components/toast/Toast";
import { store } from "./store/store";
import AppRoutes from "./routes/routes";
import "./styles/customProperties.css";
import "./styles/global.css";
import "./styles/index.css";
import theme from "./styles/theme";

const App: React.FC = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <AppRoutes />
            <Toast />
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  )
}

export default App
