import Link from "next/link";
import Image from "next/image";
import dateFormat from "dateformat";
import { useRouter } from "next/router";

export default function Card(props) {
  const router = useRouter();

  var pubDate;
  if (props.displayDate != 0) {
    pubDate = new Date(props.displayDate) || new Date();
  } else {
    if (props.publishedDate)
      pubDate = new Date(props.publishedDate[0]) || new Date();
    else pubDate = new Date();
  }

  function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }

  return (
    <div
      key={props.cardId}
      id={props.cardId}
      // onClick={() => {
      //   router.push(`${props.seed[0]}`);
      // }}
      className="relative grid grid-cols-[40%_60%] w-[400px] bg-cardBg hover:shadow-lg shadow-[#5ce501]"
    >
      <div className="overflow-hidden flex justify-center items-center bg-black">
        <Link href={`${props.seed[0]}`} target="_blank">
          {props.coverId ? (
            <Image
              src={`https://covers.openlibrary.org/b/id/${props.coverId}-M.jpg`}
              className="object-scale-down w-full h-full"
              alt={props.title}
              width={250}
              height={400}
            />
          ) : (
            <Image
              src={`https://www.arlanandrews.com/wp-content/uploads/2020/10/book-cover-generic.jpg`}
              width={200}
              height={400}
              className="object-scale-down h-[250px] max-w-[300px]"
              alt={props.title}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col justify-between h-[100% ] w-full">
        <div className="p-[1rem] text-cardTextSecondary">
          <Link
            className="font-bold text-xl text-cardTextPrimary leading-3"
            href={`${props.seed[0]}`}
            target="_blank"
          >
            {props.title}
          </Link>
          <div className="text-sm mt-[10px]">
            by{" "}
            {props.authors == undefined ? (
              "unknown"
            ) : (
              <strong>
                <em key={`${props.authors[0]}0${props.cardId}`} className="">
                  {props.authors[0]}
                </em>
              </strong>
            )}
          </div>
          <div className="text-sm">
            published at{" "}
            <strong>
              <em>
                {isValidDate(pubDate) ? dateFormat(pubDate, "yyyy") : "unknown"}
              </em>
            </strong>
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
