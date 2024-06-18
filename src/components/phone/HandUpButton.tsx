import React from "react";

interface ChildProps  {
  disconnectHandler: () => void;
}

const HangUpButton: React.FC<ChildProps> = ({ disconnectHandler}) => {

  return (
    <div className="flex items-center gap-2" id="hangupDiv" onClick={() => disconnectHandler()}>
      <button
        className="p-2 rounded-full flex items-center justify-center"
      >
        <svg fill="#f53c2d" height="40px" width="40px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.639 511.639" transform="rotate(-45)matrix(-1, 0, 0, -1, 0, 0)">
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
          <g id="SVGRepo_iconCarrier"> <g> <g> <path d="M504.982,376.258h-0.021c-19.435-36.715-81.472-73.813-88.725-78.059c-14.4-8.213-29.696-10.731-42.987-6.997 c-10.411,2.88-18.944,9.301-24.768,18.624c-8.107,9.664-18.155,21.035-20.309,22.933c-16.512,11.221-26.944,10.133-41.28-4.224 L183.083,224.748c-14.336-14.357-15.403-24.768-4.757-40.533c2.411-2.859,13.824-12.949,23.488-21.056 c9.323-5.824,15.723-14.357,18.624-24.768c3.691-13.333,1.195-28.587-7.125-43.221c-4.117-7.019-41.216-69.077-77.952-88.512 C113.153-5.076,86.315-1.044,68.566,16.727L45.633,39.639C4.203,81.068-46.229,169.644,81.43,297.324L214.315,430.21 c61.141,61.141,113.301,81.429,155.627,81.429c46.059,0,80.448-24.043,102.037-45.632l22.912-22.912 C512.662,425.324,516.715,398.466,504.982,376.258z" /> </g> </g> </g>
        </svg>
      </button>
    </div>
  )
}

export default HangUpButton;