const DeleteIcon = ({ bgColor = "#FFEAEA" }) => {
  return (
    <div
      className={`h-[3.85431rem] w-[3.85431rem] flex justify-center items-center rounded-full bg-[${bgColor}] `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="49"
        height="49"
        viewBox="0 0 49 49"
        fill="none"
      >
        <path
          d="M14.0918 42.334C12.9918 42.334 12.0505 41.9426 11.2678 41.16C10.4851 40.3773 10.0931 39.4353 10.0918 38.334V12.334H8.0918V8.33398H18.0918V6.33398H30.0918V8.33398H40.0918V12.334H38.0918V38.334C38.0918 39.434 37.7005 40.376 36.9178 41.16C36.1351 41.944 35.1931 42.3353 34.0918 42.334H14.0918ZM34.0918 12.334H14.0918V38.334H34.0918V12.334ZM18.0918 34.334H22.0918V16.334H18.0918V34.334ZM26.0918 34.334H30.0918V16.334H26.0918V34.334Z"
          fill="#CD0000"
        />
      </svg>
    </div>
  );
};

export default DeleteIcon;
