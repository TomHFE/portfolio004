import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  // location hook
  const { pathname } = useLocation();
// scroll to top on init
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
