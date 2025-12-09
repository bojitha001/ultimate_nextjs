import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import TagCard from "../cards/TagCard";

const hotQuestions = [
  { _id: "1", title: "What is the difference between useEffect and useLayoutEffect in React?" },
  { _id: "2", title: "How does state batching work in React 18?" },
  { _id: "3", title: "How to optimize performance using React.memo?" },
  { _id: "4", title: "What are controlled vs uncontrolled components in React?" },
  { _id: "5", title: "How to implement debouncing in" },
];

const popularTags = [
  { _id: "1", name: "react", questions: 100 },
  { _id: "2", name: "javascript", questions: 23 },
  { _id: "3", name: "nextjs", questions: 29 },
  { _id: "4", name: "typescript", questions: 34 },
];

const RightSideBar = () => {
  return (
    <section className="custom-scrollbar light-border shadow-light-300 sticky top-0 right-0 flex h-screen w-[250px] flex-col gap-6 overflow-y-auto border-l p-6 pt-36 max-xl:hidden dark:shadow-none">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map(({ _id, title }) => (
            <Link
              key={_id}
              href={ROUTES.PROFILE(_id)}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">{title}</p>
              <Image src="/icons/chevron-right.svg" alt="Chevron" width={20} height={20} className="invert-colors" />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>

        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map(({ _id, name, questions }) => (
            <TagCard key={_id} _id={_id} name={name} questions={questions} showCount compact />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
