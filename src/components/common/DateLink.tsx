type DateLinkProps = {
  date: string;
  url: string;
};

function DateLink({ date, url }: DateLinkProps) {
  const shortURL = url?.split('//')[1];

  const formattedDate = new Date(date).toLocaleDateString('SE');

  return (
    <div className='date-link'>
      <span>{formattedDate}</span> |{' '}
      <a href={url} target='_blank'>
        {shortURL}
      </a>
    </div>
  );
}

export default DateLink;
