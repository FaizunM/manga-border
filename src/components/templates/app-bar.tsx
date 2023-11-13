export const AppBar = ({ onBarClick }: { onBarClick: () => void }) => {
  return (
    <div className="w-full h-[64px] flex items-center gap-4 py-2">
      <BarsButton onClick={onBarClick} />
      <div className="bg-[rgba(255,255,255,0.025)] hover:bg-[rgba(255,255,255,0.05)] transition-all duration-200 ease-in-out rounded-full p-2 pr-8 flex items-center gap-2">
        <div className="w-6 h-6 flex items-center justify-center rounded-full overflow-hidden">
          <img
            src="https://onwaleed.sirv.com/Thumbnails/Komik-When-Trying-to-Get-Back-at-the-Hometown-Bullies-Another-Battle-Began.jpeg?ch=512"
            alt=""
          />
        </div>
        <div className="font-medium text-sm">Your Name</div>
      </div>
    </div>
  );
};

const BarsButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      className="flex flex-col gap-1 items-center p-2 py-3 group cursor-pointer"
      onClick={onClick}
    >
      <div className="w-6 group-hover:w-6 transition-all duration-200 ease-in-out h-[2px] bg-white"></div>
      <div className="w-4 group-hover:w-6 transition-all duration-200 ease-in-out h-[2px] bg-white"></div>
      <div className="w-5 group-hover:w-6 transition-all duration-200 ease-in-out h-[2px] bg-white"></div>
    </div>
  );
};
