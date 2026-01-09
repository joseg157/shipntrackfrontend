import { useNavigate } from 'react-router';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import withDocumentTitle from '@components/withDocumentTitle';

function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="tw:flex tw:h-full tw:items-center tw:justify-center">
      <div className="tw:text-center">
        <Typography className="tw:font-normal" variant="h1">
          404
        </Typography>

        <Typography className="tw:font-normal" variant="h5">
          Oops ... page not found
        </Typography>

        <p>
          The page you are looking for might have been removed, had its name
          <br />
          changed, is temporarily unavailable, or never existed.
        </p>

        <Button type="button" variant="contained" onClick={handleGoHome}>
          Go back to home
        </Button>
      </div>
    </div>
  );
}

const NotFoundWithDocumentTitle = withDocumentTitle(NotFound, {
  documentTitle: 'Not Found',
});

export default NotFoundWithDocumentTitle;
