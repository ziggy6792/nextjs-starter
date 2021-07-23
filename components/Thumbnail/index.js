/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

const Thumbnail = ({ imageUrl = 'https://via.placeholder.com/210x295?text=?', caption, href = '', as = '', small = false }) => {
  return (
    <div className='thumbnail'>
      <Link href={href} as={as}>
        <a>
          <img src={imageUrl} className='thumbnail__image' />
          <div className='thumbnail__caption'>{caption}</div>
        </a>
      </Link>
    </div>
  );
};

export default Thumbnail;
