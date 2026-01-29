import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import "./components/NotificationStyles.css";
import Home from "./pages/Home";
import Trade from "./pages/Trade";
import About from "./pages/About";
import Sponsors from "./pages/Sponsors";
import Accessibility from "./pages/Accessibility";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Donate from "./pages/Donate";
import DonateSuccess from "./pages/DonateSuccess";
import DonateCancel from "./pages/DonateCancel";
import { DebugEnv } from "./pages/DebugEnv";

/**
 * App Router
 * Luxury-minimal design with accessibility-first approach.
 * All routes configured for Shine in the Darkness non-profit website.
 */
function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/trade" component={Trade} />
      <Route path="/about" component={About} />
      <Route path="/sponsors" component={Sponsors} />
      <Route path="/accessibility" component={Accessibility} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/donate" component={Donate} />
      <Route path="/donate/success" component={DonateSuccess} />
      <Route path="/donate/cancel" component={DonateCancel} />
      <Route path="/debug/env" component={DebugEnv} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
