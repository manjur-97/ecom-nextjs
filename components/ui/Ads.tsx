import React from "react";

interface AdsProps {
    width?: string;
    height?: string;
    image: string;
    link?: string;
    badge?: string;
}

function Ads({
    width = "w-[300px]",
    height = "h-[250px]",
    image,
    link = "#",
    badge = "AD",
}: AdsProps) {
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-full relative inline-block group cursor-pointer"
        //   style={{height:height, width:width}}
        >

            {/* Main Card */}
            <div className="relative w-full h-full shadow overflow-hidden  backdrop-blur-sm  bg-white">
                {/* Image */}
                <img
                    src={image}
                    alt="Advertisement"
                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110 p-2"
                    style={{ height: height, width: width }}
                //   style={{height:height, width:width}}
                />

     

                {/* Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-ad-badge/90 backdrop-blur-md border border-ad-badge-border text-ad-badge-text text-[10px] font-semibold tracking-wider uppercase shadow-lg">
                    {badge}
                </div>

            </div>
        </a>
    );
}

export default Ads;
