import React from 'react';

//todo why generics?
interface ItemListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode
}

export default function ItemList<T>(props: ItemListProps<T>) {
    return (
        <ul className='flex flex-wrap justify-start p-3 items-center'>
            {props.items.map(props.renderItem)}
        </ul>
    )
}