import { useEffect } from "react";
import GenderBiasCourseSelectionWebsite from "./GenderBiasCourseSelectionWebsite";

export default function App() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, []);

  return <GenderBiasCourseSelectionWebsite />;
}
