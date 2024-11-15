import Link from "next/link";
import Table from "@/Component/table";

import x from "@/styles/app.module.css";
import y from "@/styles/test.module.css";

export default function Home() {
  return (
    <div className="container">
      <ul>
        <li className={x["red"]}>
          <Link href="/facebook">
            <span className={y["red"]}>facebook</span>
          </Link>
        </li>
        <li className="green">
          <Link href="/youtube">youtube</Link>
        </li>
        <li>
          <Link href="/tiktok">tiktok</Link>
        </li>
      </ul>
      <Table />
    </div>
  );
}
