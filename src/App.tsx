import "./App.css";
import { BrowserRouter, Routes } from "react-router-dom";
import { Layout } from "./components/layout";
import { ThemeProvider } from "./context/theme-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import WeatherDashboard from "./pages/weather-dashboard";
import CityPage from "./pages/city-page";
import { Toaster } from "sonner";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark">
          <Layout>
            <Routes>
              <Route path="/" element={<WeatherDashboard />} />
              <Route path="/city/:cityName" element={<CityPage />} />
            </Routes>
          </Layout>
          <Toaster richColors />
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
