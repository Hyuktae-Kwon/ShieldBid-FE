import "./AuctionListPage.css";
import ShieldBid from "../assets/shieldbid.png";

function MainPage() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-svh">
      <img
        src={ShieldBid}
        alt="ShieldBid"
        width={400}
        height={400}
        className="m-12 shadow-2xl"
      />
      <h1 className="text-3xl text-white font-white font-dream font-bold tracking-[12px]">
        SHIELDBID
      </h1>
      <h2 className="text-lg mt-12 text-white text-center font-white font-dream">
        <span>A Blockchain-based Online Auction Service</span>
        <br />
        <span>
          providing transparency and security by using zero-knowledge proofs
        </span>
      </h2>
    </div>
  );
}

export default MainPage;
