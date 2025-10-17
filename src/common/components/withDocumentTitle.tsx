import { useEffect, type ComponentType } from 'react';
import Typography from '@mui/material/Typography';

interface WithDocumentTitleParams {
  title?: string;
  documentTitle?: string;

  passTitleAsProp?: boolean;
}

function withDocumentTitle<P extends object>(
  WrappedComponent: ComponentType<P>,
  { title, documentTitle, passTitleAsProp }: WithDocumentTitleParams,
) {
  const ComponentWithDocumentTitle = (props: P) => {
    useEffect(() => {
      document.title = `${documentTitle || title} - ShipNTrack`;
    }, []);

    if (passTitleAsProp) {
      return <WrappedComponent {...props} title={title} />;
    }

    return (
      <>
        {title && (
          <Typography variant="h5" gutterBottom className="tw:font-semibold tw:underline">
            {title}
          </Typography>
        )}

        <WrappedComponent {...props} />
      </>
    );
  };

  return ComponentWithDocumentTitle;
}

export default withDocumentTitle;
