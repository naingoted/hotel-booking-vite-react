import { render, RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactElement, ReactNode, FC } from "react";

const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">
) => {
  const queryClient = new QueryClient();
  const Wrapper: FC = ({ children }: { children?: ReactNode }) => {
    return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    );
  };

  return render(ui, { wrapper: Wrapper, ...options });
};

export * from "@testing-library/react";
export { renderWithProviders };
