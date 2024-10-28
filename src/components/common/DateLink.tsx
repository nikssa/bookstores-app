type DateLinkProps = {
  date: string;
  url: string;
};

function DateLink({ date, url }: DateLinkProps) {
  const shortURL = url?.split('//')[1];

  return (
    <div className='date-link'>
      <span>{date}</span> |{' '}
      <a href={url} target='_blank'>
        {shortURL}
      </a>
    </div>
  );
}

export default DateLink;
