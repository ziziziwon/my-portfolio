import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      // 딜레이 없이 즉시 위치 업데이트 (requestAnimationFrame 없이)
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const handleMouseDown = () => {
      cursor?.classList.add("click");
    };

    const handleMouseUp = () => {
      cursor?.classList.remove("click");
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;
      
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".swiper-button-next") ||
        target.closest(".swiper-button-prev") ||
        target.closest("[role='button']") ||
        target.closest("input[type='button']") ||
        target.closest("input[type='submit']")
      ) {
        cursor?.classList.add("hover");
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;
      
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".swiper-button-next") ||
        target.closest(".swiper-button-prev") ||
        target.closest("[role='button']") ||
        target.closest("input[type='button']") ||
        target.closest("input[type='submit']")
      ) {
        cursor?.classList.remove("hover");
      }
    };

    // 초기 위치 설정
    cursor.style.left = "0px";
    cursor.style.top = "0px";

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
};

export default CustomCursor;

