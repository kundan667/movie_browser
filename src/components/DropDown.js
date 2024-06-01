function DropDown({ name, dropDownList, isStar = false, setData }) {
    const handleClick = (item) => {
        setData(item.id)
        const elem = document.activeElement;
        if (elem) {
            elem?.blur();
        }
    };
    return (
        <>
            <div className={`dropdown dropdown-end dropdown-opens`}>
                <div tabIndex={0} role="button" className="text-gray-100 m-1">{name}</div>
                <ul tabIndex={0} className={`grid overflow-y-auto text-gray-600 dropdown-content z-[1] menu p-2 shadow rounded-box min-w-52 bg-secondary max-h-[300px]`}>
                    {
                        dropDownList.map(item => (
                            <li key={item.id}
                                onClick={() => handleClick(item)}
                                className={`flex flex-row content-start items-center text-left cursor-pointer hover:bg-primary hover:text-secondary px-4 rounded-lg select-none`}>
                                <div className="pr-0">{item.name}</div>
                                {
                                    isStar && (
                                        <>
                                            {
                                                Array.from({ length: item.id }, (i, k) => (
                                                    <img src="/assets/common/star.png" loading="lazy" alt="star" width={13} className='p-0 ml-1' />
                                                ))
                                            }
                                        </>
                                    )
                                }
                            </li>
                        ))
                    }

                </ul>
            </div>
        </>
    )
}

export default DropDown
