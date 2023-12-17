import React from "react";

function OfferPagination({offers, page, setPage }) {
    const nextPage = offers?.next;
    const previousPage = offers?.previous;

    return (
        <div>
            {offers.count > 1 && page > 1 ? (
                <div className="flex justify-center mt-10 gap-2">
                    {previousPage && (
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => setPage(page - 1)}
                        >
                            Previous
                        </button>
                    )}
                    {nextPage && (
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => setPage(page + 1)}
                        >
                            Next
                        </button>
                    )}
                </div>
            ) : (
                // Display only the 'Next' button if the page is 1 and there is a next page
                nextPage && (
                    <div className="flex justify-center mt-10">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => setPage(page + 1)}
                        >
                            Next
                        </button>
                    </div>
                )
            )}
        </div>
    );
}

export default OfferPagination;
