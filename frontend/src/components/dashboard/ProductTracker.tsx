import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { productsApi } from "../../api/products";

export const ProductTracker = () => {
  const navigate = useNavigate();

  // UI States
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<'IDLE' | 'LOADING' | 'ERROR'>('IDLE');
  const [errorMessage, setErrorMessage] = useState("");
  
  // tracking State (Once the backend accepts the URL, we store the ID here)
  const [pendingListingId, setPendingListingId] = useState<string | null>(null);

  // submit handler
  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    try {
      setStatus('LOADING');
      setErrorMessage("");

      const response = await productsApi.trackUrl(url);
      
      //save ID, start polling
      setPendingListingId(response.listingId);
      
    } catch (err: unknown) {
      setStatus('ERROR');
      const errorMsg = err instanceof Error ? err.message : "Failed to track product.";
      setErrorMessage(errorMsg);
    }
  };


  // polling hook
  useEffect(() => {
    // if no pending scrape job, ignore
    if (!pendingListingId) return;

    console.log(`Starting polling for listing: ${pendingListingId}`);

    // run every 3s
    const intervalId = setInterval(async () => {
      try {
        // ping backend
        const response = await productsApi.getTrackStatus(pendingListingId);
        
        if (response.status === 'COMPLETED') {
          console.log("Scrape completed! Redirecting...");
          
          // Stop the loading spinner
          setStatus('IDLE'); 
          
          // Redirect the user to product page
          navigate(`/products/${response.productId}`);
        } else if (response.status === 'FAILED') {
          setStatus('ERROR');
          setErrorMessage("Failed to scrape Aritzia. The target might be blocking us.");
        }
        // If status is still 'PENDING', we do nothing. The timer will just check again in 3 seconds.

      } catch (error) {
        console.error("Polling error:", error);
      }
    }, 3000); 

    // cleanup (remove timer when component unmounts)
    return () => {
      console.log("Cleaning up polling timer.");
      clearInterval(intervalId);
    };

  }, [pendingListingId, navigate]); 


  // UI Rendering
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-100">
      <h2 className="text-xl font-semibold text-primary-700 mb-2">Track a New Item</h2>
      <p className="text-sm text-gray-500 mb-4">Paste an Aritzia URL below to start tracking its price.</p>

      {status === 'IDLE' || status === 'ERROR' ? (
        <form onSubmit={handleTrack} className="flex gap-2">
          <input
            type="url"
            placeholder="https://www.aritzia.com/en/product/..."
            className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button 
            type="submit"
            className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition"
          >
            Track Price
          </button>
        </form>
      ) : (
        <div className="flex items-center gap-3 p-4 bg-blue-50 text-blue-700 rounded-md">
           {/* Add a spinning SVG or loading icon here */}
           <span className="animate-spin text-2xl">⏳</span>
           <p className="font-medium">Deploying bot to Aritzia... Please wait.</p>
        </div>
      )}

      {status === 'ERROR' && (
        <p className="text-red-500 text-sm mt-2 font-medium">{errorMessage}</p>
      )}
    </div>
  );
};