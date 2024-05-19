import { useEffect, useRef, useState } from "react";
import {DownOutlined} from "@ant-design/icons"
const DropDown = ({ initialValue,value, options, leftLabel, rightLabel ,leftAttr,rightAttr ,toSelect, handleChange,formValueName,idName}) => {
  const ref = useRef();
  const [show, setShow] = useState(false);
  const [text,setText] = useState(initialValue)
  const onSelect = (item) => {
    setShow(false)
    setText(item[toSelect])
    // we need to call handle change her
    handleChange({
        target : {
            name : formValueName,
            value : item[idName]
        }
    })
  }
  const setTextValue = (text) => {
    console.log('rendered')
    console.log('called')
    console.log(text)
      setText((prev) => text)
  }
  useEffect(() => {
    // we might have to set the initial value here
    // traverse thru all the values and then if something matches the initial Value then
    if(value == null) {
        console.log('here')
    }else {
        options.map((item) => {
            // if any value matches the initial value
            if(item[idName] == value) {
                // this should be the default value
                setTextValue(item[toSelect])
            }
        })
    }
    
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
  }, [value,show,text]);

  return (
    <div className="relative flex flex-col" ref={ref}>
      {/* <label className="text-[#313135]">{"Xyx"}</label> */}
      <button onClick={() => {setShow((prev) => !prev)}}>
        <div className="w-[230px] h-5 rounded-sm  border-[1px] border-[#C6C6C6] flex items-center justify-between">
        
                  <p className="text-[10px] text-start pl-[15px]">{text} </p>
                  <div className="mr-[10px]">
                     <DownOutlined style={{ fontSize: '60%'}} />
                  </div>
                  
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
        <>
         
        <div
          className="absolute top-[22px] flex justify-start flex-col  w-full bg-white group
        shadow-[0px_0px_20px_0px_rgba(3,27,89,0.20)]  rounded-md z-10  max-h-40"
        >
           <div
                    className="flex justify-between text-[12px] h-[37px] bg-[#D9D9D9] px-[8px] py-[8px]"
                    // onClick={() => {}}
                  >
                    <p >{leftLabel}</p>
                    <p >{rightLabel}</p>
                  </div>     
          <div className="flex flex-col overflow-y-auto" >
            {options &&
              options?.map((item, index) => {
                return (
                  <div
                    // key={item.id}
                    className={`flex justify-between text-[10px] cursor-pointer px-[8px] hover:bg-blue-400 ${item[idName] == value ? "bg-blue-400 " : "" }`}
                    onClick={() => onSelect(item)}
                  >
                    <p className="max-w-[50%]">{item[leftAttr]}</p>
                    <p className="max-w-[50%]" >{item[rightAttr]}</p>
                  </div>
                );
              })}
          </div>
        </div>
        </>
      )}
    </div>
  );
};

export default DropDown;