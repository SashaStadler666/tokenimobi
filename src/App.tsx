
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TokenDetail from "./pages/TokenDetail";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import HowItWorks from "./pages/HowItWorks";
import FAQ from "./pages/FAQ";
import CustomHowItWorks from "./pages/CustomHowItWorks";
import CustomFAQ from "./pages/CustomFAQ";
import TermosDeUso from "./pages/TermosDeUso";
import Tokens from "./pages/Tokens";
import Portfolio from "./pages/Portfolio";
import ComoFuncionaEscolhaImovel from "./pages/ComoFuncionaEscolhaImovel";
import ComoFuncionaAnaliseDados from "./pages/ComoFuncionaAnaliseDados";
import ComoFuncionaSimuleInvestimento from "./pages/ComoFuncionaSimuleInvestimento";
import ComoFuncionaConecteCarteira from "./pages/ComoFuncionaConecteCarteira";
import ThemeToggle from "./components/ThemeToggle";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeToggle />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/token/:id" element={<TokenDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/como-funciona" element={<CustomHowItWorks />} />
          <Route path="/como-funciona/escolha-imovel" element={<ComoFuncionaEscolhaImovel />} />
          <Route path="/como-funciona/analise-dados" element={<ComoFuncionaAnaliseDados />} />
          <Route path="/como-funciona/simule-investimento" element={<ComoFuncionaSimuleInvestimento />} />
          <Route path="/como-funciona/conecte-carteira" element={<ComoFuncionaConecteCarteira />} />
          <Route path="/faq" element={<CustomFAQ />} />
          <Route path="/tokens" element={<Tokens />} />
          <Route path="/termos-de-uso" element={<TermosDeUso />} />
          <Route path="/portfolio" element={<Portfolio />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
