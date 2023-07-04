import {
    ChevronDownIcon,
    ChevronUpIcon,
    InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { Alert, Avatar } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import CardRepository from "./CardRepository";
import api from "@/services/axios";
import SkeletonRepo from "./SkeletonRepo";

interface IProps {
    avatar_url: string;
    login: string;
}
export default function CardUser(props: IProps) {
    const [status, setstatus] = useState<"idle" | "finish">("idle");
    const [isLoading, setisLoading] = useState(false);
    const [repo, setrepo] = useState<any>([]);
    const [isShowRepo, setisShowRepo] = useState(false);
    const fetchData = async () => {
        setisLoading(true);
        try {
            const fetch = await api.get(`/users/${props.login}/repos`);
            // console.log(fetch);
            setrepo(fetch.data);
        } catch (error) {
            alert(error);
        } finally {
            setisLoading(false);
        }
    };
    useEffect(() => {
        if (isShowRepo && status === "idle") {
            fetchData();
        }
    }, [isShowRepo]);

    return (
        <div
            className="shadow-lg rounded-md h-min active:bg-blue-200"
            onClick={() => setisShowRepo(!isShowRepo)}
        >
            <div className="p-4  flex items-center space-x-4">
                <Avatar src={props.avatar_url} alt="avatar" />
                <span className="text font-body flex-1">{props.login}</span>
                <div className="cursor-pointer hover:text-blue-500">
                    {!isShowRepo ? (
                        <ChevronDownIcon
                            onClick={() => setisShowRepo(true)}
                            className="w-4 h-4"
                        />
                    ) : (
                        <ChevronUpIcon
                            onClick={() => setisShowRepo(false)}
                            className="w-4 h-4"
                        />
                    )}
                </div>
            </div>
            {isLoading && (
                <div>
                    <SkeletonRepo />
                </div>
            )}
            {isShowRepo && !isLoading && repo.length === 0 && (
                <Alert
                    color="red"
                    className="m-y"
                    icon={
                        <InformationCircleIcon
                            strokeWidth={2}
                            className="h-6 w-6"
                        />
                    }
                >
                    "{props.login}" dont have any repository
                </Alert>
            )}
            {isShowRepo && !isLoading && repo.length > 0 && (
                <div className="p-4 space-y-4">
                    <h1 className="font-bold border-b border-gray-400">
                        List Repository
                    </h1>
                    {repo.map((value: any) => {
                        return (
                            <CardRepository
                                title={value.name}
                                desc={value.description}
                                star={value.stargazers_count}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
