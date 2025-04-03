import Link from 'next/link';

export const metadata = {
  title: 'Home | Tech Starter Kit',
};

export default function Page() {
  return (
    <>
      <h3>vert þú velkominn Tómas </h3>
      <ul>
        <Link rel="stylesheet" href="/categories">Flokar</Link>
      </ul>
    </>
  );
}
