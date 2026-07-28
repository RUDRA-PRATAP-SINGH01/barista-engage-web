import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/context/theme-context";
import { QueryProvider } from "@/providers/QueryProvider";
import { router } from "@/routes";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="barista-ui-theme">
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </ThemeProvider>
  );
}

export default App;
