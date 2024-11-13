import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <ul>
        <li>
          <Link href="/facebook">facebook</Link>
        </li>
        <li>
          <Link href="/youtube">youtube</Link>
        </li>
        <li>
          <Link href="/tiktok">tiktok</Link>
        </li>
      </ul>
    </div>
  );
}
