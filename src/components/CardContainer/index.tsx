export default function CardContainer({ children, className }:{ children: React.ReactNode, className?: string }) {
  return (
    <div
      className={`bg-[#fff] absolute rounded-[32px] px-4 py-8 mt-3 shadow-[0_3px_12px_0_rgba(0,0,0,0.15)] ${className}`}
    >
      {children}
    </div>
  );
}
