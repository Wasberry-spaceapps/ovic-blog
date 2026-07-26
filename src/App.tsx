import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { Layout } from '@/components/Layout';
import { LoadingScreen } from '@/components/LoadingScreen';
import AdminApp from '@/admin/AdminApp';

import Home from '@/pages/Home';
import Shelf from '@/pages/Shelf';
import Post from '@/pages/Post';
import About from '@/pages/About';
import Reading from '@/pages/Reading';
import Recommendations from '@/pages/Recommendations';
import Hello from '@/pages/Hello';

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/shelf" component={Shelf} />
        <Route path="/shelf/:slug" component={Post} />
        <Route path="/about" component={About} />
        <Route path="/reading" component={Reading} />
        <Route path="/recommendations" component={Recommendations} />
        <Route path="/hello" component={Hello} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Switch>
            <Route path="/admin" nest component={AdminApp} />
            <Route path="*">
              <LoadingScreen />
              <Router />
            </Route>
          </Switch>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
