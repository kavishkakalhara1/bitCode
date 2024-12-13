import React from "react";
import { useSelector } from "react-redux";

function MemberID() {
  const { currentUser, error, loading } = useSelector((state) => state.user);

  return (
    <div className="font-semibold" >
      RID-{currentUser.createdAt.toString().slice(2, 4)}
      {currentUser.createdAt.toString().slice(5, 7)}
      {currentUser.createdAt.toString().slice(8, 10)}
      {currentUser.createdAt.toString().slice(11, 13)}
      {currentUser.createdAt.toString().slice(14, 16)}
      {currentUser.createdAt.toString().slice(17, 19)}
    </div>
  );
}

export default MemberID;
