import { usePreventScroll } from "@react-aria/overlays";

// prevent scroll hook

export default function Scroll() {
  usePreventScroll({
    isDisabled: true,
  });
}
