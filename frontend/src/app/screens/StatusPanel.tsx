interface StatusPanelProps {
  className?: string | undefined,
  isLoading: boolean,
  onClick?: () => void
}

export const StatusPanel = ({ className, isLoading, onClick }: StatusPanelProps) => {
    return (
        <>
        <div className={className}>
          {isLoading && <div>loading</div>}
          <button onClick={onClick}>Submit</button>
        </div>
        </>
    );
};