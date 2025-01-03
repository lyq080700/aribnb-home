import React from "react";
import "./index.scss";
/****
 * 图片容器组件 实现自适应
 */
export default function ImageRatio({
  src = "",
  alt = "",
  ratio = "100%",
  className = "",
  round = false,
}) {
  return (
    <div
      className={`image-ratio overflow-clip ${className}`}
      style={{ width: ratio }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`${round ? "rounded-lg" : ""}`}
      />
    </div>
  );
}
