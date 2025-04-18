import React from "react";

interface NotificationBellProps {
  numberNotif: number;
}

export const NotificationBell: React.FC<NotificationBellProps> = ({
  numberNotif,
}) => (
  <div style={{ position: "relative" }}>
    <svg
      width="25"
      height="26"
      viewBox="0 0 25 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.8242 0.25C8.5328 0.25 6.6073 1.97182 6.35218 4.24897L5.28772 13.75H2.25024C1.42182 13.75 0.750244 14.4216 0.750244 15.25V16.75C0.750244 17.5784 1.42182 18.25 2.25024 18.25H23.4501C24.2785 18.25 24.9501 17.5784 24.9501 16.75V15.25C24.9501 14.4216 24.2785 13.75 23.4501 13.75H20.4126L19.3482 4.24897C19.093 1.97182 17.1675 0.25 14.8761 0.25H10.8242Z"
        fill="#4880FF"
      />
      <rect
        opacity="0.9"
        x="9.8252"
        y="19.75"
        width="6.04996"
        height="6"
        rx="2.25"
        fill="white"
      />
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
