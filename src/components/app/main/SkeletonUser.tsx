export default function SkeletonUser() {
    return (
        <div className=" border-2 rounded-md p-4">
            <div className="flex animate-pulse flex-row items-center h-full justify-start space-x-5">
                <div className="w-12 bg-gray-300 h-12 rounded-full "></div>
                <div className="flex flex-col space-y-3">
                    <div className="w-36 bg-gray-300 h-6 rounded-md "></div>
                </div>
            </div>
        </div>
    );
}
