const { useGetTokenQuery } = require("../store/authApi");
const { useGetSocksByUserQuery } = require("../store/socksApi");

function SockDropdown() {

    const { data: user, isLoading: userLoading} = useGetTokenQuery
    const { data, isLoading } = useGetSocksByUserQuery(user.account.id)

    if (isLoading || userLoading) {
        return <p>Loading...</p>
    }


    return (
    {data.map((s) => {
        return (
            <div className="p-2">
            <img
                src={s.photo}
                alt=""
                className="w-[40px] h-[40px] object-cover hover:scale-[600%] rounded-lg border-blue border-2"
            />
            </div>
        );
    })}
    )
}
