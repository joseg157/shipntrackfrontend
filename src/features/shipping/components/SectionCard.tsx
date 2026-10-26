import Paper from '@mui/material/Paper';

interface SectionCardProps {
  icon: React.ReactNode;
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

function SectionCard({ icon, title, action, children }: SectionCardProps) {
  return (
    <Paper className="tw:overflow-hidden">
      <div className="tw:relative tw:flex tw:items-center tw:justify-between tw:border-b tw:border-divider tw:px-4 tw:py-3">
        <div className="tw:flex tw:items-center tw:gap-2">
          {icon}
          <span className="tw:text-sm tw:font-semibold">{title}</span>
        </div>
        {action}
      </div>
      <div className="tw:p-4">{children}</div>
    </Paper>
  );
}

export default SectionCard;
