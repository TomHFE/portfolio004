import React from "react";
import { usePreventScroll } from "@react-aria/overlays";

export default function Scroll() {
  usePreventScroll({
    isDisabled: true,
  });
}
