import { StarIcon } from "@heroicons/react/24/solid";

interface IProps {
    title: string;
    desc: string;
    star: number;
}
export default function CardRepository(props: IProps) {
    return (
        <div className="flex text-gray-600 bg-gray-100 p-4 rounded-md hover:bg-gray-200 !cursor-pointer">
            <div className="flex-1">
                <div className="font-bold">{props.title}</div>
                <span>{props.desc}</span>
            </div>
            <span className="flex items-center space-x-2">
                <span>{props.star}</span>
                <StarIcon className="text-gray-500 w-6 h-6" />
            </span>
        </div>
    );
}
