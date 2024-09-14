// import React, { useEffect, useState } from "react";
import {Appbar} from "../components/Appbar";
import {Balance} from "../components/Balance";
// import { useRecoilValue } from "recoil";
// import { tokenAtom, userAtom } from "../store/atoms";
// import { getBalance } from "../services/operations/transactionApi";
import { Users } from "../components/Users";


export const Dashboard = () => {
  
    return (
      <div>
        <Appbar />
        <div className="m-8">
            <Balance />
            <Users />
        </div>
      </div>
    );
}