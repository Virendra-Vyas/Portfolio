import { useEffect, useState } from "react";

function useScrollSpy(ids, offset = 100) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    function onScroll() {
      let currentId = "";
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.getBoundingClientRect().top;
          if (top < offset) {
            currentId = id;
          }
        }
      }
      setActiveId(currentId);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initialize on load

    return () => window.removeEventListener("scroll", onScroll);
  }, [ids, offset]);

  return activeId;
}

export default useScrollSpy;
