import { useEffect } from "react"

const useClickOutside = (ref, stateFnc) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        stateFnc(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [ref, stateFnc])
}

export default useClickOutside;
