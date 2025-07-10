interface WatermarkProps {
  text: string;
}

export default function Watermark({ text }: WatermarkProps) {
  return (
    <div
      className="
        pointer-events-none
        absolute inset-0
        flex items-center justify-center
        z-0
        opacity-5 select-none
        print:fixed  /* take over full page only during printing */
      "
    >
      <span
        className="
          -rotate-45
          whitespace-nowrap
          text-[16rem]
          font-extrabold
          tracking-widest
          text-black
        "
        style={{ lineHeight: 1 }}
      >
        {text.toUpperCase()}
      </span>
    </div>);
}
