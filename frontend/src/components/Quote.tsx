export const Quote = () => {
    return(
        // <div className="flex flex-col w-1/2 bg-slate-200 h-screen justify-center items-center">
        //     <div className="max-w-lg font-bold text-3xl m-10">
        //     "The customer support i received was exceptional.
        //     The service team went above and beyond to address my concerns."
        //     </div>
        // </div>

        <div className="bg-slate-200 h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div className="max-w-lg">
                    <div className="text-3xl font-bold">
                    "The customer support i received was exceptional.
                    The service team went above and beyond to address my concerns."
                    </div>
                    <div className="max-w-md text-left text-xl font-semibold mt-4">
                        Julies Winfield
                    </div>
                    <div>
                        CEO | Acme Corp
                    </div>     
                </div>
            </div>
        </div>
    )
}