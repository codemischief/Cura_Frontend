export const CrossIcon = ({ onClick, bgColor = "#fff" }) => (
  <div
    className={`flex justify-center items-center rounded-full w-[30px] h-[30px] bg-[${bgColor}]`}
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.7934 7.32702C19.8789 7.24161 19.9468 7.14019 19.9931 7.02855C20.0394 6.91692 20.0633 6.79725 20.0634 6.67638C20.0635 6.55552 20.0397 6.43582 19.9936 6.32413C19.9474 6.21244 19.8796 6.11094 19.7942 6.02542C19.7088 5.9399 19.6074 5.87205 19.4958 5.82572C19.3841 5.7794 19.2645 5.75552 19.1436 5.75545C19.0227 5.75537 18.903 5.77911 18.7913 5.82529C18.6796 5.87148 18.5781 5.93921 18.4926 6.02462L12.9422 11.575L7.39342 6.02462C7.22072 5.85191 6.98647 5.75488 6.74222 5.75488C6.49798 5.75488 6.26373 5.85191 6.09102 6.02462C5.91832 6.19733 5.82129 6.43157 5.82129 6.67582C5.82129 6.92007 5.91832 7.15431 6.09102 7.32702L11.6414 12.8758L6.09102 18.4246C6.00551 18.5101 5.93767 18.6117 5.89139 18.7234C5.84511 18.8351 5.82129 18.9549 5.82129 19.0758C5.82129 19.1968 5.84511 19.3165 5.89139 19.4282C5.93767 19.54 6.00551 19.6415 6.09102 19.727C6.26373 19.8997 6.49798 19.9968 6.74222 19.9968C6.86316 19.9968 6.98292 19.9729 7.09465 19.9267C7.20638 19.8804 7.30791 19.8125 7.39342 19.727L12.9422 14.1766L18.4926 19.727C18.6653 19.8995 18.8995 19.9963 19.1436 19.9962C19.3877 19.996 19.6217 19.8989 19.7942 19.7262C19.9667 19.5535 20.0635 19.3194 20.0634 19.0753C20.0632 18.8312 19.9661 18.5971 19.7934 18.4246L14.243 12.8758L19.7934 7.32702Z"
        fill="#282828"
      />
    </svg>
  </div>
);
