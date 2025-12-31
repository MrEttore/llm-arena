import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

import placeholderAvatar from "@/assets/placeholder-avatar.svg";

type Props = {
  src: string;
  isBusy?: boolean;
};

export default function AgentAvatar({ src, isBusy = false }: Props) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(false);
    setIsError(false);
  }, [src]);

  const showAvatar = Boolean(src) && !isError;
  const showSpinner = isBusy || (src && !isLoaded);

  return (
    <div className="relative h-14 w-14 lg:h-18 lg:w-18">
      <img
        className={`absolute inset-0 rounded-full border border-white/10 object-cover shadow-sm transition-opacity ${
          showSpinner ? "opacity-0" : "opacity-100"
        }`}
        src={placeholderAvatar}
        alt=""
        aria-hidden="true"
      />

      {showAvatar && (
        <img
          className={`absolute inset-0 rounded-full border border-white/10 object-cover shadow-sm transition-opacity ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          src={src}
          alt="Agent's Avatar"
          decoding="async"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsError(true)}
        />
      )}

      {showSpinner && (
        <div className="absolute inset-0 flex items-center justify-center rounded-full border border-white/10 bg-white/10 shadow-sm">
          <LoaderCircle className="h-5 w-5 animate-spin text-white/60" />
        </div>
      )}
    </div>
  );
}
