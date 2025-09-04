import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppSidebar } from "./components/AppSidebar";
import Index from "./pages/Index";
import Dynagraphs from "./pages/Dynagraphs";
import PumpControl from "./pages/PumpControl";
import Anomalies from "./pages/Anomalies";
import Pump from "./pages/Pump";
import Well from "./pages/Well";
import IPRCurve from "./pages/IPRCurve";
import Production1 from "./pages/Production1";
import Production2 from "./pages/Production2";
import Trends from "./pages/Trends";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            
            <div className="flex-1 flex flex-col">
              <header className="h-12 flex items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <SidebarTrigger className="ml-4" />
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-primary">Analytics Dashboard</h2>
                </div>
              </header>
              
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/dynagraphs" element={<Dynagraphs />} />
                  <Route path="/pump-control" element={<PumpControl />} />
                  <Route path="/anomalies" element={<Anomalies />} />
                  <Route path="/pump" element={<Pump />} />
                  <Route path="/well" element={<Well />} />
                  <Route path="/ipr-curve" element={<IPRCurve />} />
                  <Route path="/production-1" element={<Production1 />} />
                  <Route path="/production-2" element={<Production2 />} />
                  <Route path="/trends" element={<Trends />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
