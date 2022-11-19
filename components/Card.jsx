import Link from "next/link";
import Image from "next/image";
import dateFormat from "dateformat";

export default function Card(props) {
  var pubDate;
  if (props.publishedDate)
    pubDate = new Date(props.publishedDate[0]) || new Date();
  else pubDate = new Date();

  return (
    <div
      key={props.cardId}
      id={props.cardId}
      className="relative flex w-[400px] bg-cardBg hover:shadow-lg shadow-[#5ce501]"
    >
      {props.coverId ? (
        <Image
          src={`https://covers.openlibrary.org/b/id/${props.coverId}-M.jpg`}
          className="object-scale-down h-[250px]"
          alt={props.title}
          width={250}
          height={400}
        />
      ) : (
        <Image
          src={`https://www.arlanandrews.com/wp-content/uploads/2020/10/book-cover-generic.jpg`}
          width={200}
          height={400}
          className="object-scale-down h-[250px]"
          alt={props.title}
        />
      )}
      <div className="flex flex-col justify-between h-[100% ] w-full">
        <div className="p-[1rem] text-cardTextSecondary">
          <Link
            className="font-bold text-xl text-cardTextPrimary leading-3"
            href={""}
          >
            {props.title}
          </Link>
          <div>
            By{" "}
            {props.authors == undefined ? (
              "unknown"
            ) : (
              <span key={`${props.authors[0]}0${props.cardId}`}>
                {props.authors[0]}
              </span>
            )}
          </div>
          <div>
            {pubDate ? dateFormat(pubDate, "mmm dS, yyyy") : "21/02/21"}
          </div>
        </div>
        <Link
          href={`https://www.amazon.in/s?srs=${
            props.amazonId ? props.amazonId[0] : "newBook"
          }`}
          alt={props.title}
          className="w-full p-[1rem] bg-cardButtonBg text-cardButtonText"
          target={"_blank"}
        >
          Buy
        </Link>
      </div>
    </div>
  );
}
