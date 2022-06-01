// routes
import AppRoutes from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './features/auth/AuthAction';
import NoInternetConnection from './utils/noInternetConnection';

// ----------------------------------------------------------------------
export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (

        <ThemeConfig>
          <ScrollToTop />
          <GlobalStyles />
          <AppRoutes />
        </ThemeConfig>

  );
}
