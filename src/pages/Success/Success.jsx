import { useNavigate, useSearchParams } from "react-router-dom";
import { IoIosCopy } from "react-icons/io";
import { BsCheckAll } from "react-icons/bs";
import "./Success.css";
import { useCallback, useEffect, useState } from "react";
import useAxiosConfig from "../../Hooks/useAxiosConfig";
import LoadingSpiner from "../../Components/LoadingSpiner/LoadingSpiner";

const Success = () => {
  const [searchParams] = useSearchParams();
  const [isCopied, setIsCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const axiosConfig = useAxiosConfig();
  const navigate = useNavigate();

  const handleCopyTransactionId = async () => {
    setIsCopied(false);
    await navigator.clipboard.writeText(searchParams.get("session_id"));
    setIsCopied(true);
  }

  const verifyStripePayment = useCallback(async (sessionId) => {
    try {
      setLoading(true);
      const response = await axiosConfig.patch(`/api/v1/payment/verify/${sessionId}`);
      if (response.data) {
        setIsVerified(true);
      } else {
        navigate("/")
      }
    } catch (error) {
      navigate("/")
    } finally {
      setLoading(false)
    }
  }, [axiosConfig])

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    const gateway = searchParams.get('gateway');
    if (!sessionId) {
      // Redirect if session_id is missing
      navigate('/');
      return;
    }

    if (gateway === "stripe") {
      verifyStripePayment(sessionId);
    } else {
      setIsVerified(true);
    }
  }, [verifyStripePayment]);

  if (!isVerified) {
    return null;
  }

  const handleDownloadTickets = async (sessionId) => {
    console.log("Calling: ", sessionId);
    try {
      setDownloadLoading(true);

      const response = await axiosConfig.get(`/api/v1/payment/download-ticket/${sessionId}`, { responseType: "blob" });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `tickets-${sessionId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      console.log("donwloaded")
    } catch (error) {
      console.error("Error downloading tickets:", error);
    } finally {
      setDownloadLoading(false);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      {
        loading
          ?
          <LoadingSpiner />
          :
          <>
            <h1 className="text-4xl font-semibold text-center">Payment successful</h1>
            <div className="text-center break-words max-w-[50rem] mt-4 mx-auto">Your payment has been completed successfully. Click the button below to download your tickets</div>

            <div className="payment-success">
              <div className="w-32 h-32 overflow-hidden payment-icon rounded-full">
                <img className="w-full h-full object-cover" src={"/images/send-money.png"} alt="payment icon" />
              </div>

              <div className="text-3xl font-semibold mt-10">Your transaction ID is</div>

              <div className="flex justify-center items-center font-semibold ml-4 break-all px-8 mt-4">
                {searchParams.get("session_id")}
                {!isCopied ? <IoIosCopy onClick={handleCopyTransactionId} className="text-accent-color text-3xl ml-2 cursor-pointer" title="Copy" /> : <BsCheckAll className="text-accent-color ml-2 text-3xl" />}
              </div>

              <button className="bg-accent-color text-primary-color w-[35rem] py-3 rounded-2xl mt-14 font-medium" onClick={() => handleDownloadTickets(searchParams.get("session_id"))}>
                {
                  downloadLoading ?
                    <LoadingSpiner />
                    :
                    <span>Download Tickets</span>
                }
              </button>
            </div>
          </>
      }
    </div>
  )
}
export default Success;
