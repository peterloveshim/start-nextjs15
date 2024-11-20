import Countdown from "react-countdown";

export const CustomCountdown = ({
  expUnixTime,
  onClick,
}: {
  expUnixTime: number;
  onClick: any;
}) => {
  const rendererLeftTime = ({
    hours,
    minutes,
    seconds,
    completed,
  }: {
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
  }) => {
    if (completed) {
      // 카운트 다운 끝나면 출력되는 UI
      return null;
    } else {
      const newSeconds = seconds < 10 ? "0" + seconds : seconds;
      // Render a countdown
      return (
        <div
          className="absolute flex flex-col items-center text-xs bottom-[1px] right-[8px] cursor-pointer hover:text-blue-500"
          onClick={onClick}
        >
          {minutes}:{newSeconds}
          <span className="text-[10px]">재전송</span>
        </div>
      );
    }
  };
  return <Countdown date={expUnixTime} renderer={rendererLeftTime} />;
};
