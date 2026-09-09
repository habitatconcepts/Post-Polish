import { LogoMark } from "@/components/site/LogoMark";

export const Logo = ({ className = "h-12", testId = "brand-logo" }) => (
  <LogoMark className={className} testId={testId} />
);
