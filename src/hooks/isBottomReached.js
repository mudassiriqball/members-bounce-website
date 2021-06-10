import { useEffect, useState } from "react";

const isBottomReached = () => {
  const [IS_BOTTOM_REACHED, setIsBottom] = useState(false);
  useEffect(() => {
    setIsBottom(false);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  function handleScroll() {
    const scrollTop = (document.documentElement
      && document.documentElement.scrollTop)
      || document.body.scrollTop;
    const scrollHeight = (document.documentElement
      && document.documentElement.scrollHeight)
      || document.body.scrollHeight;
    if (scrollTop + window.innerHeight + 50 >= scrollHeight) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  }
  return { IS_BOTTOM_REACHED };
}

export default isBottomReached;
