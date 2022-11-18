import Link from "next/link";
import Image from "next/image";
import dateFormat from "dateformat";

export default function Card(props) {
  var now = new Date(props.publishedDate) || new Date();

  return (
    <div
      id={props.id}
      className="relative flex w-[400px] bg-cardBg hover:shadow-lg shadow-[#5ce501]"
    >
      <Link href={props.bookLink} className="flex">
        <Image
          src={`${props.imgSrc}`}
          width={props.imgWidth}
          height={props.imgHeight}
          className="object-scale-down w-[250px]"
          alt={props.title}
        />
      </Link>
      <div className="flex flex-col justify-between h-[100% ] w-full">
        <div className="p-[1rem] text-cardTextSecondary">
          <Link
            className="font-bold text-xl text-cardTextPrimary leading-3"
            href={props.bookLink}
          >
            {props.title}
          </Link>
          <div>By {props.author}</div>
          <div>{dateFormat(now, "mmm dS, yyyy")}</div>
        </div>
        <Link
          href={props.buyLink}
          alt={props.name}
          className="w-full p-[1rem] bg-cardButtonBg text-cardButtonText"
          target={"_blank"}
        >
          Buy
        </Link>
      </div>
    </div>
  );
}
