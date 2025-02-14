import React from "react";
import UserImage from "../../assets/img/UserImage.svg";

export function UserProfile({ username }) {
    return (
        <div
            style={{
                width: 448,
                height: 245,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 50,
            }}
        >
            <img
                src={UserImage}
                alt="User"
                style={{
                    width: "50%",
                    height: "100%",
                }}
            />
            <div
                style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 24,
                    fontFamily: "Audiowide",
                    fontWeight: "400",
                    lineHeight: 18,
                    wordWrap: "break-word",
                }}
            >
                {username}
            </div>
        </div>
    );
}
