type Props = {
  size?: string;
};

const Loading = ({ size = '20' }: Props) => (
  <div className={`w-${size} h-${size} border-l-2 border-[#1a5cff] rounded-full animate-spin mx-auto box-content`} />
);

export default Loading;
