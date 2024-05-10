import { useEffect, useRef, useState } from "react";

const DropDown = ({ value, options, onSelect }) => {
  const ref = useRef();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const listener = (event) => {
      const el = ref.current;
      if (!el || el.contains(event.target)) {
        return;
      }

      setShow(false);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [show]);

  return (
    <div className="relative flex flex-col" ref={ref}>
      {/* <label className="text-[#313135]">{"Xyx"}</label> */}
      <button onClick={() => setShow((prev) => !prev)}>
          <div className="w-[230px] h-[23px] bg-fuchsia-500">
        
        <p>{value ?? "Select user"} </p>
        </div>
      </button>
      
      
      {/* <button
        type="button"
        onClick={() => setShow(true)}
        className="absolute inset-y-11 end-[10px] flex items-center pe-1 border border-red-600"
      >
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </button> */}
      {show && (
        <div
          className="absolute top-[22px] flex justify-start flex-col  w-full bg-white group
        shadow-[0px_0px_20px_0px_rgba(3,27,89,0.20)] p-[8px] rounded-md z-10 overflow-y-auto max-h-80"
        >
          <div className="flex flex-col">
            {options &&
              options?.map((item, index) => {
                return (
                  <div
                    key={item.id}
                    className="flex"
                    onClick={() => onSelect(item)}
                  >
                    <p >{item.name}</p>
                    <p >{item.username}</p>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;

