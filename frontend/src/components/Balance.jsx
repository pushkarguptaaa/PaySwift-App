import axios from "axios";
import { useEffect, useState } from "react";

export const Balance = () => {
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/account/balance",{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => setBalance(res.data.balance))
    })

  return (
    <div className="flex px-4 sm:px-14 my-8">
      <div className="font-bold text-lg">Your Balance:</div>
      <div className="text-lg font-semibold ml-4">Rs {balance}</div>
    </div>
  );
};
