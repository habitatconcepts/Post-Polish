export const Logo = ({ className = "h-12", testId = "brand-logo" }) => (
  <img
    src="/logo-primary.png"
    width="760"
    height="329"
    alt="NE Post & Polish — mailbox and post specialists"
    data-testid={testId}
    className={`${className} w-auto select-none`}
  />
);
