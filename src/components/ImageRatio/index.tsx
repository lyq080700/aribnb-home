import React from "react";
import "./index.scss";
/****
 * 图片容器组件 实现自适应
 */
type Props = {
  src?: string;
  alt?: string;
  ratio?: string;
  className?: string;
  round: boolean;
};

export default function ImageRatio({
  src = "",
  alt = "",
  ratio = "100%",
  className = "",
  round = false,
}:Props) {
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
