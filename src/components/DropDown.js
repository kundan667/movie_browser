import React, { useContext } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import MovieContext from '../context/movieContext';

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
            {/* <Menu>
                <MenuButton className="inline-flex items-center gap-2 rounded-mdpy-1.5 px-6 text-sm/6 font-semibold text-white shadow-inner focus:outline-none data-[hover]:bg-primary data-[open]:bg-primary rounded data-[focus]:outline-1 data-[focus]:outline-white">
                    {name}
                </MenuButton>
                <Transition
                    enter="transition ease-out duration-75"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <MenuItems
                        anchor="bottom end"
                        className="w-52 !max-h-[300px] origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none"
                    >
                        {
                            dropDownList.map(item => (
                                <MenuItem key={item.id}>
                                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                                        onClick={() => setSelectedGenre(item.id)}
                                    >
                                        {item.name}
                                    </button>
                                </MenuItem>
                            ))
                        }
                    </MenuItems>
                </Transition>
            </Menu> */}


            {/* </div> */}
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
