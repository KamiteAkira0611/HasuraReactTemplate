import { forwardRef, ReactNode, useCallback, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router";
import track from "src/common/utils/analytics";

const Page = forwardRef(
  (
    {
      children,
      className,
      title = "",
      ...rest
    }: {
      className?: String;
      children: ReactNode;
      title?: String;
    },
    ref
  ) => {
    const location = useLocation();

    const sendPageViewEvent = useCallback(() => {
      track.pageview({
        page_path: location.pathname,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      sendPageViewEvent();
    }, [sendPageViewEvent]);

    return (
      <div
        // ref={ref}
        {...rest}
      >
        <Helmet>
          <title>{title}</title>
        </Helmet>
        {children}
      </div>
    );
  }
);

export default Page;
