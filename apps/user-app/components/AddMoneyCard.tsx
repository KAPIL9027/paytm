"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import Select from "@repo/ui/select";
import { useEffect, useState } from "react";
import TextInput from "@repo/ui/textinput";
import { createOnRampTransaction } from "../lib/actions/createOnrampTransactions";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import Toast from "@repo/ui/toast";
import { setOpenToast } from "../store/features/openToast/openToastSlice";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

const AddMoneyCard = () => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  const session = useSession();
  const [value, setValue] = useState(0);
  const [type, setType] = useState("");
  const openToast = useSelector((state: RootState) => state.openToast.value);
  const [msg, SetMsg] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const navType = (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming)?.type;
    const redirected = sessionStorage.getItem('redirectToBank');
    if (redirected === "true" && navType === 'back_forward') {
      setType("success");
                SetMsg("Added Money Successfully!");
                dispatch(setOpenToast(true));
                sessionStorage.setItem('redirectToBank',"false");
    }
  }, [])
  return (
    <Card title="Add Money">
      <div className="w-full">
        {openToast && (
          <Toast
            type={type}
            message={msg}
            close={() => {
              dispatch(setOpenToast(false));
            }}
          />
        )}
        <TextInput
          label={"Amount"}
          placeholder={"Amount"}
          onChange={(val) => {
            setValue(Number(val));
          }}
        />
        <div className="py-4 text-left">Bank</div>
        <Select
          onSelect={(value) => {
            setRedirectUrl(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
            );
            setProvider(
              SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
            );
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        <div className="flex justify-center pt-4">
          <Button
            onClick={async () => {
              if (value <= 0) {
                setType("error");
                SetMsg("Amount cannot lesser or equal to zero.");
                dispatch(setOpenToast(true));
                return;
              }
              try {
                await createOnRampTransaction(provider, value);
              await axios.post("/api/transaction", {
                //@ts-ignore
                user_identifier: session?.data?.user?.id,
                webhookUrl: process.env.NEXT_PUBLIC_WEBHOOK_URL,
                amount: `${value}`,
              });
              window.location.href = redirectUrl || "";
              sessionStorage.setItem("redirectToBank","true");
              }
              catch(e){
                setType("error");
                SetMsg("Something went wrong! Try again later after some time.");
                dispatch(setOpenToast(true));
                return;
              }
              
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AddMoneyCard;
