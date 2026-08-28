import { useEffect, useRef } from 'react';
import Typography, { type TypographyProps } from '@mui/material/Typography';
import cn from '@utils/cn';

interface DocumentTitleProps extends Omit<TypographyProps, 'title'> {
  title?: string;
  documentTitle?: string;
}

function DocumentTitle({ title, documentTitle, className, ...props }: DocumentTitleProps) {
  const documentTitleRef = useRef(documentTitle);

  useEffect(() => {
    // Make sure to have latest documentTitle value in the ref to avoid stale closure issues
    documentTitleRef.current = documentTitle;
  }, [documentTitle]);

  useEffect(() => {
    if (documentTitleRef.current) {
      document.title = `${documentTitleRef.current} - ShipNTrack`;
    }
  }, []);

  return title ? (
    <Typography variant="h5" gutterBottom className={cn('tw:font-semibold', className)} {...props}>
      {title}
    </Typography>
  ) : null;
}

export default DocumentTitle;
