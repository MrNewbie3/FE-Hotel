import React from "react";

interface Summary {
  title: string;
  value: string;
}

export default function SummaryComps(props: Summary) {
  return (
    <div className="flex flex-row gap-x-10 justify-between items-center">
      <p className="font-semibold text-base capitalize ">{props.title}</p>
      <p className="font-medium text-end text-sm capitalize">{props.value}</p>
    </div>
  );
}
