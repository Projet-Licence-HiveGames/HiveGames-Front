import React from "react";

interface NotificationBellProps {
  numberNotif: number;
}

export const BasketCart: React.FC<NotificationBellProps> = ({
  numberNotif,
}) => (
  <div style={{ position: "relative", top: "2px" }}>
    <svg
      fill="none"
      height="32"
      viewBox="0 0 39 32"
      width="39"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_478_4454)">
        <path
          d="M17.6325 1.78234C17.9608 1.18312 17.7132 0.446785 17.0835 0.137019C16.4538 -0.172748 15.6681 0.0608464 15.3398 0.654989L10.3292 9.74994H5.72222C4.76962 9.74994 4 10.4761 4 11.3749C4 12.2738 4.76962 13 5.72222 13L8.51545 23.5371C8.89757 24.9844 10.2753 26 11.8576 26H27.1424C28.7247 26 30.1024 24.9844 30.4845 23.5371L33.2778 13C34.2304 13 35 12.2738 35 11.3749C35 10.4761 34.2304 9.74994 33.2778 9.74994H28.6708L23.6602 0.654989C23.3319 0.0608464 22.5516 -0.172748 21.9165 0.137019C21.2814 0.446785 21.0392 1.18312 21.3675 1.78234L25.7592 9.74994H13.2408L17.6325 1.78234ZM14.3333 15.4375V20.3125C14.3333 20.7594 13.9458 21.125 13.4722 21.125C12.9986 21.125 12.6111 20.7594 12.6111 20.3125V15.4375C12.6111 14.9906 12.9986 14.625 13.4722 14.625C13.9458 14.625 14.3333 14.9906 14.3333 15.4375ZM19.5 14.625C19.9736 14.625 20.3611 14.9906 20.3611 15.4375V20.3125C20.3611 20.7594 19.9736 21.125 19.5 21.125C19.0264 21.125 18.6389 20.7594 18.6389 20.3125V15.4375C18.6389 14.9906 19.0264 14.625 19.5 14.625ZM26.3889 15.4375V20.3125C26.3889 20.7594 26.0014 21.125 25.5278 21.125C25.0542 21.125 24.6667 20.7594 24.6667 20.3125V15.4375C24.6667 14.9906 25.0542 14.625 25.5278 14.625C26.0014 14.625 26.3889 14.9906 26.3889 15.4375Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="34"
          id="filter0_d_478_4454"
          width="39"
          x="0"
          y="0"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            in2="BackgroundImageFix"
            mode="normal"
            result="effect1_dropShadow_478_4454"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_478_4454"
            mode="normal"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
    {numberNotif > 0 && (
      <span
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          backgroundColor: "red",
          color: "white",
          borderRadius: "50%",
          padding: "2px 5px",
          fontSize: "8px",
        }}
      >
        {numberNotif}
      </span>
    )}
  </div>
);
