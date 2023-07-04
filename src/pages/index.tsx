import CardUser from "@/components/app/main/CardUser";
import SkeletonUser from "@/components/app/main/SkeletonUser";
import LayoutMain from "@/components/layouts/LayoutMain";
import api from "@/services/axios";
import {
    InformationCircleIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { Alert, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";

export default function Index() {
    const limit = 5;
    const [data, setdata] = useState<any>([]);
    const [searchValue, setsearchValue] = useState<string>("");
    const [isLoading, setisLoading] = useState(false);
    const fetchData = async () => {
        try {
            if (searchValue) {
                const fetc = await api.get(
                    `/search/users?q=${searchValue}&per_page=${limit}`
                );
                setdata(fetc.data.items);
            }
        } catch (error) {
            alert(error);
        } finally {
            setisLoading(false);
        }
    };
    useEffect(() => {
        let interval: number;
        setisLoading(true);
        const delayUpdateCrypt = () => {
            interval = setTimeout(fetchData, 800);
        };

        delayUpdateCrypt();

        return () => {
            clearTimeout(interval);
        };
    }, [searchValue]);
    return (
        <LayoutMain>
            <div>
                <div className=" bg-gray-50">
                    <Input
                        label="Search"
                        onChange={(e) => setsearchValue(e.target.value)}
                        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                    />
                </div>
            </div>
            {isLoading && (
                <div className="grid grid-cols-1 gap-4">
                    {Array.from({ length: limit }, (_, index) => (
                        <SkeletonUser key={index} />
                    ))}
                </div>
            )}
            {!isLoading && (
                <div className="grid  grid-cols-1 gap-4">
                    {data.map((val: any) => {
                        return (
                            <CardUser
                                avatar_url={val.avatar_url}
                                login={val.login}
                            />
                        );
                    })}
                </div>
            )}
            {data.length === 0 && searchValue && !isLoading && (
                <Alert
                    color="red"
                    className="mt-4"
                    icon={
                        <InformationCircleIcon
                            strokeWidth={2}
                            className="h-6 w-6"
                        />
                    }
                >
                    User with username "{searchValue}" Not Found
                </Alert>
            )}
        </LayoutMain>
    );
}
